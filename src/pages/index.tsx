import React from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';

const Home = () => {
  return (
    <>
      <section className="p-2 flex flex-col justify-center items-center">
        <div className='flex flex-col items-center gap-10 m-16'>
          <h1>Home Page</h1>
          <p className="">a page of ShopSmart where you can buy your favorite item for a fair price</p>
        </div>
        <Link className="bg-zinc-200 text-blue-700 rounded-md p-3" href={"/products"}>
          Start Shopping
        </Link>
      </section>
    </>
  );
};

export default Home;
