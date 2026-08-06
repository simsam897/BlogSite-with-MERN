import mongoose from "mongoose";
import { Auth } from "../models/auth.model.js";
import { gentoken } from "../utils/token.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }

    const existUser = await Auth.findOne({ email });
    if (existUser) {
      return res.status(409).json({
        message: "user already exist",
      });
    }

    const user = await Auth.create({
      username,
      email,
      password,
    });

    return res.status(200).json({
      message: "user signup successfully",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }

    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(409).json({
        message: "user does no exist",
      });
    }

    const isMatchedPassword = await user.comparedPassword(password);
    if (!isMatchedPassword) {
      res.status(401).json({
        message: "invaild password",
      });
    }

    const token = gentoken(user.username, user.password, user.email);
    console.log(token, "test");

    return res
      .status(200)
      .cookie({
        httpOnly: true,
        secure: false,
        samesite: "strict",
        maxAge: 60 * 60 * 1000,
      })
      .json({
        message: "user signup successfully",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await Auth.findByIdAndDelete(id);
    if (user) {
      return res.status(201).json({
        message: "user deleted successfully",
      });
    } else {
      return res.status(400).json({
        message: "user not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const fetchAllUsers = async (req, res) => {
  try {
    const users = await Auth.find().select("-password");
    if (users) {
      return res.status(200).json({
        message: "users fetched successfully",
        data: {
          users: users,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "invalid user id",
      });
    }

    const { username, email, password } = req.body;

    const updateData = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    const updatedUser = await Auth.findByIdAndUpdate(
      id,
      updateData,

      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "Updation failed",
      });
    }

    return res.status(200).json({
      message: "user updated successfullu",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


