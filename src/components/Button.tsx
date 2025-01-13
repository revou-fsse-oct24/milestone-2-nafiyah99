import React from 'react';
import { Products } from '../App';

interface ButtonProps {
  onClickProps: (product: Products) => void;

  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClickProps, children }) => {
  return (
    <button onClick={() => onClickProps({ id: 0, title: '', price: 0, description: '', category: { id: 0, name: '', image: '' }, images: [] })} className="bg-zinc-800 w-max">
      {children}
    </button>
  );
};

export default Button;
