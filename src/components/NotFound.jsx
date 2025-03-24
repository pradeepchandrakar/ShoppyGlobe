import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-5xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2 text-lg">
        Oops! The page you are looking for does not exist.
      </p>
      <Link 
        to="/" 
        className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
        aria-label="Go back to Home"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;


