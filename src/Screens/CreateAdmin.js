import React from "react";
import LoginForm from "../components/Login/LoginForm";
import { loginUser } from "../utils/https";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../store/auth-slice";

const CreateAdminScreen = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (data) => {
    // TODO: do something with the data
    console.log(data);
  };
  return <LoginForm onSubmit={submitHandler} />;
};

export default CreateAdminScreen;
