import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <section className="p-2 m-36 flex flex-col justify-center items-center">
        <div className='flex flex-col items-center gap-10 m-16'>
          <h1>Home Page</h1>
          <p className="">a page of ShopSmart where you can buy your favorite item for a fair price</p>
        </div>
        <Link className="bg-zinc-200 text-blue-700 rounded-md p-3" to="/product">
          Start Shopping
        </Link>
      </section>
    </>
  );
};

export default Home;
