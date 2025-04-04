import React, { useEffect, useState, useCallback } from "react";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Trigger on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Loading UI
  if (loading) {
    return (
      <motion.div
        className="text-center text-xl text-gray-400 mt-20 animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Loading products...
      </motion.div>
    );
  }

  // Error UI
  if (error) {
    return (
      <motion.div
        className="text-center text-red-500 mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p>{error}</p>
        <button
          onClick={fetchProducts}
          className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
        >
          🔁 Retry
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {products.length > 0 ? (
        products.map((product) => (
          <ProductItem key={product._id || product.id} product={product} />
        ))
      ) : (
        <motion.p
          className="text-gray-400 text-lg text-center col-span-full mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          No products available.
        </motion.p>
      )}
    </motion.div>
  );
};

export default ProductList;





