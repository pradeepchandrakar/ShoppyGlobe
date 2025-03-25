import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-[#121212] text-white px-4">
      {/* Animated 404 Error */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="text-7xl font-extrabold text-[#EC4186] drop-shadow-lg"
      >
        404
      </motion.h1>

      {/* Error Message */}
      <p className="text-gray-400 mt-2 text-lg">
        Oops! The page you are looking for does not exist.
      </p>

      {/* Animated Home Button */}
      <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 200 }}>
        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-[#EC4186] text-white rounded-lg shadow-lg hover:bg-[#EE544A] transition-all"
          aria-label="Go back to Home"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;



