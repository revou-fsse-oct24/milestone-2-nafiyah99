import React from "react";
import { CartItem as CartItemType } from "@/types";
import Image from "next/image";

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onIncrease,
  onDecrease,
}) => {
  const { product, quantity } = item;

  return (
    <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg mb-4">
      <div className="flex items-center">
        <Image
          src={product.images[0]}
          alt={product.title}
          width={80}
          height={80}
          className="rounded-md mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-gray-400">${product.price}</p>
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={onDecrease}
          className="px-2 py-1 bg-zinc-700 rounded-l"
        >
          -
        </button>
        <span className="px-4 py-1 bg-zinc-600 flex items-center justify-center min-w-[40px]">
          {quantity}
        </span>
        <button
          onClick={onIncrease}
          className="px-2 py-1 bg-zinc-700 rounded-r"
        >
          +
        </button>
        <button
          onClick={onRemove}
          className="ml-4 px-3 py-1 bg-red-600 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
