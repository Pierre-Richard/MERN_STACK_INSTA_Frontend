import React from "react";
import { AuthProvider, useAuth } from "./AuthContext";

const AuthNewFille = () => {
  const { user, login, logout } = useAuth();
  return <div>AuthNewFille</div>;
};

export default AuthNewFille;
