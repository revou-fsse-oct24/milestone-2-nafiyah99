import { Outlet, useSearchParams, useLocation } from 'react-router-dom';
import useFetchProducts from '../utils/useFetchProducts';

const ProductLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category: string | null = searchParams.get('category');
  const title: string | null = searchParams.get('title');
  const location = useLocation();

  const { products } = useFetchProducts();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ category: category ?? '', title: e.target.value });
  };

  return (
    <>
      <div className="mt-20">
        {location.pathname === '/product' && (
          <input
            className="bg-zinc-900 border border-zinc-700 flex text-white p-3 w-auto m-2 ml-10 rounded-xl"
            placeholder="Search by title"
            type="text"
            value={title ?? ''}
            onChange={handleSearchChange}
          />
        )}
        <Outlet context={{ category, title, products }} />
      </div>
    </>
  );
};

export default ProductLayout;
