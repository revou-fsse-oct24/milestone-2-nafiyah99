import { useEffect, useState } from 'react';

interface Products {
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

const useProducts = (): Products[] => {
  const [products, setProducts] = useState<Products[]>([]);
  const URL: string = 'https://api.escuelajs.co/api/v1/products';
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  return products;
};

export default useProducts;
