import { useContext, useEffect } from "react";
import "./App.css";
import DashboardScreen from "./Screens/DashboardScreen";
import LoginScreen from "./Screens/LoginScreen";
import { getAllMembers } from "./utils/https";
import { AuthContext } from "./store/auth-context";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/auth-slice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("barcodeToken");
    if (token) {
      dispatch(authenticate(token));
      navigate("/dashboard");
    }
  }, [dispatch, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
      </Routes>
    </>
  );
}

export default App;
