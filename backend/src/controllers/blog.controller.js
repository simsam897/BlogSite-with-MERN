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
    console.log(JSON.stringify(blog, null, 2));
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
