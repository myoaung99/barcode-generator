import { useState, useEffect, useContext } from "react";
import ActionButtons from "../components/ActionButtons";
import DataTable from "../components/DataTable/DataTable";
import Layout from "../components/Layout/Layout";
import Modal from "../components/Overlay/Modal";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCustomer } from "./../store/customer-slice";
import { getAllMembers } from "./../utils/https";
import LoadingOverlay from "./../components/Overlay/LoadingOverlay";
import CircularProgress from "@mui/material/CircularProgress";

function DashboardScreen() {
  const [modalIsShown, setModalIsShown] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [creatingCustomer, setCreatingCustomer] = useState(false);
  const [errorInCreation, setErrorInCreation] = useState(false);

  const token = useSelector((store) => store.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCustomers = async () => {
      const customers = await getAllMembers(token);
      dispatch(setCustomer(customers));
    };

    try {
      fetchCustomers();
    } catch (e) {
      setHasError(true);
    }
  }, [token, dispatch]);

  const toggleModalHandler = () => {
    setModalIsShown((currentState) => !currentState);
  };

  const submitHandler = (data) => {
    setCreatingCustomer(true);
    setTimeout(() => {
      console.log(data);
      setCreatingCustomer(false);
    }, 3000);

    toggleModalHandler();
  };

  if (!!token) {
    return (
      <Layout>
        <ActionButtons toggleModal={toggleModalHandler} />
        <DataTable />
        {creatingCustomer && <LoadingOverlay />}
        {modalIsShown && (
          <Modal onClose={toggleModalHandler} onSubmit={submitHandler} />
        )}
      </Layout>
    );
  } else {
    return <Navigate replace to="/login" />;
  }
}

export default DashboardScreen;
