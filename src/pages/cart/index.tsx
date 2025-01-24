import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "@/context/CartContext";
import Button from "@/components/UI/Button";
import CartItem from "@/components/cart/CartItem";

const Cart = () => {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleRemove = (productId: number) => {
    removeFromCart(productId);
  };

  const handleIncrease = (productId: number) => {
    const item = cart.find((item) => item.product.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  };

  const handleDecrease = (productId: number) => {
    const item = cart.find((item) => item.product.id === productId);
    if (item && item.quantity > 1) {
      updateQuantity(productId, item.quantity - 1);
    } else if (item && item.quantity === 1) {
      removeFromCart(productId);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <section className="m-20 w-auto bg-zinc-900 flex flex-col items-center justify-center border border-zinc-700 rounded-xl p-10 gap-5">
      {cart.length === 0 ? (
        <p className="text-2xl">There are no items in your cart.</p>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              onRemove={() => handleRemove(item.product.id)}
              onIncrease={() => handleIncrease(item.product.id)}
              onDecrease={() => handleDecrease(item.product.id)}
            />
          ))}
          <p className="text-2xl">Total: ${total.toFixed(2)}</p>
          <Button onClickProps={() => alert("Proceed to checkout")}>
            Checkout
          </Button>
        </>
      )}
    </section>
  );
};

export default Cart;
