import { useEffect } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import { registerUnauthorizedHandler } from "./setting/interceptor";
import { logout, fetchMe } from "./store/slices/authSlice";
import APPLICATION_ROUTES from "./util/APPLICATION_ROUTES";

/* ============================
   WRAPPER
============================ */
function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

/* ============================
   APP
============================ */
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  // 🔐 Handle 401 globally
  useEffect(() => {
    registerUnauthorizedHandler(() => {
      dispatch(logout());
      navigate(APPLICATION_ROUTES.LOGIN, { replace: true });
    });
  }, [dispatch, navigate]);

  // 🔄 Hydrate user if token exists (on refresh)
  useEffect(() => {
    if (token) {
      dispatch(fetchMe());
    }
  }, [token, dispatch]);

  return <AppRoutes />;
}

export default AppWrapper;