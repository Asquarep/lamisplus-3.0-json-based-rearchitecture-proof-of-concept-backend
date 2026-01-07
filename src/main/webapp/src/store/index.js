// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import modulesReducer from "./slices/modulesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modules: modulesReducer,
  },
});
export default store;