import React, { useState } from "react";
import FormLogin from "../components/FormLogin";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setUserPassword] = useState<string>("");

  const [, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        }
      );

      setCookies("access_token", response.data.token);
      await window.localStorage.setItem("userId", response.data.userID);
      await window.localStorage.setItem("access_token", response.data.token);
      console.log(window.localStorage.getItem("access_token"));
      navigate("/profil");
    } catch (err) {
      console.error("error: ", err);
    }
  };
  return (
    <>
      <FormLogin
        email={email}
        setEmail={setEmail}
        password={password}
        setUserPassword={setUserPassword}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default Login;
