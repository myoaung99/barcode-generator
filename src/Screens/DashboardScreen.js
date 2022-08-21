import { useState, useEffect, useContext } from "react";
import ActionButtons from "../components/ActionButtons";
import DataTable from "../components/DataTable/DataTable";
import Layout from "../components/Layout/Layout";
import Modal from "../components/Overlay/Modal";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCustomer, addCustomer } from "./../store/customer-slice";
import { createBarcode, getAllMembers } from "./../utils/https";
import LoadingOverlay from "./../components/Overlay/LoadingOverlay";

function DashboardScreen() {
  const [modalIsShown, setModalIsShown] = useState(false);
  const [fetchingCustomers, setFetchingCustomers] = useState(true);
  const [errorInFetching, setErrorInFetching] = useState(false);

  const [creatingCustomer, setCreatingCustomer] = useState(false);
  const [errorInCreation, setErrorInCreation] = useState(false);

  const token = useSelector((store) => store.auth.token);
  const dispatch = useDispatch();

  const customers = useSelector((state) => state.customer.customers);

  useEffect(() => {
    const fetchCustomers = async () => {
      const customers = await getAllMembers(token);
      dispatch(setCustomer(customers));
      setFetchingCustomers(false);
    };

    try {
      fetchCustomers();
    } catch (e) {
      setErrorInFetching(true);
      setFetchingCustomers(false);
    }
  }, [token, dispatch]);

  const toggleModalHandler = () => {
    setModalIsShown((currentState) => !currentState);
  };

  const submitHandler = async (data) => {
    setCreatingCustomer(true);

    try {
      const createdCustomer = await createBarcode({ ...data }, token);
      dispatch(addCustomer(createdCustomer));
    } catch (e) {
      console.log(e);
    }

    setCreatingCustomer(false);
    toggleModalHandler();
  };

  if (!token) {
    return <Navigate replace to="/login" />;
  }

  return (
    <Layout>
      <ActionButtons toggleModal={toggleModalHandler} />
      <DataTable loading={fetchingCustomers} rows={customers} />
      {creatingCustomer && <LoadingOverlay />}
      {modalIsShown && (
        <Modal
          onClose={toggleModalHandler}
          isSubmitting={creatingCustomer}
          onSubmit={submitHandler}
        />
      )}
    </Layout>
  );
}

export default DashboardScreen;
