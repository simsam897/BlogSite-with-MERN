import dotenv from "dotenv";
import authRouter from "./src/routes/auth.route.js";
import categoryRouter from "./src/routes/category.route.js";
import blogRouter from "./src/routes/blog.route.js";

dotenv.config({ path: ".env" });
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/category", categoryRouter);
app.use("/blog", blogRouter);

export default app;
