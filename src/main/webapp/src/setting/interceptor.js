import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { debounce } from "../util/ReusableFunctions";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
// import store from "../store";

let onUnauthorized = null;



export const registerUnauthorizedHandler = (handler) => {
  onUnauthorized = handler;
};

// const logoutUnauthorizedUser = () => {
//     // debounce(authentication.logout(), 3000)
//     debounce(store.dispatch(logout()), 3000)
// }

const errors = new Set();


const debounceToastError = debounce (() => {
    // aggregate the errors,  in fileuploaderrors
    var errorText = "\n";
        errors.forEach((item) => {
            errorText += item + "\n";
        })

    // and throw single one
    toast.error(` ${errorText}`, { autoClose: 7000})

    // debounce(toast here, 700)


}, 700)

const api = axios.create({
    baseURL: process.env.NODE_ENV === "development"
? "http://localhost:8080"
: "/",
})


api.interceptors.request.use((config) => {    
    // alert("INTERCEPTOR CALLED")
  const token = localStorage.getItem("token");
  console.log("token: ", token);
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    error => {
        // alert("ERROR")
        if (error.response) {
            const { data: responseData, status } = error.response;
            if (status === 401) {
                // toast.error(`Error: Unauthorized`);
                // logoutUnauthorizedUser();
                 onUnauthorized?.();
            } else if (responseData.error || responseData.errorDescription) {
                errors.add(`Error: ${responseData?.error || responseData?.errorDescription}`);
                debounceToastError();
            } else {
                const { message } = responseData
                errors.add(message || `Error: ${error.message}`);
                debounceToastError();
            }
        } else if (error.message) {
            errors.add(`Error: ${error.message}`);
            debounceToastError();
            
        } else if (error.code) {
            errors.add(`Error: ${error.code}`);
            debounceToastError();
        }
        // console.error(error);
        return Promise.reject(error)
        
    }
);

export default api;