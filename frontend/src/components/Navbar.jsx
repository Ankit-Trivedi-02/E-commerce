import { Link } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navRef = useRef(null);

  const cartItemsCount = cartItems.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Developer', path: '/developer' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
        ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-lg shadow-md py-3'
            : 'bg-indigo-600 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          
          {/* Logo */}
          <Link
            to="/"
            className={`text-2xl font-bold transition-all duration-500 ${
              isScrolled ? 'text-indigo-600' : 'text-white'
            }`}
          >
            ShopMVP
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className={`group flex flex-col gap-1 text-sm font-medium transition-all duration-300
                ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {link.name}

                <span
                  className={`h-0.5 w-0 group-hover:w-full transition-all duration-300
                  ${
                    isScrolled ? 'bg-gray-700' : 'bg-white'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Cart */}
            <Link
              to="/cart"
              className={`relative transition-all duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              <ShoppingCart size={24} />

              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Profile */}
            <Link
              to={user ? '/profile' : '/login'}
              className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-500
              ${
                isScrolled
                  ? 'bg-black text-white'
                  : 'bg-white text-black'
              }`}
            >
              <User size={18} />

              <span className="text-sm font-medium">
                {user ? user.name : 'Profile'}
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className={`md:hidden transition-all duration-300 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-full bg-white z-[100]
        flex flex-col items-center justify-center gap-8
        transition-all duration-500 md:hidden
        ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 text-gray-700"
        >
          <X size={30} />
        </button>

        {/* Links */}
        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            onClick={() => setMenuOpen(false)}
            className="text-xl font-medium text-gray-800"
          >
            {link.name}
          </Link>
        ))}

        {/* Cart */}
        <Link
          to="/cart"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3 text-lg text-gray-800"
        >
          <div className="relative">
            <ShoppingCart size={24} />

            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </div>

          Cart
        </Link>

        {/* Profile */}
        <Link
          to={user ? '/profile' : '/login'}
          onClick={() => setMenuOpen(false)}
          className="bg-black text-white px-8 py-3 rounded-full flex items-center gap-2"
        >
          <User size={18} />

          {user ? user.name : 'Profile'}
        </Link>
      </div>

      {/* Spacer */}
      <div className="h-24" />
    </>
  );
};

export default Navbar;