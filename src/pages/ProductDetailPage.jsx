import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { motion } from "framer-motion";
import { Star } from "lucide-react"; // Importing star icon

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.id) {
          setProduct(data);
        } else {
          setError("Product not found.");
        }
      })
      .catch(() => setError("Failed to load product details."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <motion.div
        className="text-center text-lg mt-10 text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        🔄 Loading product details...
      </motion.div>
    );

  if (error)
    return (
      <motion.div
        className="text-center text-red-500 mt-10 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {error}
      </motion.div>
    );

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={20}
          className={`mx-1 ${
            i <= Math.round(rating) ? "text-yellow-400" : "text-gray-500"
          }`}
        />
      );
    }
    return stars;
  };

  // Calculate discounted price
  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <motion.div
      className="max-w-7xl mx-auto p-6 bg-[#1E1E2E] text-white shadow-lg rounded-lg mt-6 border border-[#EC4176]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="flex flex-col md:flex-row items-center">
        {/* Image Section */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-80 h-80 object-cover rounded-lg shadow-md border border-[#EC4176] transition duration-300"
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="md:ml-8 mt-6 md:mt-0 flex flex-col justify-center text-center md:text-left"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {product.title}
          </motion.h1>

          {/* Product Rating */}
          <motion.div
            className="flex items-center mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {renderStars(product.rating)}{" "}
            <span className="ml-2 text-lg text-gray-300">
              ({product.rating.toFixed(1)})
            </span>
          </motion.div>

          <motion.p
            className="text-gray-300 mt-3 text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {product.description}
          </motion.p>

          {/* Price Section with Discount */}
          <motion.div
            className="mt-4 flex flex-col"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-lg text-orange-400 line-through">
              Original Price: ${product.price.toFixed(2)}
            </p>
            <p className="text-green-400 text-2xl font-semibold">
              Discounted Price: ${discountedPrice.toFixed(2)}
            </p>
            <p className="text-red-500 text-lg font-medium">
              {product.discountPercentage}% OFF
            </p>
          </motion.div>

          {/* Add to Cart Button */}
          <motion.button
            onClick={() => dispatch(addToCart(product))}
            className="bg-[#EC4186] text-white px-5 py-2 rounded-md mt-4 font-medium text-base shadow-md hover:bg-[#f1146d] transition transform"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px #EC4176" }}
            whileTap={{ scale: 0.95 }}
          >
            🛒 Add to Cart
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;
