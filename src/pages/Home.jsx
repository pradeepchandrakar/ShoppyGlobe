import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import ProductItem from "../components/ProductItem";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    try {
      const response = await axios.get("http://localhost:5000/api/products", { signal: controller.signal });
      console.log("Fetched products:", response.data);
      setProducts(response.data);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.warn("Request canceled:", err.message);
      } else if (err.response) {
        setError(`Error ${err.response.status}: ${err.response.data.message || "Failed to load products"}`);
      } else {
        setError("Network error: Please check your connection.");
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ✅ Implement Debounced Search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  // Filter products based on debounced query
  const filteredProducts = products.filter((product) =>
    (product?.title || "").toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-[#1E1E2E] to-[#121212] text-white">
      
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <SearchBar onSearch={setQuery} />
      </motion.div>

      {loading ? (
        <motion.p
          className="text-center text-xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading...
        </motion.p>
      ) : error ? (
        <motion.p
          className="text-center text-red-500 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div key={product._id} whileHover={{ scale: 1.05 }}>
                <ProductItem product={product} />
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400 text-lg">
              No products found. Try adding some!
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Home;







