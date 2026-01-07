// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";

// // This file does custom navigation logic on the application. 
// // It takes the path and checks the current logged in user's 
// // permissions against the path's required permissions, and compares, before allowing the user to navigate
// const useCustomNavigate = () => {
  
// const { loading, error, isAuthenticated } = useSelector(
//     (state) => state.auth
//   );    const navigate = useNavigate()
//     const [allAvailableRoutes, setAllAvailableRoutes] = useState([])
//     const allRoutes = [];

//     useEffect(()=> {
//       if (allRoutes !== null && allRoutes !== undefined && allRoutes.length > 0){
//         setAllAvailableRoutes(allRoutes)
//       }
//     },[])

    
    
//     const confirmAccess = (path) => {
//       if (path.startsWith("../")){
//         path = path.substring(3, path.length)
//       }
//       let route;

//       route = allAvailableRoutes.find((one) => one.path === path);
//       if (!route) {
//         return false;
//       }
//       if (!route.permissions){
//         return true;
//       }
//       const userPermissions = isAuthenticated && user?.permissions || [];
//       const routePermissions = route?.permissions || [];
    
//       for(let i = 0; i < routePermissions.length; i++){
//         if(userPermissions.includes(routePermissions[i])){
//           return true
//         }
//       }
//       return false
//     };

//     const customNavigate = (path, stateData) => {
//       if (confirmAccess(path)) {
//         navigate(path, {state: stateData});
//       } else {
//         toast.error("Sorry, you do not have the right permissions to access that resource. Kindly contact admin.")
//         // navigate('dashboard');
//       }
//     }
  
//     return customNavigate;
//   };

//   export default useCustomNavigate;

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { protectedRoutes } from "../routes/routes";

const useCustomNavigate = () => {
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const confirmAccess = (path) => {
    let route = protectedRoutes.find((r) => r.path === path);
    if (!route) return false;
    if (!route.permissions || route.permissions.length === 0) return true;

    const userPermissions = user?.permissions || [];
    return route.permissions.some((p) => userPermissions.includes(p));
  };

  const customNavigate = (path, stateData) => {
    if (confirmAccess(path)) {
      navigate(path, { state: stateData });
    } else {
      toast.error(
        "Sorry, you do not have the right permissions to access that resource."
      );
    }
  };

  return customNavigate;
};

export default useCustomNavigate;
