import React, { useState, useEffect } from "react";
import ProductSearch from "@/components/products/ProductSearch";
import ProductFilter from "@/components/products/ProductFilter";
import ProductCard from "@/components/products/ProductCard";
import { Products } from "@/types";
import { GetServerSideProps } from "next";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { fetchProducts } from "@/utils/api";

interface ProductPageProps {
  initialProducts: Products[];
  error?: string;
}

const ProductPage: React.FC<ProductPageProps> = ({
  initialProducts,
  error,
}) => {
  const [products, setProducts] = useState<Products[]>(initialProducts);
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const { isAuthenticated, checkAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!checkAuth()) {
      router.push("/auth/login");
    }
  }, [checkAuth, router]);

  const handleFilterCategory = (categoryId: string) => {
    setCategory(categoryId);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category
      ? product.category.name.includes(category)
      : true;
    const matchesTitle = search
      ? product.title.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchesCategory && matchesTitle;
  });

  if (!isAuthenticated) {
    return null;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-2xl mt-10">{error}</div>
    );
  }

  return (
    <section className="flex flex-col min-h-screen ">
      <h1 className="text-start text-4xl m-5 ms-0">Product List</h1>
      <ProductSearch value={search} onSearchChange={handleSearchChange} />

      <div className="flex flex-col md:flex-row gap-6">
        <ProductFilter onFilterCategory={handleFilterCategory} />
        <section className="w-3/4 md:col-span-3">
          <div className="flex flex-wrap gap-3 rounded-xl justify-end">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="text-center text-white text-2xl mt-10">
                No products found
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const initialProducts = await fetchProducts();
    return { props: { initialProducts } };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: { initialProducts: [], error: "Failed to fetch products" },
    };
  }
};

export default ProductPage;
