// src/routes.js
import ModuleListPage from "../pages/ModuleListPage";
import ModuleDetailPage from "../pages/ModuleDetailPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import Layout from "../components/Layout";

// Always import first, then define array
export const protectedRoutes = [
  { path: "/dashboard", permissions: [], layout: "Layout" },
  { path: "/module", permissions: ["VIEW_MODULE_DETAIL"], layout: "Layout" },
  { path: "/upload", permissions: ["UPLOAD_MODULES"], layout: "Layout" },
  { path: "/", permissions: [], layout: null },
  { path: "/login", permissions: [], layout: null },
  { path: "/signup", permissions: [], layout: null },
  { path: "/forgot-password", permissions: [], layout: null },
];
