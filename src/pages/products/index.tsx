import React, { useState, useEffect } from 'react';
import ProductSearch from '@/components/products/ProductSearch';
import ProductFilter from '@/components/products/ProductFilter';
import ProductCard from '@/components/products/ProductCard';
import { Products } from '@/types';
import { GetServerSideProps } from 'next';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';

interface ProductPageProps {
  products: Products[];
}

const ProductPage: React.FC<ProductPageProps> = ({ products }) => {
  const [category, setCategory] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    }
  }, [token, router]);

  const handleFilterCategory = (categoryId: string) => {
    setCategory(categoryId);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category ? product.category.name.includes(category) : true;
    const matchesTitle = search ? product.title.toLowerCase().includes(search.toLowerCase()) : true;
    return matchesCategory && matchesTitle;
  });

  if (!token) {
    return null;
  }

  return (
    <section className="flex flex-col min-h-screen m-10">
      <h1 className="text-start text-4xl m-5 ms-0">Product List</h1>
      <ProductSearch value={search} onSearchChange={handleSearchChange} />
      
      <div className="flex flex-col md:flex-row gap-6">
        <ProductFilter onFilterCategory={handleFilterCategory} />
        <section className="w-3/4 md:col-span-3">
          <div className="p-3 flex flex-wrap gap-3 rounded-xl justify-center">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))
            ) : (
              <div className="text-center text-white text-2xl mt-10">No products found</div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    const filteredProducts = data.filter((product: Products) => product.images.length >= 3);

    return {
      props: { products: filteredProducts },
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: { products: [] },
    };
  }
};

export default ProductPage;
