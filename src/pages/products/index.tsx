import { Products } from '@/types';
import React from 'react';

const ProductPage = ({ products } : {products: Products[]}) => {
  return (
    <>
      <h1>Product Page</h1>
      <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>

    </>
  );
};

export async function getServerSideProps() {

  let products: Products[] = [];

  try {
    const res = await fetch('https://api.escuelajs.co/api/v1/products');
    products = await res.json();
    
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

  return {
    props: { products },
  };
}

export default ProductPage;
