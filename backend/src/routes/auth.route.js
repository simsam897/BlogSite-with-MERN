import express from "express";
import {
  signup,
  signin,
  deleteUser,
  fetchAllUsers,
  updateUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.delete("/delete/:id", deleteUser);
router.get("/getusers", fetchAllUsers);
router.post("/updateuser/:id", updateUser);
export default router;
