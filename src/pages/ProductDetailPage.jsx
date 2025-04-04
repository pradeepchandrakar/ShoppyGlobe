import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/cartSlice";
import axios from "axios";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tokenFromRedux = useSelector((state) => state.auth.token);
  const [authToken, setAuthToken] = useState(tokenFromRedux);

  // Sync with localStorage if token not in redux
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, [tokenFromRedux]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && (data.id || data._id)) {
          setProduct(data);
        } else {
          setError("Product not found.");
        }
      })
      .catch(() => setError("Failed to load product details."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = useCallback(async () => {
    if (!authToken) {
      alert("Please log in to add items to the cart.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      dispatch(setCart(response.data.cart.items));
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to add item to cart.");
    }
  }, [authToken, dispatch, product]);

  const renderStars = (rating = 0) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={20}
        className={`mx-1 ${i < Math.round(rating) ? "text-yellow-400" : "text-gray-500"}`}
      />
    ));
  };

  if (loading) {
    return (
      <motion.div className="text-center text-lg mt-10 text-gray-300">
        🔄 Loading product details...
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div className="text-center text-red-500 mt-10 text-lg">
        {error}
      </motion.div>
    );
  }

  const discount = product.discountPercentage || 0;
  const discountedPrice = product.price - (product.price * discount) / 100;

  return (
    <motion.div className="max-w-7xl mx-auto p-6 bg-[#1E1E2E] text-white shadow-lg rounded-lg mt-6 border border-[#EC4176]">
      <div className="flex flex-col md:flex-row items-center">
        {/* Image */}
        <motion.div className="w-full md:w-1/2 flex justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-80 h-80 object-cover rounded-lg shadow-md border border-[#EC4176]"
          />
        </motion.div>

        {/* Info */}
        <motion.div className="md:ml-8 mt-6 md:mt-0 flex flex-col justify-center text-center md:text-left">
          <motion.h1 className="text-4xl font-bold text-white">
            {product.title}
          </motion.h1>

          {/* Rating */}
          <div className="flex items-center mt-2 justify-center md:justify-start">
            {renderStars(product.rating)}
            <span className="ml-2 text-lg text-gray-300">
              ({(product.rating || 0).toFixed(1)})
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-300 mt-3 text-lg">{product.description}</p>

          {/* Prices */}
          <div className="mt-4">
            <p className="text-lg text-orange-400 line-through">
              Original Price: ${product.price.toFixed(2)}
            </p>
            <p className="text-green-400 text-2xl font-semibold">
              Discounted Price: ${discountedPrice.toFixed(2)}
            </p>
            <p className="text-red-500 text-lg font-medium">{discount}% OFF</p>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            onClick={handleAddToCart}
            className="bg-[#EC4186] text-white px-5 py-2 rounded-md mt-4 font-medium text-base shadow-md hover:bg-[#f1146d] transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🛒 Add to Cart
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;


