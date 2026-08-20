import express from "express";
import { createBlog, getAllBlogs } from "../controllers/blog.controller.js";

const router = express.Router();

router.post("/create", createBlog);
router.get("/getblogs", getAllBlogs);

export default router;
