// src/components/Cart.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">
          Your cart is empty. <Link to="/" className="text-blue-500 hover:underline">Shop Now</Link>
        </p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border p-4 rounded-lg shadow-md bg-white">
              <div className="flex items-center space-x-4">
                <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="flex items-center mt-2">
                    {/* Decrease Quantity Button */}
                    <button
                      className="px-3 py-1 bg-gray-300 rounded-l hover:bg-gray-400 transition"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    {/* Show Quantity */}
                    <span className="px-4 py-1 border">{item.quantity}</span>
                    {/* Increase Quantity Button */}
                    <button
                      className="px-3 py-1 bg-gray-300 rounded-r hover:bg-gray-400 transition"
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
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold">
            Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
          </h2>
          <Link to="/checkout">
            <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;




