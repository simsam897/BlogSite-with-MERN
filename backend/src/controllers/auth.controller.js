import { Auth } from "../models/auth.model.js";

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
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
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
      res.status.json({
        message: "invaild password",
      });
    }
    return res.status(200).json({
      message: "user signup successfully",
      data: {
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
