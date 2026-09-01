import api from "../../services/auth.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllBlogs = createAsyncThunk(
  "blog/userBlogs",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/blog/getblogs");

      return response.data.blog;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fetching all blogs failed",
      );
    }
  },
);

export const userBlogs = createAsyncThunk(
  "blog/userblogs",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/blog/userblogs");

      return response.data.blogs;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fetching user blogs failed",
      );
    }
  },
);

export const createBlogAPI = createAsyncThunk(
  "blog/createblog",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post(`/blog/create`, formData);

      return response.data.blog;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Creating blog failed",
      );
    }
  },
);

export const updateBlog = createAsyncThunk(
  "blog/update",
  async (updateBlogData, thunkAPI) => {
    try {
      const response = await api.patch("blog/update/${id}", updateBlogData);
      return response.data.blog;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "updating blog failed",
      );
    }
  },
);

export const deleteBlog = createAsyncThunk(
  "blog/deleteblog",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/blog/deleteblog/${id}`);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Deleting blog failed",
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
  name: "blog",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET ALL BLOGS
      .addCase(getAllBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
        state.error = null;
      })

      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE BLOG
      .addCase(createBlogAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createBlogAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
        state.error = null;
      })

      .addCase(createBlogAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // USER BLOGS
      .addCase(userBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(userBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
        state.error = null;
      })

      .addCase(userBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;

        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);

        state.error = null;
      })

      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateBlog.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })

      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;

        const updatedBlog = action.payload;

        state.blogs = state.blogs.map((blog) => {
          blog._id === updatedBlog._id ? updatedBlog : blog;
        });
        state.error = null;
      })

      .addCase(updateBlog.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      });
  },
});

export default blogSlice.reducer;
