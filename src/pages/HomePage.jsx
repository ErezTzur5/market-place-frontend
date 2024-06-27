import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-200 to-white">
      <div className="max-w-md p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          Welcome to INSURE
        </h1>
        <p className="text-lg mb-8 text-gray-700">
          Explore our wide range of products and find what you need.
        </p>
        <Link
          to="/products"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg inline-block shadow-md transition duration-300 ease-in-out"
        >
          View Products
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
