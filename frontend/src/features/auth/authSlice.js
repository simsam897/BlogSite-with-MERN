import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/auth.service.js";

// signup user
export const signupUser = createAsyncThunk(
  "auth/signup",

  async (userData, thunkAPI) => {
    try {
      const response = await api.post("/auth/signup", userData);

      return response.data.user;

      console.log("Response:", response.user);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "registration failed",
      );
    }
  },
);

// signin user
export const signinUser = createAsyncThunk(
  "auth/signin",

  async (userData, thunkAPI) => {
    try {
      const response = await api.post("/auth/signin", userData);

      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "signin failed",
      );
    }
  },
);

export const getcurrentUser = createAsyncThunk(
  "auth/currentuser",
  async (thunkAPI) => {
    try {
      const response = await api.get("/auth/currentuser");
      return response.data.user;
    } catch (error) {
      thunkAPI.rejectWithValue(
        error.response?.data?.message || "failed to get current user",
      );
    }
  },
);

// signout user
export const signoutUser = createAsyncThunk(
  "auth/signout",
  async (thunkAPI) => {
    try {
      const response = await api.post("/auth/signout");
      return response.data.user;
    } catch (error) {
      thunkAPI.rejectWithValue(
        error.respone?.data?.message || "signout failed",
      );
    }
  },
);

//  initialState
const initialState = {
  user: null,
  loading: false,
  error: null,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      ((state.user = null), (state.loading = false), (state.error = null));
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signupUser.fulfilled, (state, action) => {
        console.log("Payload:", action.payload);
        ((state.loading = false), (state.user = action.payload));
      })

      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SIGNIN cases
      .addCase(signinUser.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })

      .addCase(signinUser.fulfilled, (state, action) => {
        ((state.loading = false), (state.user = action.payload));
      })

      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // signout user

      .addCase(signoutUser.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })

      .addCase(signoutUser.fulfilled, (state, action) => {
        ((state.loading = false), (state.user = null));
      })

      .addCase(signoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getcurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getcurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(getcurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
