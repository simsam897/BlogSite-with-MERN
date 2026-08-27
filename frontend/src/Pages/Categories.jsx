import React, { useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteCategory,
  addCategory,
  getAllCategories,
} from "../features/category/categorySlice";

export const Categories = () => {
  const [categoryName, setCategoryName] = useState("");

  const dispatch = useDispatch();

  // Get categories from Redux store
  const { categories, loading, error } = useSelector((state) => state.category);

  // Fetch categories when page loads
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  // Add category
  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      return;
    }

    await dispatch(addCategory(categoryName));

    setCategoryName("");
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    await dispatch(deleteCategory(id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Categories
          </h1>

          <p className="mt-2 text-gray-500">
            Add and manage your blog categories.
          </p>
        </div>

        {/* Add Category */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <form
            onSubmit={handleAddCategory}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <input
              type="text"
              placeholder="Enter category name..."
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              <Plus size={20} />
              Add Category
            </button>
          </form>
        </div>

        {/* Error */}
        {error && (
          <p className="mt-4 rounded-lg bg-red-100 p-3 text-red-600">{error}</p>
        )}

        {/* Categories */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Created Categories
          </h2>

          {loading && categories.length === 0 ? (
            <p>Loading categories...</p>
          ) : categories.length === 0 ? (
            <div className="rounded-lg bg-white p-6 text-center text-gray-500 shadow-sm">
              No categories created yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm"
                >
                  <h3 className="font-medium text-gray-800">{category.name}</h3>

                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    className="rounded-md p-2 text-red-500 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
