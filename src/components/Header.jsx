// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">
        <Link to="/">ShoppyGlobe</Link>
      </h1>
      <nav className="flex space-x-6">
        <Link to="/" className="hover:text-gray-300 transition">Home</Link>
        <Link to="/cart" className="relative hover:text-gray-300 transition">
          Cart
          {cartItems.length > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 absolute -top-2 -right-4">
              {cartItems.length}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
