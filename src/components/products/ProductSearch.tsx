// components/ProductSearch.tsx
import React from 'react';

interface ProductSearchProps {
  value: string;
  onSearchChange: (value: string) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ value, onSearchChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <input
      className="bg-zinc-900 border border-zinc-700 flex text-white p-3 w-auto m-2 ml-10 rounded-xl"
      placeholder="Search by title"
      type="text"
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default ProductSearch;
