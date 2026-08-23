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

export const createBlogAPI = createAsyncThunk(
  "blog/createblog",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post("/blog/create", formData);

      console.log(response.data);
      return response.data.blog;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "creating blog failed",
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
      })

      // create blog cases

      .addCase(createBlogAPI.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })

      .addCase(createBlogAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.unshift(action.payload);
        state.error = null;
      })

      .addCase(createBlogAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
