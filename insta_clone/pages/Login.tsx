import React, { useState } from "react";
import FormText from "../components/FormText";

const Login = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <>
      <FormText
        username={username}
        setUserName={setUserName}
        password={password}
        setPassword={setPassword}
        label="Login"
      />
    </>
  );
};

export default Login;
