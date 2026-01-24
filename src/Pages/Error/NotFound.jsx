import React from "react";
import { Link, useRouteError } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100 text-center px-4">
      <h1 className="text-[7rem] font-extrabold text-green-700 leading-none mb-4 animate-bounce">
        404
      </h1>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 max-w-md mb-6">
        {error?.statusText || "The page you’re looking for doesn’t exist or has been moved."}
      </p>

      <Link
        to="/"
        className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-all shadow-md"
      >
        <FaHome className="text-lg" />
        Back to Home
      </Link>

      <div className="mt-10">
        <img
          src="https://illustrations.popsy.co/gray/error-404.svg"
          alt="Error Illustration"
          className="w-64 md:w-96 mx-auto"
        />
      </div>

      <footer className="mt-10 text-sm text-gray-500">
        © {new Date().getFullYear()} KrishiLink | Empowering Farmers & Traders
      </footer>
    </div>
  );
};

export default NotFound;