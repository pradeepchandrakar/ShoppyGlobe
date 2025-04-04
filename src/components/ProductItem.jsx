import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useAddToCart from "../hooks/useAddToCart"; // ✅ custom hook

const ProductItem = ({ product }) => {
  const { addToCart } = useAddToCart(); // ✅ hook se logic lo

  if (!product) return <div className="text-red-500">Error: Product data missing.</div>;

  const productId = product?._id || "";
  const price = Number(product?.price) || 0;
  const discountPercentage = Number(product?.discountPercentage) || 0;

  const discountedPrice = useMemo(() => (
    (price - (price * discountPercentage) / 100).toFixed(2)
  ), [price, discountPercentage]);

  return (
    <motion.div className="bg-[#24243E] p-6 rounded-xl text-center shadow-lg">
      <motion.img
        src={product?.thumbnail || "/placeholder.jpg"}
        alt={product?.title}
        className="w-48 h-48 object-cover"
      />

      <h2 className="text-lg font-bold text-[#EC4186]">
        {product?.title || "Unknown Product"}
      </h2>

      <p className="text-gray-400 line-through">${price.toFixed(2)}</p>
      <p className="text-[#EE544A] text-xl font-semibold">${discountedPrice}</p>

      <div className="flex justify-center space-x-3 mt-4">
        <Link
          to={`/product/${productId}`}
          className="bg-[#38124A] text-white px-4 py-2 rounded-lg"
        >
          View Details
        </Link>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-[#EC4186] text-white px-4 py-2 rounded-lg"
          onClick={() => addToCart(productId)} // ✅ backend + redux
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductItem;









