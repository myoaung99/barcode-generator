import React from "react";
import LoginForm from "../components/Login/LoginForm";
import { createSystemAdmin } from "../utils/https";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../store/auth-slice";

const CreateAdmin = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("createAdmin");

  const submitHandler = async (data) => {
    // TODO: do something with the data
    console.log(data);
  };
  return <LoginForm onSubmit={submitHandler} />;
};

export default CreateAdmin;
