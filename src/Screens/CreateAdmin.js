import React, { useState } from "react";
import LoginForm from "../components/Login/LoginForm";
import { createSystemAdmin } from "../utils/https";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAdmin } from "../store/admin-slice";

const CreateAdmin = (props) => {
  const [isCreating, setIsCreating] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const submitHandler = async (data) => {
    // TODO: do something with the data
    const { username, password } = data;

    setIsCreating(true);

    // TODO: error handling
    const createdAdmin = await createSystemAdmin(username, password, token);

    dispatch(addAdmin(createdAdmin));
    navigate("/dashboard/admins", { replace: true });

    setIsCreating(false);
  };
  return <LoginForm onSubmit={submitHandler} isLoading={isCreating} />;
};

export default CreateAdmin;
