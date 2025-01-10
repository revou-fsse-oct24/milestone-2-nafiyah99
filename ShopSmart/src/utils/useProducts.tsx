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

const useProducts: React.FC = () => {
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

  console.log('products', products);

  return (
    <>
      <h1>Products</h1>
      products;
    </>
  );
};

export default useProducts;
