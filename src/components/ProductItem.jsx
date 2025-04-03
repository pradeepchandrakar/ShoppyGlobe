import React, { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // ✅ Get logged-in user
  const userId = user ? user.id : null;

  if (!product) return <div className="text-red-500">Error: Product data missing.</div>;

  const productId = product?.id || product?._id || ""; 
  const price = Number(product?.price) || 0;
  const discountPercentage = Number(product?.discountPercentage) || 0;
  const rating = Number(product?.rating) || 0;

  const discountedPrice = useMemo(() => (
    (price - (price * discountPercentage) / 100).toFixed(2)
  ), [price, discountPercentage]);

  const stars = useMemo(() => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    return (
      <span className="text-yellow-400 text-lg">
        {"★".repeat(fullStars)}
        {halfStar ? "☆" : ""}
      </span>
    );
  }, [rating]);

  // ✅ Backend API Call to Add Item to Database
  const handleAddToCart = useCallback(async () => {
    if (!userId) {
      alert("Please log in to add items to the cart.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/cart/add", {
        productId,
        quantity: 1,
        userId, // ✅ Sending user ID to backend
      }, {
        headers: { Authorization: `Bearer ${user?.token}` } // ✅ Ensure proper authentication
      });

      dispatch(addToCart(response.data.cart.items)); // ✅ Update Redux state
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }, [dispatch, productId, userId, user?.token]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-[#24243E] p-6 rounded-xl text-center shadow-lg transition-all hover:shadow-xl"
    >
      <motion.img
        src={product?.thumbnail || "/placeholder.jpg"}
        alt={`Image of ${product.title || "Product"}`}
        className="w-48 h-48 object-cover rounded-lg mx-auto mb-4 border-2 border-[#EC4186]"
        whileHover={{ scale: 1.05 }}
      />

      <h2 className="text-lg font-bold text-[#EC4186]">
        {product?.title || "Unknown Product"}
      </h2>

      <p className="text-gray-400 line-through">${price.toFixed(2)}</p>
      <p className="text-[#EE544A] text-xl font-semibold">${discountedPrice}</p>
      <p className="text-red-500 text-lg font-medium">{discountPercentage}% OFF</p>

      <p className="text-yellow-400 text-lg font-medium mt-2">
        Rating: {stars} ({rating.toFixed(1)})
      </p>

      <div className="flex justify-center space-x-3 mt-4">
        {productId ? (
          <Link 
            to={`/product/${productId}`} 
            className="bg-[#38124A] text-white px-4 py-2 rounded-lg hover:bg-[#EC4186] transition-all"
          >
            View Details
          </Link>
        ) : (
          <p className="text-gray-500">No Details Available</p>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#EC4186] text-white px-4 py-2 rounded-lg hover:bg-[#EE544A] transition-all"
          onClick={handleAddToCart}
          aria-label={`Add ${product?.title || "Product"} to cart`}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductItem;





