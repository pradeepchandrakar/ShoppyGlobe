import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react"; // Modern cart icon

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <header className="bg-gradient-to-r from-[#1E1E2E] to-[#121212] text-white p-5 flex justify-between items-center shadow-lg border border-[#EC4176] ">
      <motion.h1
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-3xl font-extrabold text-[#EC4176]"
      >
        <Link to="/">ShoppyGlobe</Link>
      </motion.h1>

      <nav className="flex space-x-8 text-lg mr-6">
        <Link
          to="/"
          className="hover:text-[#EC4176] transition duration-300"
        >
          Home
        </Link>
        
        <Link to="/cart" className="relative flex items-center hover:text-[#EC4176] transition duration-300 ">
          <ShoppingCart size={22} className="mr-1" />
          Cart
          {cartItems.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 absolute -top-2 -right-4 shadow-md animate-pulse  "
            >
              {cartItems.length}
            </motion.span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;

