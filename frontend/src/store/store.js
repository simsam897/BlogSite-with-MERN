import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import themeReducer from "../features/theme/themeSlice.jsx";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,

export const store = configureStore({
  reducers: {
    auth: authReducer,
 
  },
});
