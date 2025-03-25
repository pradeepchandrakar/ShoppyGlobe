import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { motion } from "framer-motion";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  // Calculate Discounted Price
  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  // Function to generate star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    return (
      <span className="text-yellow-400 text-lg">
        {"★".repeat(fullStars)}
        {halfStar && "☆"}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-[#1E1E2E] p-6 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-all"
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

      {/* Price Details */}
      <p className="text-lg text-orange-400 line-through">
        ${product.price.toFixed(2)}
      </p>
      <p className="text-green-400 text-xl font-semibold">${discountedPrice}</p>
      <p className="text-red-500 text-lg font-medium">
        {product.discountPercentage}% OFF
      </p>

      {/* Rating */}
      <p className="text-yellow-400 text-lg font-medium mt-2">
        Rating: {renderStars(product.rating)} ({product.rating})
      </p>

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
          className="bg-[#EC4186] text-white px-4 py-2 rounded-lg hover:bg-[#EE544A] transition-all"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductItem;
