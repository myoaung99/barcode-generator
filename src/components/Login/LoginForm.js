import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import classes from "./LoginForm.module.css";

const LoginForm = ({ onSubmit }) => {
  const [inputValues, setInputValues] = useState({
    email: {
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

    const email = inputValues.email.value;
    const password = inputValues.password.value;

    const emailIsValid = email.includes("@");
    const passwordIsValid = !!password;

    if (!emailIsValid) {
      setInputValues((current) => {
        return {
          email: { value: current.email.value, isValid: emailIsValid },
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

    onSubmit({ email, password });
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
          id="email"
          label="Email"
          onChange={textInputHandler.bind(this, "email")}
          variant="standard"
          error={!inputValues.email.isValid}
          helperText={!inputValues.email.isValid ? "Invalid Email" : " "}
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
