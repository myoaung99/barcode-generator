import React, { useState } from "react";
import LoginForm from "../components/Login/LoginForm";
import { loginAdmin } from "../utils/https";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../store/auth-slice";

const LoginScreen = (props) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (data) => {
    setIsLoggingIn(true);
    const token = await loginAdmin(data.username, data.password);
    if (token) {
      dispatch(authenticate(token));
      navigate("/dashboard");
    }
    setIsLoggingIn(false);
  };
  return (
    <>
      <LoginForm onSubmit={submitHandler} isLoggingIn={isLoggingIn} login />
    </>
  );
};

export default LoginScreen;
