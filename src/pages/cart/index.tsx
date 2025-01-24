import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '@/context/CartContext';
import Button from '@/components/UI/Button';
import CartItem from '@/components/cart/CartItem';

const Cart = () => {
  const router = useRouter();
  const { cart, onRemoveFromCart, onUpdateQuantity } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const total = cart.length > 0 ? cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0) : 0;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) return null;

  return (
    <>
      <section className="m-20 w-auto bg-zinc-900 flex flex-col items-center justify-center border border-zinc-700 rounded-xl p-10 gap-5">
        {cart.length === 0 ? (
          <p className="text-2xl">There are no items in your cart.</p>
        ) : (
          <>
            {cart.map((item) => (
              <CartItem key={item.product.id} item={item} onRemove={onRemoveFromCart} onUpdateQuantity={onUpdateQuantity} />
            ))}
            <p className="text-2xl">Total: ${total.toFixed(2)}</p>
            <Button onClickProps={() => alert('Proceed to checkout')}>Checkout</Button>
          </>
        )}
      </section>
    </>
  );
};

export default Cart;
