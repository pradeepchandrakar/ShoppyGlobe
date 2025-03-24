// src/components/Checkout.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";

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
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Checkout</h1>

      {orderPlaced ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold text-green-600">Order Placed Successfully! 🎉</h2>
          <p className="text-gray-700 mt-2">Thank you for your purchase.</p>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-3">Total: ${totalPrice.toFixed(2)}</h2>

          <div className="mb-4 p-4 bg-gray-100 rounded">
            <h3 className="font-semibold text-lg">Order Summary:</h3>
            {cart.map((item) => (
              <p key={item.id} className="text-gray-700">
                {item.title} - ${item.price} x {item.quantity}
              </p>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Shipping Address"
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="Card Number (16 digits)"
              className="w-full border p-2 rounded"
              minLength="16"
              maxLength="16"
              required
            />

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-700 transition"
            >
              Place Order
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;

