const Button = ({ onClickProps, children }: { onClickProps: () => void; children: React.ReactNode }) => {
  return (
    <>
      <button onClick={onClickProps} className="bg-zinc-800 w-max">{children}</button>
    </>
  );
};

export default Button;
