import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";

export const store = configureStore({
  reducers: {
    auth: authReducer,
  },
});
