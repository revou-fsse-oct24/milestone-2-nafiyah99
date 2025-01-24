import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import LogoutModal from './LogoutModal';

const Navbar = ({ cartItemCount }: { cartItemCount: number }) => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  // const router = useRouter();

  // const isLoggedIn = Boolean(localStorage.getItem('token'));

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('refresh_token');
  //   router.push('/');
  // };

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  return (
    <>
      {/* <header className="fixed bg-zinc-900 py-5 px-10 top-0 left-0 right-0 p-3 flex justify-between z-50">
        <p className="text-4xl font-semibold">ShopSmart</p>
        <nav className="flex items-center">
          <button
            className="block md:hidden p-2 rounded focus:outline-none focus:shadow-outline"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          <ul
            className={`flex-col items-center md:flex-row gap-5 ${
              isMenuOpen ? 'flex' : 'hidden'
            } md:flex`}
          >
            <li>
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/product" onClick={() => setIsMenuOpen(false)}>
                Product List
              </Link>
            </li>
            <li>
              <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                Cart {isLoggedIn ? `(${cartItemCount})` : ''}
              </Link>
            </li>
            <li className="bg-white px-4 py-2 rounded-md">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    setIsLogoutModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="text-black"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-100 flex flex-col items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 p-2 rounded focus:outline-none focus:shadow-outline"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <ul className="flex flex-col gap-5 text-white text-2xl">
            <li>
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/product" onClick={() => setIsMenuOpen(false)}>
                Product List
              </Link>
            </li>
            <li>
              <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                Cart {isLoggedIn ? `(${cartItemCount})` : ''}
              </Link>
            </li>
            <li>
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    setIsLogoutModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="text-white"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      /> */}
      <div className="bg-zinc-800">
        <h1>header</h1>
      </div>
    </>
  );
};

export default Navbar;
