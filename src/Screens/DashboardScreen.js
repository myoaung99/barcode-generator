import { useState, useEffect, useCallback } from "react";
import ActionButtons from "../components/ActionButtons";
import DataTable from "../components/DataTable/DataTable";
import Layout from "../components/Layout/Layout";
import Modal from "../components/Overlay/Modal";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCustomer,
  addCustomer,
  updateCustomer,
} from "./../store/customer-slice";
import { createBarcode, getAllMembers, patchCustomer } from "./../utils/https";
import LoadingOverlay from "./../components/Overlay/LoadingOverlay";

function DashboardScreen() {
  const [modalIsShown, setModalIsShown] = useState(false);
  const [page, setPage] = useState(0);

  const [fetchingCustomers, setFetchingCustomers] = useState(true);
  // const [errorInFetching, setErrorInFetching] = useState(false);

  const [creatingCustomer, setCreatingCustomer] = useState(false);
  // const [errorInCreation, setErrorInCreation] = useState(false);

  const token = useSelector((store) => store.auth.token);
  const dispatch = useDispatch();

  const customers = useSelector(
    (state) => state.customer.customerData.customers
  );
  const rowCount = useSelector((state) => state.customer.customerData.total);

  const fetchCustomers = useCallback(async () => {
    const customers = await getAllMembers(token, page + 1);
    dispatch(
      setCustomer({
        customers: customers.members,
        total: customers.total,
        totalPage: customers.totalPage,
      })
    );
    setFetchingCustomers(false);
  }, [dispatch, page, token]);

  useEffect(() => {
    try {
      setFetchingCustomers(true);
      fetchCustomers();
    } catch (e) {
      setFetchingCustomers(false);
    }
  }, [fetchCustomers]);

  const toggleModalHandler = () => {
    setModalIsShown((currentState) => !currentState);
  };

  const pageChangesHandler = (nextPage) => {
    setPage(nextPage);
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

  const customerUpdatingHandler = async (customerNewData) => {
    setFetchingCustomers(true);
    dispatch(updateCustomer(customerNewData));
    await patchCustomer(
      customerNewData.id,
      {
        vip_code: customerNewData.vip_code,
        customer_name: customerNewData.customer_name,
      },
      token
    );
    // await fetchCustomers();
    // Update လုပ်တာတဲ့ အစဥ်လိုက်ဖြစ်ချင်ရင် fetchCustomers() ပြန်ခေါ်ဖို့လို but အချိန်ပိုကြာ
    // page အချိန်းအပြောင်းဖြစ်သွားရင်တော့ အစဥ်လိုက်ဖြစ်ပါသည်
    setFetchingCustomers(false);
    return customerNewData;
  };

  return (
    <Layout>
      <ActionButtons toggleModal={toggleModalHandler} />
      <DataTable
        loading={fetchingCustomers}
        rows={customers}
        rowCount={rowCount}
        pageSize={5}
        rowsPerPageOptions={[5]}
        page={page}
        onPageChange={pageChangesHandler}
        processRowUpdate={customerUpdatingHandler}
      />
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
