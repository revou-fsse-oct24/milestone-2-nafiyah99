import { Outlet, useSearchParams, useLocation } from 'react-router-dom';

const ProductLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category: string | null = searchParams.get('category');
  const location = useLocation();

  return (
    <>
    {location.pathname === '/product' && (
      <input
      className="bg-zinc-900 border border-zinc-700 flex text-white p-3 w-72 m-2 rounded-xl"
      placeholder=" Search by category"
      type="text"
      value={category ?? ''}
      onChange={(e) => setSearchParams({ category: e.target.value })}
      />
    )}
      <Outlet context={{ category }} />
    </>
  );
};

export default ProductLayout;
