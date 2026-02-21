import { useNavigate, matchPath } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { protectedRoutes, publicRoutes } from "../routes/routes";

const useCustomNavigate = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  const navigate = useNavigate();
  
  const findRoute = (routes, path) => {
    return routes.find((r) =>
      matchPath({ path: r.path, end: true }, path)
  );
};

const confirmAccess = (path) => {
    console.log("user: ", user);
    console.log("path: ", path);
    let route = findRoute(publicRoutes, path);
    console.log("route public: ", route);
    
    if (route) return true;
    console.log("route public: ", route);
    
    route = findRoute(protectedRoutes, path);
    console.log("route protected: ", route);
    if (!route) return false;
    console.log("route auth: ", route);
    
    if (!isAuthenticated) return false;
    console.log("route auth: ", route);
    
    if (!route.permissions || route.permissions.length === 0) return true;
    console.log("route perms: ", route);

    const userPermissions = user?.permissions || [];
    return route.permissions.some((p) =>
      userPermissions.includes(p)
    );
  };

  const customNavigate = (path, options = {}) => {
    if (confirmAccess(path)) {
      navigate(path, options);
      return;
    }

    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    } else {
      toast.error(
        "Sorry, you do not have the right permissions to access that resource."
      );
    }
  };

  return customNavigate;
};

export default useCustomNavigate;