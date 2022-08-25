import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const ModalForm = ({ onSubmit, isSubmitting }) => {
  const [vipCode, setVipCode] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [nrc, setNrc] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    vipCode: false,
    customerName: false,
    nrc: false,
    phone: false,
    address: false,
  });

  function updateInputValueHandler(inputType, event) {
    switch (inputType) {
      case "vipCode":
        setVipCode(event.target.value);
        break;
      case "customerName":
        setCustomerName(event.target.value);
        break;
      case "NRC":
        setNrc(event.target.value);
        break;
      case "phone":
        setPhone(event.target.value);
        break;
      case "address":
        setAddress(event.target.value);
        break;
      default:
        return;
    }
  }

  const submitHandler = () => {
    const vipCodeIsValid = vipCode.trim().length === 10;
    const customerNameIsValid = !!customerName;
    const phoneIsValid = !!phone;

    if (!vipCodeIsValid || !customerNameIsValid || !phoneIsValid) {
      setCredentialsInvalid({
        vipCode: !vipCodeIsValid,
        customerName: !customerNameIsValid,
        phone: !phoneIsValid,
      });

      return;
    }

    console.log(vipCode, customerName, phone, address, nrc);
    console.log(credentialsInvalid);

    onSubmit({
      vip_code: vipCode,
      customer_name: customerName,
      phone: phone,
      nrc: nrc,
      address: address,
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
          style={{ width: "80%", marginTop: "10px" }}
          id="vipCode"
          label="VIP Code"
          autoFocus={true}
          onChange={updateInputValueHandler.bind(this, "vipCode")}
          variant="standard"
          error={credentialsInvalid.vipCode}
          helperText={
            credentialsInvalid.vipCode ? "VIP Code must be 10 digits" : " "
          }
        />
        <TextField
          style={{ width: "80%", marginTop: "10px" }}
          id="customerName"
          label="Customer Name"
          onChange={updateInputValueHandler.bind(this, "customerName")}
          variant="standard"
          error={credentialsInvalid.customerName}
          helperText={
            credentialsInvalid.customerName
              ? "Customer Name must not be empty"
              : " "
          }
        />
        <TextField
          style={{ width: "80%", marginTop: "20px" }}
          id="phone"
          label="Phone No."
          onChange={updateInputValueHandler.bind(this, "phone")}
          variant="standard"
          error={credentialsInvalid.phone}
          helperText={
            credentialsInvalid.phone ? "Phone number must not be empty" : " "
          }
        />
        <TextField
          style={{ width: "80%", marginTop: "20px" }}
          id="nrc"
          label="NRC"
          onChange={updateInputValueHandler.bind(this, "NRC")}
          variant="standard"
        />

        <TextField
          style={{ width: "80%", marginTop: "20px" }}
          id="address"
          label="Address"
          onChange={updateInputValueHandler.bind(this, "address")}
          variant="standard"
        />
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
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
