import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUser, fetchCart } from "../redux/authSlice"; // ✅ fetchCart import kiya
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items || []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(setUser(storedUser));
      dispatch(fetchCart()); // ✅ Login ke turant baad cart fetch karein
    }
  }, [dispatch]);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await axios.post("http://localhost:5000/api/auth/logout");

        dispatch(logout());
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error.response?.data?.message || error.message);
      }
    }
  };

  return (
    <header className="bg-gradient-to-r from-[#1E1E2E] to-[#121212] text-white p-5 flex justify-between items-center shadow-lg border border-[#EC4176]">
      <motion.h1
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-3xl font-extrabold text-[#EC4176]"
      >
        <Link to="/">ShoppyGlobe</Link>
      </motion.h1>

      <nav className="flex space-x-8 text-lg mr-6">
        <Link to="/" className="hover:text-[#EC4176] transition duration-300">
          Home
        </Link>

        <Link
          to="/cart"
          className="relative flex items-center hover:text-[#EC4176] transition duration-300"
        >
          <ShoppingCart size={24} className="mr-1" />
          Cart
          {cartItems.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 absolute -top-2 -right-4 shadow-md"
            >
              {cartItems.length}
            </motion.span>
          )}
        </Link>

        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded transition duration-200"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 px-4 py-1 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;










