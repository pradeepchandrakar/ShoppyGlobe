// src/components/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center text-xl mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 flex flex-col md:flex-row items-center">
      <img 
        src={product.thumbnail} 
        alt={product.title} 
        className="w-full md:w-1/2 rounded-lg shadow-md object-cover"
      />
      <div className="md:ml-6 flex flex-col justify-center text-center md:text-left">
        <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-green-600 text-xl font-semibold mt-4">${product.price}</p>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700 transition"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;

