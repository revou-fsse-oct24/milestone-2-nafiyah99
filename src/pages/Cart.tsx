import React from 'react';
import { CartItem as CartItemType } from '../App';
import Button from '../components/Button';
import CartItem from '../components/CartItem';

interface CartProps {
  cart: CartItemType[];
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, onRemove, onUpdateQuantity }) => {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <>
      <section className="m-20 w-auto md:max-w-screen-md bg-zinc-900 flex flex-col items-start justify-center border border-zinc-700 rounded-xl p-10 gap-5">
        {cart.length === 0 ? (
          <p className="text-2xl">There are no items in your cart.</p>
        ) : (
          <>
            {cart.map((item) => (
              <CartItem key={item.product.id} item={item} onRemove={onRemove} onUpdateQuantity={onUpdateQuantity} />
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
