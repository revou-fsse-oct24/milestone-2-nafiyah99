import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
// import NotFound from './pages/NotFound';
import ProductLayout from './pages/ProductLayout';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';
// import ProtectedRoute from './utils/ProtectedRoute';

export interface Products {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

export interface CartItem {
  product: Products;
  quantity: number;
}

const App = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [items, setItems] = useState<Products | null>(null);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product: Products) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) => prevCart.map((item) => (item.product.id === productId ? { ...item, quantity: item.quantity + quantity } : item)).filter((item) => item.quantity > 0));
  };

  const productsURL: string = 'https://api.escuelajs.co/api/v1/products';
  const getProducts = async () => {
    try {
      const response = await fetch(productsURL);
      const data = await response.json();
      if (data) {
        setProducts(data);
      } else {
        console.log('no data found', data);
      }
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log('products', products);

  const getItems = async (id: string) => {
    const itemsURL: string = `https://api.escuelajs.co/api/v1/products/${id}`;
    try {
      const response = await fetch(itemsURL);
      const data = await response.json();
      if (data) {
        setItems(data);
      } else {
        console.log('no data found', data);
      }
    } catch (error) {
      console.error('Error fetching items', error);
    }
  };

  const filterCategory = async (categoryId: string) => {
    const categoryURL: string = `https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`;
    try {
      const response = await fetch(categoryURL);
      const data = await response.json();
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching category', error);
    }
  };

  return (
    <>
      <Navbar cartItemCount={cart.reduce((count, item) => count + item.quantity, 0)} />
      <br />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/cart" element={<Cart cart={cart} onRemove={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} />} />
        {products.length > 0 && (
          <Route path="/product" element={<ProductLayout />}>
            <Route index element={<ProductList filterCategory={filterCategory} products={products} onClickProps={handleAddToCart} />} />
            <Route path=":id" element={<ProductDetail getItems={getItems} items={items} onClickProps={handleAddToCart} />} />
          </Route>
        )}
        {/* </Route> */}

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      {/* <Footer /> */}
    </>
  );
};

export default App;
