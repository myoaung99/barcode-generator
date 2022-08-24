import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { IconButton, Typography } from "@mui/material";
import classes from "./LoginForm.module.css";
import { LoadingButton } from "@mui/lab";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginForm = ({ onSubmit, login, isLoading }) => {
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

  const [showPassword, setShowPassword] = useState(true);

  const submitHandler = () => {
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

    onSubmit({ username, password });
  };

  const handleClickShowPassword = () => {
    setShowPassword((current) => !current);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.modal}>
      <Typography
        variant="h5"
        style={{ textAlign: "center", paddingTop: "20px" }}
      >
        {login ? "Login Account" : "Create Admin Account"}
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
          type={showPassword ? "password" : "text"}
          onChange={textInputHandler.bind(this, "password")}
          variant="standard"
          error={!inputValues.password.isValid}
          helperText={
            !inputValues.password.isValid ? "Password must not be empty" : ""
          }
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
          marginBottom: "30px",
        }}
      >
        <LoadingButton
          loading={isLoading}
          size="large"
          variant="contained"
          onClick={submitHandler}
        >
          {login ? "Login" : "Create Admin"}
        </LoadingButton>
      </div>
    </div>
  );
};

export default LoginForm;
