import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    cardNumber: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.address && formData.cardNumber.length === 16) {
      setOrderPlaced(true);
      setFormData({ name: "", address: "", cardNumber: "" }); // Reset form
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto p-6 bg-[#1E1E2E] text-white shadow-lg rounded-lg mt-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-extrabold text-[#EC4186] mb-4">Checkout</h1>

      {orderPlaced ? (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-green-400">🎉 Order Placed Successfully!</h2>
          <p className="text-gray-300 mt-2">Thank you for your purchase.</p>
        </motion.div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-3 text-[#EE544A]">Total: ${totalPrice.toFixed(2)}</h2>

          <motion.div
            className="mb-4 p-4 bg-[#2A2A3C] rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-semibold text-lg text-[#EC4186]">Order Summary:</h3>
            {cart.map((item) => (
              <p key={item.id} className="text-gray-300">
                {item.title} - ${item.price} x {item.quantity}
              </p>
            ))}
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border border-gray-600 p-2 rounded bg-[#2A2A3C] text-white"
              required
            />

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Shipping Address"
              className="w-full border border-gray-600 p-2 rounded bg-[#2A2A3C] text-white"
              required
            />

            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="Card Number (16 digits)"
              className="w-full border border-gray-600 p-2 rounded bg-[#2A2A3C] text-white"
              minLength="16"
              maxLength="16"
              required
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#EC4186] text-white px-4 py-2 rounded w-full hover:bg-[#EE544A] transition-all shadow-md"
            >
              Place Order
            </motion.button>
          </form>
        </>
      )}
    </motion.div>
  );
};

export default Checkout;


