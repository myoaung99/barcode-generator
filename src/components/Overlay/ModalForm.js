import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";

const ModalForm = ({ onSubmit }) => {
  const [inputValues, setInputValues] = useState({
    vipCode: {
      value: "",
      isValid: true,
    },
    customerName: {
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

    const numberVipCode = Number(inputValues.vipCode.value);

    const vipCodeIsValid =
      !isNaN(numberVipCode) && inputValues.vipCode.value.trim().length === 12;

    const nameIsValid = inputValues.customerName.value.trim().length > 0;

    if (!vipCodeIsValid || !nameIsValid) {
      setInputValues((current) => {
        return {
          vipCode: { value: current.vipCode.value, isValid: vipCodeIsValid },
          customerName: {
            value: current.customerName.value,
            isValid: nameIsValid,
          },
        };
      });
      return;
    }
    onSubmit({
      vipCode: numberVipCode,
      customerName: inputValues.customerName.value,
    });
  };

  return (
    <>
      <Typography
        variant="h5"
        style={{ textAlign: "center", paddingTop: "20px" }}
      >
        Create Barcode
      </Typography>
      <Box
        style={{ textAlign: "center" }}
        component="form"
        noValidate
        autoComplete="off"
      >
        <TextField
          style={{ width: "80%", marginTop: "20px" }}
          id="vipCode"
          label="VIP Code"
          autoFocus={true}
          onChange={textInputHandler.bind(this, "vipCode")}
          variant="standard"
          error={!inputValues.vipCode.isValid}
          helperText={
            !inputValues.vipCode.isValid ? "VIP Code must be 12 digits" : " "
          }
        />
        <TextField
          style={{ width: "80%", marginTop: "20px" }}
          id="customerName"
          label="Customer Name"
          onChange={textInputHandler.bind(this, "customerName")}
          variant="standard"
          error={!inputValues.customerName.isValid}
          helperText={
            !inputValues.customerName.isValid
              ? "Customer Name must not be empty"
              : " "
          }
        />
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <Button variant="contained" onClick={submitHandler}>
          Create
        </Button>
      </div>
    </>
  );
};

export default ModalForm;
