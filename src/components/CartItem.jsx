import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../redux/cartSlice";
import { motion } from "framer-motion";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="border border-[#EC4176] p-4 rounded-lg shadow-lg bg-[#24243E] text-white flex justify-between items-center mb-4"
    >
      <div className="flex items-center space-x-4">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-20 h-20 object-cover rounded-lg shadow-md bg-black border border-[#EC4176]"
        />
        <div>
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p className="text-[#EC4176] font-bold">${item.price}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Decrease Quantity Button */}
        <button
          className="bg-gray-600 text-white px-3 py-1 rounded-l hover:bg-gray-500 transition"
          onClick={() => dispatch(decreaseQuantity(item.id))}
        >
          -
        </button>
        {/* Show Quantity */}
        <span className="text-lg font-semibold px-4 py-1 border border-gray-500 rounded">
          {item.quantity}
        </span>
        {/* Increase Quantity Button */}
        <button
          className="bg-gray-600 text-white px-3 py-1 rounded-r hover:bg-gray-500 transition"
          onClick={() => dispatch(increaseQuantity(item.id))}
        >
          +
        </button>
      </div>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        onClick={() => dispatch(removeFromCart(item.id))}
      >
        Remove
      </button>
    </motion.div>
  );
};

export default CartItem;


