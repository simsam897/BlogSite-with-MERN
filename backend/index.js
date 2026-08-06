import dotenv from "dotenv";
import authRouter from "./src/routes/auth.route.js";

dotenv.config({ path: ".env" });
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use("/auth", authRouter);

export default app;
