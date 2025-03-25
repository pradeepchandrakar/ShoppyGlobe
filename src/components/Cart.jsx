// src/components/Cart.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen bg-gradient-to-r from-[#1E1E2E] to-[#121212] text-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#EC4176]">Shopping Cart</h1>

      {cart.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-400 text-center text-lg"
        >
          Your cart is empty.{" "}
          <Link to="/" className="text-[#EC4176] hover:underline">
            Shop Now
          </Link>
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {cart.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex justify-between items-center border border-[#EC4176] p-4 rounded-lg shadow-lg bg-[#24243E]"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-300">${item.price}</p>
                  <div className="flex items-center mt-2">
                    {/* Decrease Quantity Button */}
                    <button
                      className="px-3 py-1 bg-gray-600 rounded-l hover:bg-gray-500 transition"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    {/* Show Quantity */}
                    <span className="px-4 py-1 border border-gray-500 text-white">
                      {item.quantity}
                    </span>
                    {/* Increase Quantity Button */}
                    <button
                      className="px-3 py-1 bg-gray-600 rounded-r hover:bg-gray-500 transition"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {cart.length > 0 && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-[#EC4176]">
            Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
          </h2>
          <Link to="/checkout">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition shadow-lg"
            >
              Proceed to Checkout
            </motion.button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;





