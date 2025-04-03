import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { motion } from "framer-motion";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);

        if (!response.data || Object.keys(response.data).length === 0) {
          throw new Error("Product not found.");
        }

        setProduct(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          className="text-xl text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          Loading product details...
        </motion.div>
      </div>
    );

  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-br from-[#1E1E2E] to-[#38124A] text-white shadow-lg rounded-xl mt-12 flex flex-col md:flex-row items-center">
      
      {/* Animated Product Image */}
      <motion.img
        src={product.thumbnail || "/placeholder.jpg"} // Fallback image
        alt={product.title || "Product Image"}
        className="w-full md:w-1/2 rounded-lg shadow-xl object-cover border-2 border-[#EC4186]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      <div className="md:ml-8 flex flex-col justify-center text-center md:text-left">
        {/* Animated Title */}
        <motion.h1
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-4xl font-extrabold text-[#EC4186] tracking-wide"
        >
          {product.title || "Unknown Product"}
        </motion.h1>

        <p className="text-gray-300 mt-2 leading-relaxed">
          {product.description || "No description available."}
        </p>

        {/* Animated Price */}
        <motion.p
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-[#EE544A] text-3xl font-bold mt-4 tracking-wide"
        >
          ${product.price?.toFixed(2) || "0.00"}
        </motion.p>

        {/* Animated Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.07, boxShadow: "0px 0px 15px rgba(236, 65, 134, 0.7)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#EC4186] text-white px-8 py-3 rounded-lg mt-6 hover:bg-[#EE544A] transition-all shadow-lg font-semibold tracking-wide"
          onClick={() => dispatch(addToCart(product))}
        >
          🛒 Add to Cart
        </motion.button>
      </div>
    </div>
  );
};

export default ProductDetail;





