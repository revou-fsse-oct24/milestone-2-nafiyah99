import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';
import ProductLayout from './pages/ProductLayout';
import Navbar from './components/Navbar';
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

const App = () => {

  const handleAddToCart = (products: Products[]) => {
    console.log('succesfully added to cart', products);
  }

  const [products, setProducts] = useState<Products[]>([]);
  const [items, setItems] = useState<Products | null>(null);
  
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
      console.error('Error fetching category', error)
    }
  };

  return (
    <>
      <Navbar />     
      <br />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route element={<ProtectedRoute />}> */}
        {products.length > 0 && (
        <Route path="/product" element={<ProductLayout />}>
          <Route index element={<ProductList filterCategory={filterCategory} products={products} onClickProps={() => handleAddToCart} />} />
          <Route path=":id" element={<ProductDetail getItems={getItems} items={items} onClickProps={() => handleAddToCart}  />} />
        </Route>
        )}
        {/* </Route> */}

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* <Footer /> */}
    </>
  );
}

export default App;
