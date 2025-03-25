import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { motion } from "framer-motion";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-[#1E1E2E] p-6 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-all "
    >
      {/* Product Image */}
      <motion.img
        src={product.thumbnail}
        alt={product.title}
        className="w-48 h-48 object-cover rounded-lg mb-4 border-2 border-[#EC4186]"
        whileHover={{ scale: 1.05 }}
      />

      {/* Product Title */}
      <h2 className="text-lg font-bold text-[#EC4186]">{product.title}</h2>
      <p className="text-[#EE544A] text-xl font-semibold mt-1">${product.price}</p>

      {/* Buttons */}
      <div className="flex space-x-3 mt-4">
        <Link
          to={`/product/${product.id}`}
          className="bg-[#38124A] text-white px-4 py-2 rounded-lg hover:bg-[#EC4186] transition-all"
        >
          View Details
        </Link>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#EC4186] text-white px-4 py- rounded-lg hover:bg-[#EE544A] transition-all"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductItem;

