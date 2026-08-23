import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/auth.service";

// Get all categories
export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",

  async (_, thunkAPI) => {
    try {
      const response = await api.get("/category/get");

      return response.data.categories;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fetching categories failed",
      );
    }
  },
);

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      // Get categories pending
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Get categories successful
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })

      // Get categories failed
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
