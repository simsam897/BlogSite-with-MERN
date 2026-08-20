import { Blog } from "../models/blog.model.js";

export const createBlog = async (req, res, next) => {
  try {
    const { title, coverImage, content, author, category, tags } = req.body;

    if (!title || !coverImage || !content || !author || !category || !tags) {
      return res.status(404).json({
        message: "all fileds are required",
      });
    }

    const blog = await Blog.create({
      title,
      coverImage,
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
    const blogs = await  Blog.find();

 return res.status(200).json({
    message:"all blogs fetched successfully",
    blogs
  })

} catch (error) {
  return res.status(500).json({
  message:error.message
  })
}


};
