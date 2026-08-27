import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/auth.service";

// ===============================
// GET ALL CATEGORIES
// ===============================

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

// ===============================
// ADD CATEGORY
// ===============================

export const addCategory = createAsyncThunk(
  "category/create",

  async (name, thunkAPI) => {
    try {
      const response = await api.post("/category/create", {
        name,
      });

      return response.data.category;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Creating new category failed",
      );
    }
  },
);

// ===============================
// DELETE CATEGORY
// ===============================

export const deleteCategory = createAsyncThunk(
  "category/delete",

  async (id, thunkAPI) => {
    try {
      const response = await api.delete(`/category/delete${id}`);

      return response.data.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Deleting category failed",
      );
    }
  },
);

// ===============================
// INITIAL STATE
// ===============================

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

// ===============================
// SLICE
// ===============================

const categorySlice = createSlice({
  name: "category",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ===============================
      // GET CATEGORIES
      // ===============================

      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })

      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===============================
      // ADD CATEGORY
      // ===============================

      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.categories.push(action.payload);

        state.error = null;
      })

      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===============================
      // DELETE CATEGORY
      // ===============================

      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.categories = state.categories.filter(
          (category) => category._id !== action.payload,
        );

        state.error = null;
      })

      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
