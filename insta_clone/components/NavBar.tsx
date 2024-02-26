import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const userId = window.localStorage.getItem("userId");
  const navigate = useNavigate();
  const onClickButtonLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");
    navigate("/login");
  };
  const accessToken = window.localStorage.getItem("access_token");

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
          <Link to={`/profil/${userId}`}>Profile</Link>
        </li>
        <li className="mr-4 text-xl">
          <Link to="/createPost">CreatePost</Link>
        </li>
        {accessToken && (
          <li className="mr-4 text-xl">
            <button
              onClick={onClickButtonLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
