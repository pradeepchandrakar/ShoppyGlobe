import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCart } from "../redux/cartSlice";
import { motion } from "framer-motion";
import axios from "axios";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Retrieve token from local storage
  const token = localStorage.getItem("token");

  // Axios configuration with token
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  // Update Quantity in Backend & Redux
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

        dispatch(updateCart(response.data.cart)); // ✅ Update Redux with fresh data from DB
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

  // Remove Item from Cart (Backend + Redux)
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

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="border border-[#EC4176] p-4 rounded-lg shadow-lg bg-[#1E1E2E] text-white flex justify-between items-center mb-4"
    >
      {/* Product Details */}
      <div className="flex items-center space-x-4">
        <motion.img
          src={item.thumbnail}
          alt={item.title}
          className="w-20 h-20 object-cover rounded-lg shadow-md border border-[#EC4176]"
          whileHover={{ scale: 1.05 }}
        />
        <div>
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p className="text-green-400 text-xl font-bold">${item.price}</p>
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



