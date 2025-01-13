import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <section className="">
        <div className='flex flex-col gap-10 m-16'>
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
