import express from "express";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/admindashboard", verifyToken, verifyAdmin, (req, res) => {
  res
    .status(200)
    .json({ message: "welcome to admin dashboard", user: req.user });
});

export default router;
