import React from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';

const Home = () => {
  return (
    <>
    <h1>Home</h1>
    <Link href={"/auth/login"}>Login</Link>
    <br />
    <Link href={"/products"}>Products</Link>
    </>
  );
}

export default Home;
