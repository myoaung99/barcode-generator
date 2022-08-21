import { useContext, useEffect } from "react";
import "./App.css";
import DashboardScreen from "./Screens/DashboardScreen";
import LoginScreen from "./Screens/LoginScreen";
import CreateAdmin from "./Screens/CreateAdmin";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/auth-slice";
import AllAdmins from "./Screens/AllAdmins";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/dashboard/createAdmin" element={<CreateAdmin />} />
        <Route path="/dashboard/admins" element={<AllAdmins />} />
      </Routes>
    </>
  );
}

export default App;
