// src/components/ProductDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.id) {
          setProduct(data);
        } else {
          setError("Product not found.");
        }
      })
      .catch(() => setError("Failed to load product details."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <div className="text-center text-lg mt-10">🔄 Loading product details...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-80 h-80 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="md:ml-6 mt-4 md:mt-0 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-green-600 text-xl font-semibold mt-4">
            ${product.price.toFixed(2)}
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-4 hover:bg-blue-700 transition"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

