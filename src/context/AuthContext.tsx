import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { AuthContextType } from '@/types'; // Corrected import statement

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [cart, setCart] = useState<any[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedCart = localStorage.getItem('cart');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if(!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.access_token) {
        setToken(data.access_token);
        localStorage.setItem('token', data.access_token);

        setUser({ email });
        localStorage.setItem('user', JSON.stringify({ email }));

        const cartResponse = await fetch('https://api.escuelajs.co/api/v1/cart', {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });

        const cartData = await cartResponse.json();
        setCart(cartData);
        localStorage.setItem('cart', JSON.stringify(cartData));

        router.push('/products');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      try {
        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
        const data = await response.json();
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
          return true;
        }
      } catch (error) {
        console.error('Error refreshing token', error);
      }
    }
    return false;
  };
  

  const logout = () => {
    setToken(null);
    setUser(null);
    setCart(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    document.cookie = 'token=; Max-Age=0; path=/'; // Remove token from cookies
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, cart, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
