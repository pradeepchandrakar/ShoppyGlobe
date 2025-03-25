import React from "react";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";
import { motion } from "framer-motion";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  // Calculate Discounted Price
  const discountedPrice = (
    item.price -
    (item.price * item.discountPercentage) / 100
  ).toFixed(2);

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
          {/* Final Discounted Price */}
          <p className="text-green-400 text-xl font-bold">${discountedPrice}</p>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-3">
        <button
          className="bg-gray-700 text-white px-3 py-1 rounded-l hover:bg-gray-500 transition"
          onClick={() => dispatch(decreaseQuantity(item.id))}
        >
          ➖
        </button>
        <span className="text-lg font-semibold px-4 py-1 border border-gray-500 rounded">
          {item.quantity}
        </span>
        <button
          className="bg-gray-700 text-white px-3 py-1 rounded-r hover:bg-gray-500 transition"
          onClick={() => dispatch(increaseQuantity(item.id))}
        >
          ➕
        </button>
      </div>

      {/* Remove Button */}
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        onClick={() => dispatch(removeFromCart(item.id))}
      >
        ❌ Remove
      </button>
    </motion.div>
  );
};

export default CartItem;
