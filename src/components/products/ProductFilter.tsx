// components/ProductFilter.tsx
import React from "react";

interface ProductFilterProps {
  onFilterCategory: (categoryId: string) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterCategory }) => {
  return (
    <aside className=" p-4 h-72 w-1/4 bg-zinc-900 border border-zinc-700 rounded-xl">
      <h2>Categories:</h2>
      <ul className="flex flex-col gap-1 mt-2">
        <button
          className="bg-slate-800 lg:px-4 md:px-4 p-1 lg:w-full md:w-full"
          onClick={() => onFilterCategory("")}
        >
          All
        </button>
        <button
          className="bg-slate-800 lg:px-4 md:px-4 p-1 lg:w-full md:w-full"
          onClick={() => onFilterCategory("1")}
        >
          Clothes
        </button>
        <button
          className="bg-slate-800 lg:px-4 md:px-4 p-1 lg:w-full md:w-full"
          onClick={() => onFilterCategory("2")}
        >
          Electronics
        </button>
        <button
          className="bg-slate-800 lg:px-4 md:px-4 p-1 lg:w-full md:w-full"
          onClick={() => onFilterCategory("3")}
        >
          Furniture
        </button>
        <button
          className="bg-slate-800 lg:px-4 md:px-4 p-1 lg:w-full md:w-full"
          onClick={() => onFilterCategory("4")}
        >
          Shoes
        </button>
        <button
          className="bg-slate-800 lg:px-4 md:px-4 p-1 lg:w-full md:w-full"
          onClick={() => onFilterCategory("5")}
        >
          Miscellaneous
        </button>
      </ul>
    </aside>
  );
};

export default ProductFilter;
