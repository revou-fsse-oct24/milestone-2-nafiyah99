// components/products/ProductCard.tsx
import React from "react";
import Button from "@/components/UI/Button";
import { Products } from "@/types";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Products;
}

const handleAddToCart = (product: Products) => {
  console.log("Add to cart", product);
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const router = useRouter();

  const handleImageClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div className="p-4 w-80 flex flex-col gap-4 bg-zinc-900 rounded-xl border border-zinc-700">
      <div
        className="relative w-full h-48 cursor-pointer"
        onClick={handleImageClick}
      >
        <Image
          src={product.images[0]}
          alt={product.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div>
        <h2 className="font-semibold text-start text-lg">{product.title}</h2>
        <span className="bg-neutral-900 mt-2 inline-block border border-zinc-600 rounded-2xl text-xs p-1 px-2">
          {product.category.name}
        </span>
      </div>
      <div className="mt-auto">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold text-start">$ {product.price}</p>
          <button onClick={handleAddToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
