import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ category, title }: { category: string; title: string }) => {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refresh_token');

  const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true;
    
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  };

  useEffect(() => {
    const refreshAccessToken = async () => {
      if (refreshToken) {
        try {
          const response = await fetch('https://api.escuelajs.co/api/v1/auth/refresh', {
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

    const checkAccess = async () => {
      if (token && !isTokenExpired(token)) {
        setHasAccess(true);
      } else {
        const refreshed = await refreshAccessToken();
        setHasAccess(refreshed);
      }
      setLoading(false);
    };

    checkAccess();
  }, [token, refreshToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return hasAccess ? <Outlet context={{ category, title }} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
