import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    cardNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Redirect user if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [cart, navigate]);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.address.trim()) newErrors.address = "Shipping address is required.";
    if (!/^\d{16}$/.test(formData.cardNumber))
      newErrors.cardNumber = "Card number must be 16 digits.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "cardNumber") {
      value = value.replace(/\D/g, "").slice(0, 16); // Allow only numbers
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      setOrderPlaced(true);
      setLoading(false);
      setFormData({ name: "", address: "", cardNumber: "" });
    }, 2000);
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
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border border-gray-600 p-2 rounded bg-[#2A2A3C] text-white"
                required
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Shipping Address"
                className="w-full border border-gray-600 p-2 rounded bg-[#2A2A3C] text-white"
                required
              />
              {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
            </div>

            <div>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber.replace(/(\d{4})/g, "$1 ").trim()} // Format as XXXX XXXX XXXX XXXX
                onChange={handleChange}
                placeholder="Card Number (16 digits)"
                className="w-full border border-gray-600 p-2 rounded bg-[#2A2A3C] text-white"
                required
              />
              {errors.cardNumber && <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className={`bg-[#EC4186] text-white px-4 py-2 rounded w-full transition-all shadow-md ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#EE544A]"
              }`}
            >
              {loading ? "Processing..." : "Place Order"}
            </motion.button>
          </form>
        </>
      )}
    </motion.div>
  );
};

export default Checkout;



