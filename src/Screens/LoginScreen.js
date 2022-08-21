import React, { useState, useEffect } from "react";
import LoginForm from "../components/Login/LoginForm";
import { loginSystemAdmin } from "../utils/https";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../store/auth-slice";

const LoginScreen = (props) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(authenticate(token));
      navigate("/dashboard", { replace: true });
    }
  }, [dispatch, navigate, token]);

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
      <LoginForm onSubmit={submitHandler} isLoading={isLoggingIn} login />
    </>
  );
};

export default LoginScreen;
