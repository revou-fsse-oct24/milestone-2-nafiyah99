import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const Navbar: React.FC = () => {
  const { totalItems } = useCart();

  return (
    <nav className="bg-zinc-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          My Store
        </Link>
        <div className="flex items-center">
          <Link href="/products" className="text-white mr-4">
            Products
          </Link>
          <Link href="/cart" className="text-white">
            Cart ({totalItems})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
