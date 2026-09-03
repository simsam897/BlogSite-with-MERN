import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/auth.service.js";

// SIGNUP USER

export const signupUser = createAsyncThunk(
  "auth/signup",

  async (userData, thunkAPI) => {
    try {
      const response = await api.post("/auth/signup", userData);

      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

// SIGNIN USER

export const signinUser = createAsyncThunk(
  "auth/signin",

  async (userData, thunkAPI) => {
    try {
      const response = await api.post("/auth/signin", userData);

      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Signin failed",
      );
    }
  },
);

// GET CURRENT USER

export const getcurrentUser = createAsyncThunk(
  "auth/currentuser",

  async (_, thunkAPI) => {
    try {
      const response = await api.get("/auth/currentuser");

      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get current user",
      );
    }
  },
);

// SIGNOUT USER

export const updateUser = createAsyncThunk(
  "auth/updateuser",
  async (updateUserData, thunkAPI) => {
    try {
      const response = await api.patch("/auth/updateuser", updateUserData);
      return response.data.updatedUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "updating user failed",
      );
    }
  },
);

export const signoutUser = createAsyncThunk(
  "auth/signout",

  async (_, thunkAPI) => {
    try {
      const response = await api.post("/auth/signout");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Signout failed",
      );
    }
  },
);

// GET ALL USERS

export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",

  async (_, thunkAPI) => {
    try {
      const response = await api.get("/auth/getusers");

      return response.data.data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fetching users failed",
      );
    }
  },
);

// DELETE USER

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",

  async (id, thunkAPI) => {
    try {
      await api.delete(`/auth/delete/${id}`);

      // Return the deleted user's ID
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Deleting user failed",
      );
    }
  },
);

// INITIAL STATE

const initialState = {
  user: null,

  // For admin AllUsers page
  users: [],

  loading: false,
  error: null,
  initialized: false,
};

// AUTH SLICE

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // SIGNUP

      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })

      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SIGNIN

      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })

      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET CURRENT USER

      .addCase(getcurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getcurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.initialized = true;
        state.error = null;
      })

      .addCase(getcurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.initialized = true;
        state.error = action.payload;
      })

      // SIGNOUT

      .addCase(signoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })

      .addCase(signoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL USERS

      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })

      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE USER

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;

        // Remove the deleted user from Redux state
        state.users = state.users.filter((user) => user._id !== action.payload);

        state.error = null;
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUser.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        ((state.user = action.payload), (state.error = null));
      })

      .addCase(updateUser.rejected, (state, action) => [
        (state.loading = false),
        (state.error = action.payload),
      ]);
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
