// src/components/ProductItem.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white flex flex-col items-center text-center">
      <img 
        src={product.thumbnail} 
        alt={product.title} 
        className="w-48 h-48 object-cover rounded-lg mb-3"
      />
      <h2 className="text-lg font-bold text-gray-800">{product.title}</h2>
      <p className="text-green-600 font-semibold mt-1">${product.price}</p>
      <div className="flex space-x-2 mt-3">
        <Link 
          to={`/product/${product.id}`} 
          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
        >
          View Details
        </Link>
        <button 
          className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-700 transition"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
