import api from "../../services/auth.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllBlogs = createAsyncThunk(
  "blog/getallblogs",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/blog/getblogs");
      return response.data.blog;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "fecthing all blogs failed",
      );
    }
  },
);

const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllBlogs.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })

      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        ((state.blogs = action.payload), (state.error = null));
      })

      .addCase(getAllBlogs.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      });
  },
});

export default blogSlice.reducer;
