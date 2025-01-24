import React from 'react';
import { CartItemProps } from '@/types';
import Image from 'next/image';


const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
  const { product, quantity } = item;

  return (
    <div className="flex justify-between items-center gap-10 w-full p-4 bg-zinc-900 border border-zinc-700 rounded-xl">
      <div className="flex items-center gap-4">
        <Image width={80} height={80} src={product.images[0]} alt={product.title} className="w-20 h-20 object-cover rounded-lg" />
        <div className="flex flex-col items-start">
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-400">${product.price}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className={`text-xs p-2 rounded ${quantity <= 1 ? 'bg-zinc-700 cursor-not-allowed' : 'bg-zinc-800 hover:bg-zinc-700'}`} onClick={() => onUpdateQuantity(product.id, -1)} disabled={quantity <= 1}>
          –
        </button>
        <p>{quantity}</p>
        <button className="text-xs bg-zinc-800 p-2 rounded hover:bg-zinc-700" onClick={() => onUpdateQuantity(product.id, +1)}>
          +
        </button>
        <button className="text-xs bg-red-600 p-2 rounded hover:bg-red-500" onClick={() => onRemove(product.id)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
