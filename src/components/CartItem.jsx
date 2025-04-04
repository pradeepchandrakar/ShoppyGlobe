import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCart } from "../redux/cartSlice";
import { motion } from "framer-motion";
import axios from "axios";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const handleQuantityChange = async (type) => {
    setLoading(true);
    try {
      const newQuantity = type === "increase" ? item.quantity + 1 : item.quantity - 1;

      if (newQuantity > 0) {
        const response = await axios.put(
          "http://localhost:5000/api/cart/update",
          { productId: item.productId, quantity: newQuantity },
          axiosConfig
        );
        dispatch(updateCart(response.data.cart));
      } else {
        await axios.delete(
          `http://localhost:5000/api/cart/remove/${item.productId}`,
          axiosConfig
        );
        dispatch(removeFromCart(item.productId));
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
    setLoading(false);
  };

  const handleRemoveItem = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `http://localhost:5000/api/cart/remove/${item.productId}`,
        axiosConfig
      );
      dispatch(removeFromCart(item.productId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
    setLoading(false);
  };

  // ✅ Safe fallback product info
  const product = item.product || {};
  const title = product.title || "Untitled";
  const thumbnail = product.thumbnail || "https://via.placeholder.com/80";
  const discountedPrice =
    product.price && product.discount
      ? (product.price * (1 - product.discount / 100)).toFixed(2)
      : product.price || "N/A";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="border border-[#EC4176] p-4 rounded-lg shadow-lg bg-[#1E1E2E] text-white flex justify-between items-center mb-4"
    >
      {/* Product Details */}
      <div className="flex items-center space-x-4">
        <motion.img
          src={thumbnail}
          alt={title}
          className="w-20 h-20 object-cover rounded-lg shadow-md border border-[#EC4176]"
          whileHover={{ scale: 1.05 }}
        />
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-green-400 text-xl font-bold">${discountedPrice}</p>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-3">
        <button
          className="bg-gray-700 text-white px-3 py-1 rounded-l hover:bg-gray-500 transition disabled:opacity-50"
          onClick={() => handleQuantityChange("decrease")}
          disabled={loading}
        >
          ➖
        </button>
        <span className="text-lg font-semibold px-4 py-1 border border-gray-500 rounded">
          {item.quantity}
        </span>
        <button
          className="bg-gray-700 text-white px-3 py-1 rounded-r hover:bg-gray-500 transition disabled:opacity-50"
          onClick={() => handleQuantityChange("increase")}
          disabled={loading}
        >
          ➕
        </button>
      </div>

      {/* Remove Button */}
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
        onClick={handleRemoveItem}
        disabled={loading}
      >
        {loading ? "Removing..." : "❌ Remove"}
      </button>
    </motion.div>
  );
};

export default CartItem;







