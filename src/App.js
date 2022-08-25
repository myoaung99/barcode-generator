import { useEffect } from "react";
import DashboardScreen from "./Screens/DashboardScreen";
import LoginScreen from "./Screens/LoginScreen";
import CreateAdmin from "./Screens/CreateAdmin";
import AllAdmins from "./Screens/AllAdmins";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/auth-slice";

function App() {
  const dispatch = useDispatch();

  // check if logged in or not
  useEffect(() => {
    const token = localStorage.getItem("barcodeToken");
    if (token) {
      dispatch(authenticate(token));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<DashboardScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/dashboard" element={<DashboardScreen />} />
      <Route path="/dashboard/createAdmin" element={<CreateAdmin />} />
      <Route path="/dashboard/admins" element={<AllAdmins />} />
    </Routes>
  );
}

export default App;
