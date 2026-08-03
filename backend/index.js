import dotenv from "dotenv";

dotenv.config({ path: ".env" });
import express from "express";
import mongoose from "mongoose";

const app = express();

export default app;
