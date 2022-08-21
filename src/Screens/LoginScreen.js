import React, { useState, useEffect, useLayoutEffect } from "react";
import LoginForm from "../components/Login/LoginForm";
import { loginSystemAdmin } from "../utils/https";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { authenticate } from "../store/auth-slice";

const LoginScreen = (props) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const submitHandler = async (data) => {
    setIsLoggingIn(true);
    const token = await loginSystemAdmin(data.username, data.password);
    if (token) {
      dispatch(authenticate(token));
      navigate("/dashboard");
    }
    setIsLoggingIn(false);
  };

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return <LoginForm onSubmit={submitHandler} isLoading={isLoggingIn} login />;
};

export default LoginScreen;
