import React from "react";
import LoginForm from "../components/Login/LoginForm";

const LoginScreen = (props) => {
  const submitHandler = (data) => {
    console.log(data);
  };
  return <LoginForm onSubmit={submitHandler} />;
};

export default LoginScreen;
