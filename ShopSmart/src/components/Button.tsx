import { Products } from "../App";

const Button = ({ onClickProps, children }: { onClickProps: (product: Products) => void; children: React.ReactNode }) => {

  const product = {} as Products; // Replace with actual product data

  return (
    <>
      <button onClick={()=>onClickProps(product)} className="bg-zinc-800 w-max">{children}</button>
    </>
  );
};

export default Button;
