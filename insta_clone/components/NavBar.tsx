import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex justify-end shadow-md  w-auto p-6">
      <ul className="flex">
        <li className="mr-4 text-xl">
          <Link to="/" className="mt-3">
            Register
          </Link>
        </li>
        <li className="mr-4 text-xl">
          <Link to="/login">Login</Link>
        </li>
        <li className="mr-4 text-xl">
          <Link to="/">Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
