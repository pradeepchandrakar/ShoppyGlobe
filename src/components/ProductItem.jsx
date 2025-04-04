import React from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/cartSlice";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to add items to the cart.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Enrich items with product details
      const updatedCart = response.data.cart.items.map((item) => {
        if (item.productId === product._id) {
          return { ...item, product };
        }
        return item;
      });

      dispatch(setCart(updatedCart));
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  return (
    <div className="bg-[#1E1E2E] border border-[#EC4186] rounded-xl p-4 shadow-md text-white">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-lg font-bold mb-2">{product.title}</h2>
      <p className="text-pink-400 font-semibold mb-4">${product.price}</p>

      <div className="flex gap-2">
        <button
          onClick={handleAddToCart}
          className="bg-[#EC4186] hover:bg-[#EE544A] text-white py-2 px-4 rounded-lg w-full"
        >
          🛒 Add to Cart
        </button>

        <Link
          to={`/product/${product._id}`}
          className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg w-full text-center"
        >
          🔍 View
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;










