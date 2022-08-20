import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import classes from "./LoginForm.module.css";

const LoginForm = ({ onSubmit }) => {
  const [inputValues, setInputValues] = useState({
    username: {
      value: "",
      isValid: true,
    },
    password: {
      value: "",
      isValid: true,
    },
  });

  const textInputHandler = (inputType, event) => {
    setInputValues((currentValue) => ({
      ...currentValue,
      [inputType]: {
        value: event.target.value,
        isValid: true,
      },
    }));
  };

  const submitHandler = () => {
    // TODO: add validation

    const username = inputValues.username.value;
    const password = inputValues.password.value;

    const usernameIsValid = !!username;
    const passwordIsValid = !!password;

    if (!usernameIsValid || !passwordIsValid) {
      setInputValues((current) => {
        return {
          username: { value: current.username.value, isValid: usernameIsValid },
          password: {
            value: current.password.value,
            isValid: passwordIsValid,
          },
        };
      });
      return;
    }

    // sent credential to backend

    // set global login state

    onSubmit({ username, password });
  };

  return (
    <div className={classes.modal}>
      <Typography
        variant="h5"
        style={{ textAlign: "center", paddingTop: "20px" }}
      >
        Login Account
      </Typography>
      <Box
        style={{ textAlign: "center" }}
        component="form"
        noValidate
        autoComplete="off"
      >
        <TextField
          style={{ width: "80%", marginTop: "50px" }}
          id="username"
          label="User Name"
          onChange={textInputHandler.bind(this, "username")}
          variant="standard"
          error={!inputValues.username.isValid}
          helperText={
            !inputValues.username.isValid ? "User name must not be empty" : " "
          }
        />
        <TextField
          style={{ width: "80%", marginTop: "20px" }}
          id="standard-basic"
          label="Password"
          onChange={textInputHandler.bind(this, "password")}
          variant="standard"
          error={!inputValues.password.isValid}
          helperText={
            !inputValues.password.isValid ? "Password must not be empty" : ""
          }
        />
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "80px",
          marginBottom: "20px",
        }}
      >
        <Button variant="contained" onClick={submitHandler}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
