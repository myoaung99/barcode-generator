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
import {
  createBarcode,
  getAllMembers,
  getFilteredCustomers,
  patchCustomer,
} from "./../utils/https";
import LoadingOverlay from "./../components/Overlay/LoadingOverlay";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import classes from "./DashboardScreen.module.css";

function DashboardScreen() {
  const [modalIsShown, setModalIsShown] = useState(false);
  const [page, setPage] = useState(0);

  const [fetchingCustomers, setFetchingCustomers] = useState(true);
  const [creatingCustomer, setCreatingCustomer] = useState(false);

  const token = useSelector((store) => store.auth.token);
  const dispatch = useDispatch();

  const customers = useSelector(
    (state) => state.customer.customerData.customers
  );
  const rowCount = useSelector((state) => state.customer.customerData.total);

  // fetching customers
  const fetchCustomers = useCallback(async () => {
    const response = await getAllMembers(token, page + 1);
    dispatch(
      setCustomer({
        customers: response.members,
        total: response.total,
        totalPage: response.totalPage,
      })
    );
    setFetchingCustomers(false);
  }, [dispatch, page, token]);

  // fetch on mount
  useEffect(() => {
    try {
      if (!token) {
        return;
      }
      setFetchingCustomers(true);
      fetchCustomers();
    } catch (e) {
      setFetchingCustomers(false);
    }
  }, [fetchCustomers, token]);

  const toggleModalHandler = () => {
    setModalIsShown((currentState) => !currentState);
  };

  const pageChangesHandler = (nextPage) => {
    setPage(nextPage);
  };

  // creating barcode
  const submitHandler = async (data) => {
    setCreatingCustomer(true);

    const createdCustomer = await createBarcode({ ...data }, token);
    dispatch(addCustomer(createdCustomer));
    await fetchCustomers();
    setCreatingCustomer(false);
    toggleModalHandler();
  };

  if (!token) {
    return <Navigate replace to="/login" />;
  }

  const customerUpdatingHandler = async (customerNewData, customerOldData) => {
    const isEqual = (...objects) =>
      objects.every(
        (obj) => JSON.stringify(obj) === JSON.stringify(objects[0])
      );

    // if no changes are made
    if (isEqual(customerNewData, customerOldData)) {
      return;
    }

    setCreatingCustomer(true);
    dispatch(updateCustomer(customerNewData));
    await patchCustomer(
      customerNewData.id,
      {
        vip_code: customerNewData.vip_code,
        customer_name: customerNewData.customer_name,
      },
      token
    );

    setCreatingCustomer(false);
    return customerNewData;
  };

  const downloadHandler = () => {
    var zip = new JSZip();
    let i = 0;
    for (const customer of customers) {
      const filename = `${customer.customer_name}_${customer.vip_code}`;
      const img_Data = customer.barcode.split(",")[1];
      i++;
      zip.file(`${i}_${filename}.png`, img_Data, { base64: true });
    }
    zip.generateAsync({ type: "blob" }).then(function (content) {
      // see FileSaver.js
      saveAs(content, "barcode_images.zip");
    });
  };

  const onFilter = async (filterData) => {
    if (
      !filterData.items[0]?.value ||
      filterData.items[0]?.value.trim().length === 0
    ) {
      return;
    }
    const { columnField, operatorValue, value } = filterData.items[0];
    const filteredCustomers = await getFilteredCustomers(
      { columnField, operatorValue, value },
      token
    );
    dispatch(
      setCustomer({
        customers: filteredCustomers,
      })
    );
    setFetchingCustomers(false);
  };

  return (
    <Layout>
      <ActionButtons
        onDownload={downloadHandler}
        toggleModal={toggleModalHandler}
      />
      {creatingCustomer && <LoadingOverlay />}
      {fetchingCustomers && <PlainOverLay />}
      <DataTable
        loading={fetchingCustomers}
        fetchCustomers={fetchCustomers}
        rows={customers}
        rowCount={rowCount || customers.length}
        pageSize={5}
        rowsPerPageOptions={[5]}
        page={page}
        onPageChange={pageChangesHandler}
        processRowUpdate={customerUpdatingHandler}
        onFilter={onFilter}
      />
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

function PlainOverLay() {
  return (
    <div
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        zIndex: 30,
      }}
    />
  );
}
