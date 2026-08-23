import { Category } from "../models/category.model.js";

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(404).json({
        message: "all fileds are required",
      });
    }

    const isDuplicate = await Category.findOne({ name });

    if (isDuplicate) {
      return res.status(409).json({
        message: "this category is already exist",
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

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({
      name: 1,
    });
    if (categories) {
      return res.status(200).json({
        message: "categories fetched successfully",
        categories,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({
        message: "category not found",
      });
    }

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(401).json({
        message: "category deleltion failed",
      });
    }

    return res.status(200).json({
      message: "category deleted successfully",
    });

    x;
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
