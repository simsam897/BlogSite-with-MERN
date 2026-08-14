import { Category } from "../models/category.model.js";

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(404).json({
        message: "all fileds are required",
      });
    }
    
    const category = await Category.create({ name });

    if (!category) {
      res.status(404).json({
        message: "creating category failed",
      });
    }

    return res.status(201).json({
      message: "category created successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
