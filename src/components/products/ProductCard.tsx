// components/products/ProductCard.tsx
import React from 'react';
import Button from '@/components/UI/Button';
import { Products } from '@/types';
import Image from 'next/image';

interface ProductCardProps {
  product: Products;
}

const handleAddToCart = (product: Products) => {
  console.log('Add to cart', product);
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="p-4 max-w-64 items justify-between flex flex-col gap-4 bg-zinc-900 rounded-xl border border-zinc-700">
      <div>
        <Image fill src={product.images[0]} alt={product.title} className="rounded-lg w-72 self-stretch mb-2 object-cover" />
        <h2 className="font-semibold text-start">{product.title}</h2>
        <span className="bg-neutral-900 mt-2 flex items-start w-max border border-zinc-600 rounded-2xl text-xs p-1 px-2">{product.category.name}</span>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold text-start">$ {product.price}</p>
          <Button onClickProps={handleAddToCart}>Add to cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
