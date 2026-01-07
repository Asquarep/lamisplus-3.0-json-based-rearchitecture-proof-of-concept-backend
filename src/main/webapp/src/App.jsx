import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { registerUnauthorizedHandler } from "./setting/interceptor";
import { useDispatch } from "react-redux";
import { logout } from "./store/slices/authSlice";

// Wrapper component to access location
function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    registerUnauthorizedHandler(() => {
      dispatch(logout());
      navigate("/login", { replace: true });
    });
  }, [dispatch, navigate]);
  return (
    <AppRoutes />
  );
}

export default AppWrapper;