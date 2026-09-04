import mongoose from "mongoose";
import { Auth } from "../models/auth.model.js";
import { gentoken } from "../utils/token.js";
import uploadToCloudianry from "../utils/uploadToCloudianry.js";

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
      return res.status(401).json({
        message: "invaild password",
      });
    }

    const token = gentoken(user._id, user.role);

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "user signin successfully",
        user: {
          _id: user._id,
          role: user.role,
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

export const updateUser = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await Auth.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { username, email, password } = req.body;

    if (username) {
      user.username = username;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      user.password = password;
    }

    if (req.file) {
      const result = await uploadToCloudianry(
        req.file.buffer,
        "profilePictures",
      );

      user.profilePicture = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    await user.save();

    const updatedUser = await Auth.findById(user._id).select("-password");

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update user error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Username or email already exists",
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.status(200).json({ message: "signout successfull" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error signing out", error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    return res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await Auth.find();

    if (users.length === 0) {
      return res.status(404).json({
        message: "No users found",
      });
    }

    return res.status(200).json({
      message: "All users fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
