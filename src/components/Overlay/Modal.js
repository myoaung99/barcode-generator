import React from "react";
import ReactDom from "react-dom";
import Form from "./Form";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div onClick={props.onClose} className={classes.backdrop}></div>;
};

const ModalOverlay = ({ onSubmit }) => {
  return (
    <div className={classes.modal}>
      <Form onSubmit={onSubmit} />
    </div>
  );
};

const portalElement = document.getElementById("overlay");

const Modal = ({ onClose, onSubmit }) => {
  return (
    <React.Fragment>
      {ReactDom.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDom.createPortal(
        <ModalOverlay onSubmit={onSubmit} />,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
