import express from "express";
import {
  signup,
  signin,
  deleteUser,
  fetchAllUsers,
  updateUser,
  signout,
  getCurrentUser,
  getAllUsers,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.delete("/delete/:id", deleteUser);
router.get("/getusers", fetchAllUsers);
router.post("/updateuser/:id", updateUser);
router.get("/currentuser", verifyToken, getCurrentUser);
router.get("/getusers", getAllUsers);
export default router;
