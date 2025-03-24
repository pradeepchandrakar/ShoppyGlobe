// src/components/Cart.jsx
import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">
          Your cart is empty.{" "}
          <Link to="/" className="text-blue-500 hover:underline">
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

          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <h2 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h2>

            <Link to="/checkout">
              <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

