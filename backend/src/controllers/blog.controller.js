// import { Auth } from "../models/auth.model.js";
import { Blog } from "../models/blog.model.js";
import uploadToCloudianry from "../utils/uploadToCloudianry.js";

export const createBlog = async (req, res, next) => {
  try {
    const { title, content, category, tags } = req.body;

    const author = req.user._id;
    if (!title || !content || !category || !tags) {
      return res.status(404).json({
        message: "all fileds are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "cover image is required",
      });
    }

    const result = await uploadToCloudianry(req.file.buffer, "blogCoverImage");

    console.log(result.secure_url);
    console.log(result.public_id);

    const blog = await Blog.create({
      title,
      coverImage: {
        url: result.secure_url,
        publicId: result.public_id,
      },
      content,
      author,
      category,
      tags,
    });

    if (!blog) {
      return res.status(401).json({
        message: "creating blog failed",
      });
    }

    return res.status(201).json({
      message: "blog created successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const blog = await Blog.find()
      .populate("author", "username")
      .populate("category", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "all blogs fetched successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const { title, content, category, tags } = req.body;
    const blogUpdateData = { title, content, category, tags };

    if (!req.file) {
      return res.status(400).json({
        message: "cover image is required",
      });
    }

    const result = await uploadToCloudianry(req.file.buffer, "blogCoverImage");

    console.log(result.secure_url);
    console.log(result.public_id);

    const blog = await Blog.findByIdAndUpdate(
      blogId,
      blogUpdateData,

      {
        new: true,
        runValidators: true,
      },
    );

    if (!blog) {
      return res.status(401).json({
        message: "creating blog failed",
      });
    }

    return res.status(201).json({
      message: "blog updated successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const userblogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ author: req.user._id });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        message: "No blogs found for this user",
      });
    }

    return res.status(200).json({
      message: "myblogs fetched successfully",
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOneAndDelete(id);

    if (!blog) {
      return res.status(400).json({
        message: "id not found",
      });
    } else {
      return res.status(200).json({
        message: "blog deleted successfully",
        id,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "blog deletion is failed",
    });
  }
};
