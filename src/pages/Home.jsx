// src/components/Home.jsx
import React, { useState, useEffect } from "react";
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
    <div className="p-4">
      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <p className="text-center text-xl text-gray-600">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center col-span-full text-red-500">
              No products found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;



