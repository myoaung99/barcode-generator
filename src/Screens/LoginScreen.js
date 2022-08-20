import React from "react";
import LoginForm from "../components/Login/LoginForm";
import { loginUser } from "../utils/https";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../store/auth-slice";

const LoginScreen = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (data) => {
    const token = await loginUser(data.username, data.password);
    if (token) {
      dispatch(authenticate(token));
      navigate("/dashboard");
    }
  };
  return <LoginForm onSubmit={submitHandler} />;
};

export default LoginScreen;
