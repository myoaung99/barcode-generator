import React, { useState, useEffect } from "react";
import LoginForm from "../components/Login/LoginForm";
import { loginSystemAdmin } from "../utils/https";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../store/auth-slice";

const LoginScreen = (props) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("barcodeToken");
    if (token) {
      dispatch(authenticate(token));
      navigate("/dashboard");
    }
  }, [dispatch, navigate]);

  const submitHandler = async (data) => {
    setIsLoggingIn(true);
    const token = await loginSystemAdmin(data.username, data.password);
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
