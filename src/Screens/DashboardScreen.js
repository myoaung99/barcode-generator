import { useState, useEffect, useContext } from "react";
import ActionButtons from "../components/ActionButtons";
import DataTable from "../components/DataTable/DataTable";
import Layout from "../components/Layout/Layout";
import Modal from "../components/Overlay/Modal";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "./../store/auth-slice";
import { setCustomer } from "./../store/customer-slice";
import { getAllMembers } from "./../utils/https";

function DashboardScreen() {
  const [modalIsShown, setModalIsShown] = useState(false);
  const token = useSelector((store) => store.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCustomers = async () => {
      const customers = await getAllMembers(token);
      dispatch(setCustomer(customers));
    };
    fetchCustomers();
  }, [token, dispatch]);

  const toggleModalHandler = () => {
    setModalIsShown((currentState) => !currentState);
  };

  const submitHandler = (data) => {
    console.log(data);
    toggleModalHandler();
  };

  if (!!token) {
    return (
      <Layout>
        <ActionButtons toggleModal={toggleModalHandler} />
        <DataTable />

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
