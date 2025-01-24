import { useEffect, useState } from 'react';
import { Products } from '@/types';

const useFetchProducts = (token?: string) => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const URL: string = 'https://api.escuelajs.co/api/v1/products';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products', {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('products', data)
        const filteredProducts = data.filter((product: Products) => 
          product.images.length >= 3
        );
        setProducts(filteredProducts);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
        console.error('Error fetching products', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  return { products, loading, error };
};

export default useFetchProducts;
