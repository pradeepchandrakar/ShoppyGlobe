// src/components/CartItem.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../redux/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="border p-4 rounded shadow-md bg-white flex justify-between items-center mb-4">
      <div className="flex items-center space-x-4">
        <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded" />
        <div>
          <h2 className="text-lg font-bold">{item.title}</h2>
          <p className="text-green-600 font-semibold">${item.price}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400 transition"
          onClick={() => dispatch(decreaseQuantity(item.id))}
        >
          -
        </button>
        <span className="text-lg font-semibold">{item.quantity}</span>
        <button
          className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400 transition"
          onClick={() => dispatch(increaseQuantity(item.id))}
        >
          +
        </button>
      </div>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        onClick={() => dispatch(removeFromCart(item.id))}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;

