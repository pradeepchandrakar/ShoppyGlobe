import React, { useMemo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/cartSlice"; 
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  
  // ✅ Redux se user aur token lo
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [authToken, setAuthToken] = useState(token); // ✅ LocalStorage se bhi check karenge

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, [token]); // ✅ Token change hone par update ho

  if (!product) return <div className="text-red-500">Error: Product data missing.</div>;

  const productId = product?._id || "";
  const price = Number(product?.price) || 0;
  const discountPercentage = Number(product?.discountPercentage) || 0;
  const rating = Number(product?.rating) || 0;

  const discountedPrice = useMemo(() => (
    (price - (price * discountPercentage) / 100).toFixed(2)
  ), [price, discountPercentage]);

  const handleAddToCart = useCallback(async () => {
    if (!authToken) {  // ✅ Fix: Token properly check ho raha hai
      alert("Please log in to add items to the cart.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${authToken}` } } // ✅ Ensure token is sent correctly
      );

      dispatch(setCart(response.data.cart.items)); // ✅ Redux cart update
    } catch (error) {
      console.error("❌ Error adding to cart:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to add item to cart.");
    }
  }, [dispatch, productId, authToken]);

  return (
    <motion.div className="bg-[#24243E] p-6 rounded-xl text-center shadow-lg">
      <motion.img src={product?.thumbnail || "/placeholder.jpg"} alt={product?.title} className="w-48 h-48 object-cover" />

      <h2 className="text-lg font-bold text-[#EC4186]">{product?.title || "Unknown Product"}</h2>

      <p className="text-gray-400 line-through">${price.toFixed(2)}</p>
      <p className="text-[#EE544A] text-xl font-semibold">${discountedPrice}</p>

      <div className="flex justify-center space-x-3 mt-4">
        <Link to={`/product/${productId}`} className="bg-[#38124A] text-white px-4 py-2 rounded-lg">View Details</Link>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-[#EC4186] text-white px-4 py-2 rounded-lg"
          onClick={handleAddToCart}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductItem;








