import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCart } from "../redux/cartSlice";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(setCart(response.data.cart.items));
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
      setLoading(false);
    };

    fetchCart();
  }, [dispatch]);

  if (loading) return <p>Loading cart...</p>;

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
              <CartItem
                key={item.productId}
                item={{
                  ...item,
                  product: item.product || item.productId || {}, // 🧠 fallback
                }}
              />
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center border-t border-gray-600 pt-4">
            <motion.h2
              className="text-2xl font-semibold text-[#EE544A]"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              Total: $
              {cart
                .reduce((total, item) => {
                  const price =
                    item?.price ||
                    item?.product?.price ||
                    item?.productId?.price ||
                    0;
                  return total + price * item.quantity;
                }, 0)
                .toFixed(2)}
            </motion.h2>

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










