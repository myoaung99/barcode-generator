import React, { useState, useEffect } from "react";
import DataTable from "../components/DataTable/DataTable";
import Layout from "../components/Layout/Layout";
import { getAllSystemAdmins } from "../utils/https";
import { useSelector, useDispatch } from "react-redux";
import { setAdmins } from "../store/admin-slice";
import ErrorOverlay from "../components/Overlay/ErrorOverlay";
import CustomButton from "../components/UI/CustomButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const AllAdmins = () => {
  const [fetchingAdmins, setFetchingAdmins] = useState(true);
  const [errorInFetching, setErrorInFetching] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const systemAdmins = useSelector((state) => state.admins.admins);

  useEffect(() => {
    const fetchCustomers = async () => {
      const admins = await getAllSystemAdmins(token);
      dispatch(setAdmins(admins));
      setFetchingAdmins(false);
    };

    try {
      fetchCustomers();
    } catch (e) {
      setErrorInFetching(true);
      setFetchingAdmins(false);
    }
  }, [token, dispatch]);

  const backwardHandler = () => {
    navigate(-1);
  };

  if (errorInFetching && !fetchingAdmins) {
    return <ErrorOverlay />;
  }

  return (
    <Layout>
      <div style={{ paddingTop: 10, paddingBottom: 20 }}>
        <CustomButton startIcon={<ArrowBackIcon />} onClick={backwardHandler}>
          Go Back
        </CustomButton>
      </div>
      <DataTable
        loading={fetchingAdmins}
        admins
        rows={systemAdmins}
        getRowId={(admin) => admin._id}
      />
    </Layout>
  );
};

export default AllAdmins;
