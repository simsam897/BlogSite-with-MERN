import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
  userblogs,
} from "../controllers/blog.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/create", verifyToken, upload.single("coverImage"), createBlog);
router.get("/getblogs", getAllBlogs);
router.get("/userblogs", verifyToken, userblogs);
router.delete("/deleteblog/:id", deleteBlog);
router.patch(
  "/update/:id",
  verifyToken,
  upload.single("coverImage"),
  updateBlog,
);

export default router;
