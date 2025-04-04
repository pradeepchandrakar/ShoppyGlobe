import React from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/cartSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to add items to the cart.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedCart = response.data.cart.items.map((item) =>
        item.productId === product._id ? { ...item, product } : item
      );

      dispatch(setCart(updatedCart));
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  const discount = product.discountPercentage || 0;
  const discountedPrice = (
    product.price -
    (product.price * discount) / 100
  ).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-[#1E1E2E] p-6 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-all border border-[#EC4186]"
    >
      {/* Product Image */}
      <motion.img
        src={product.thumbnail}
        alt={product.title}
        className="w-48 h-48 object-cover rounded-lg mb-4 border-2 border-[#EC4186]"
        whileHover={{ scale: 1.05 }}
        loading="lazy"
      />

      {/* Product Title */}
      <h2 className="text-lg font-bold text-[#EC4186] mb-2">{product.title}</h2>

      {/* Price Details */}
      {discount > 0 ? (
        <>
          <p className="text-orange-400 line-through text-sm">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-green-400 text-xl font-semibold">
            ${discountedPrice}
          </p>
          <p className="text-red-400 text-sm">{discount}% OFF</p>
        </>
      ) : (
        <p className="text-pink-400 text-xl font-semibold">
          ${product.price.toFixed(2)}
        </p>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mt-4 w-full">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#EC4186] hover:bg-[#EE544A] text-white py-2 px-4 rounded-lg w-full"
          onClick={handleAddToCart}
        >
          🛒 Add to Cart
        </motion.button>

        <Link
          to={`/product/${product._id}`}
          className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg w-full text-center"
        >
          🔍 View
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductItem;












