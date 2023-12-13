import React, { useState } from "react";
import FormText from "../components/FormText";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          username,
          password,
        }
      );

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("Token", response.data.userID);
      navigate("/profil");
    } catch (err) {
      console.error("error: ", err);
    }
  };
  return (
    <>
      <FormText
        username={username}
        setUserName={setUserName}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
        label="Login"
      />
    </>
  );
};

export default Login;
