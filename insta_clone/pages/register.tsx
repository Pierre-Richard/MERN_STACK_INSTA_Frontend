import React from "react";

const register = () => {
  return (
    <div className="flex  justify-center items-center h-screen bg-indigo-600">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        <h1>Login</h1>
        <div className="mt-3">
          <label htmlFor="username" className="block text-base mb-2">
            username
          </label>
        </div>
      </div>
    </div>
  );
};

export default register;
