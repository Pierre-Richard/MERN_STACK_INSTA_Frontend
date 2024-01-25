import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="bg-red-600 w-auto">
      <ul>
        <li className="">
          <Link to="/">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/">Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
