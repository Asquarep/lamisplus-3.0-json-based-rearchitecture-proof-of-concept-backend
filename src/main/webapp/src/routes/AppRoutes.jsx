import { Route, Routes } from "react-router-dom";
import ModuleListPage from "../pages/ModuleListPage";
import ModuleDetailPage from "../pages/ModuleDetailPage";
import LoginPage from "../pages/LoginPage";
import Layout from "../components/Layout";
import SignupPage from "../pages/SignupPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";


function AppRoutes() {
    return (
        <Routes>
            {/* Layout route: contains sidebar for normal pages */}
            <Route
                element={
                    <Layout />
                }
            >
                <Route
                    path="/app/dashboard"
                    element={<ModuleListPage />}
                />
                <Route
                    path="/app/module"
                    element={<ModuleDetailPage />}
                />
                <Route
                    path="/app/upload"
                    element={<ModuleListPage />}
                />
            </Route>

            {/* Auth pages: no layout / sidebar */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/app/" element={<LoginPage />} />
            <Route path="/app/login" element={<LoginPage />} />
            <Route path="/app/signup" element={<SignupPage />} />
            <Route path="/app/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
    );
}

export default AppRoutes;
