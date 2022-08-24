import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const ModalForm = ({ onSubmit, isSubmitting }) => {
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

    const vipCodeIsValid = inputValues.vipCode.value.trim().length === 10;

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
      vip_code: inputValues.vipCode.value,
      customer_name: inputValues.customerName.value,
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
            !inputValues.vipCode.isValid ? "VIP Code must be 10 digits" : " "
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
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        <LoadingButton
          size="large"
          onClick={submitHandler}
          loading={isSubmitting}
          variant="contained"
        >
          Create
        </LoadingButton>
      </div>
    </>
  );
};

export default ModalForm;
