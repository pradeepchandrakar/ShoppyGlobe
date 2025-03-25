import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="text-center text-xl text-gray-400 mt-10 animate-pulse">
        Loading products...
      </div>
    );

  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <motion.div
      className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </motion.div>
  );
};

export default ProductList;


