import dotenv from "dotenv";
import authRouter from "./src/routes/auth.route.js";

dotenv.config({ path: ".env" });
import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

export default app;
