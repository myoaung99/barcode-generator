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
import JSZip from "jszip";
import { saveAs } from "file-saver";

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

  // creating barcode
  const submitHandler = async (data) => {
    setCreatingCustomer(true);

    const createdCustomer = await createBarcode({ ...data }, token);
    dispatch(addCustomer(createdCustomer));

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

  return (
    <Layout>
      <ActionButtons
        onDownload={downloadHandler}
        toggleModal={toggleModalHandler}
      />
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
