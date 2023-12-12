import React from "react";

const register = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-indigo-600">
        <form className="w-96 p-6 shadow-lg bg-white rounded-md">
          <h1 className="text-3xl block text-center font-semibold">Login</h1>
          <hr className="mt-3" />
          <div className="mt-3">
            <label htmlFor="username" className="block text-base mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="password" className="block text-base mb-2">
              Password
            </label>
            <input
              type="text"
              id="password"
              placeholder="Enter password"
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
            />
          </div>
          <div className="mt-3 flex justify-between items-center">
            <a className="text-blue-500 font-semibold">Inscrivez-vous</a>
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default register;
