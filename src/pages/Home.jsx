import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import ProductItem from "../components/ProductItem";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.products) {
          setProducts(data.products);
          setFilteredProducts(data.products);
        } else {
          setError("Failed to load products.");
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (query) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-[#1E1E2E] to-[#121212] text-white ">
      {/* Animated Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <SearchBar onSearch={handleSearch} />
      </motion.div>

      {loading ? (
        <motion.p
          className="text-center text-xl text-gray-300 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading products...
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
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-full p-4 bg-[#24243E] text-white rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border border-[#EC4176]"
              >
                <ProductItem product={product} />
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400 text-lg">
              No products found
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Home;





