import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-[#1E1E2E] text-white shadow-lg rounded-lg mt-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-extrabold text-[#EC4186] mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-400 text-lg">
          Your cart is empty.{" "}
          <Link to="/" className="text-[#EC4186] hover:underline">
            Go Shopping
          </Link>
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center border-t border-gray-600 pt-4">
            {/* Total Price Display */}
            <motion.h2
              className="text-2xl font-semibold text-[#EE544A]"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              Total: ${totalPrice.toFixed(2)}
            </motion.h2>

            {/* Checkout Button */}
            <Link to="/checkout">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#EC4186] text-white px-6 py-2 rounded-lg hover:bg-[#EE544A] transition-all shadow-md"
              >
                Proceed to Checkout
              </motion.button>
            </Link>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Cart;


