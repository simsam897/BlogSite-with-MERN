import express from "express";
import { createBlog, getAllBlogs } from "../controllers/blog.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/create", verifyToken, upload.single("coverImage"), createBlog);
router.get("/getblogs", getAllBlogs);

export default router;
