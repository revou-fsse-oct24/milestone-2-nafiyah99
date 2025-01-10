import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const Navbar = ({ cartItemCount }: { cartItemCount: number }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="fixed bg-zinc-900 py-5 px-10 top-0 left-0 right-0 p-3 flex justify-between z-50">
        <p className="text-4xl font-semibold">ShopSmart</p>
        <nav className="flex items-center">
          <button
            className="block md:hidden p-2 rounded focus:outline-none focus:shadow-outline"
            onClick={toggleMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          <ul className={`flex-col items-center md:flex-row gap-5 ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
            <li>
              <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/product" onClick={() => setIsMenuOpen(false)}>Product List</NavLink>
            </li>
            <li>
              <NavLink to="/cart" onClick={() => setIsMenuOpen(false)}>Cart ({cartItemCount})</NavLink>
            </li>
            <li className='bg-white px-4 py-2 rounded-md'>
              {isLoggedIn ? (
                <NavLink to={location.pathname} onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                  Logout
                </NavLink>
              ) : (
                <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
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
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <ul className="flex flex-col gap-5 text-white text-2xl">
            <li>
              <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/product" onClick={() => setIsMenuOpen(false)}>Product List</NavLink>
            </li>
            <li>
              <NavLink to="/cart" onClick={() => setIsMenuOpen(false)}>Cart ({cartItemCount})</NavLink>
            </li>
            <li>
              {isLoggedIn ? (
                <NavLink to={location.pathname} onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                  Logout
                </NavLink>
              ) : (
                <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
              )}
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;