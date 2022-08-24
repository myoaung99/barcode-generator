import React from "react";
import ReactDom from "react-dom";
import ModalForm from "./ModalForm";
import classes from "./Modal.module.css";
import { Box, Typography } from "@mui/material";

const Backdrop = (props) => {
  return <div onClick={props.onClose} className={classes.backdrop}></div>;
};

const ModalOverlay = ({ onSubmit, isSubmitting, hasError }) => {
  return (
    <div className={classes.modal}>
      <ModalForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

const portalElement = document.getElementById("overlay");

const Modal = ({ onClose, onSubmit, isSubmitting }) => {
  return (
    <React.Fragment>
      {ReactDom.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDom.createPortal(
        <ModalOverlay onSubmit={onSubmit} isSubmitting={isSubmitting} />,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
