// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import modulesReducer from "./slices/modulesSlice";
import rolesReducer from "./slices/rolesSlice";
import usersReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modules: modulesReducer,
    roles: rolesReducer,
    users: usersReducer,
  },
});
export default store;