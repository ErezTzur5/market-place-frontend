import React from "react";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="../images/logo.svg"
            alt="Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <input
            type="text"
            className="border rounded-md shadow-sm py-2 px-4 block w-full sm:text-sm border-gray-300 mt-2"
            placeholder="Username"
            required
          />

          <input
            type="password"
            className="border rounded-md shadow-sm py-2 px-4 block w-full sm:text-sm border-gray-300"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
