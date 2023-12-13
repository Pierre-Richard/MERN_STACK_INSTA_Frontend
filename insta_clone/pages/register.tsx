import React, { useState } from "react";
import FormText from "../components/FormText";
import axios from "axios";

const Register: React.FC = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/api/auth/register", {
        username,
        password,
      });
      setUserName("");
      setPassword("");
      return alert("User Enregistrer! Now login");
    } catch (err) {
      console.error("error", err);
    }
  };
  return (
    <>
      <FormText
        username={username}
        setUserName={setUserName}
        password={password}
        setPassword={setPassword}
        label="Register"
        onSubmit={onSubmit}
      />
    </>
  );
};

export default Register;
