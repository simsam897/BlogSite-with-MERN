import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
  ImagePlus,
  X,
  Tag,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { createBlogAPI } from "../features/blog/blogSlice";
import { getAllCategories } from "../features/category/categorySlice";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const dispatch = useDispatch();

  const { loading: blogLoading, error: blogError } = useSelector(
    (state) => state.blog,
  );

  const {
    categories,
    loading: categoryLoading,
    error: categoryError,
  } = useSelector((state) => state.category);

  // Fetch all categories
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        class: "min-h-[350px] p-5 outline-none prose prose-lg max-w-none",
      },
    },
  });

  // Add tag
  const addTag = () => {
    const newTag = tagInput.trim();

    if (!newTag) return;

    if (tags.includes(newTag)) {
      return;
    }

    setTags([...tags, newTag]);
    setTagInput("");
  };

  // Add tag on Enter
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Handle cover image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Remove previous preview URL
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setCoverImage(file);

    const imagePreview = URL.createObjectURL(file);
    setPreview(imagePreview);
  };

  // Remove cover image
  const removeCoverImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setCoverImage(null);
    setPreview(null);
  };

  // Submit blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = editor?.getHTML();

    if (!title || !category || !coverImage || !content) {
      return;
    }

    if (tags.length === 0) {
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("tags", JSON.stringify(tags));
    formData.append("coverImage", coverImage);

    try {
      await dispatch(createBlogAPI(formData)).unwrap();

      console.log("Blog created successfully");

      // Reset form
      setTitle("");
      setCategory("");
      setTags([]);
      setTagInput("");

      removeCoverImage();

      editor?.commands.clearContent();
    } catch (error) {
      console.log("Blog creation error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600 mb-2">
            BLOG MANAGEMENT
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Create New Blog
          </h1>

          <p className="text-gray-500 mt-2">
            Write and publish a new article for your readers.
          </p>
        </div>

        {/* Error */}
        {blogError && (
          <div className="mb-5 rounded-xl bg-red-100 border border-red-200 px-4 py-3 text-red-600">
            {blogError}
          </div>
        )}

        {categoryError && (
          <div className="mb-5 rounded-xl bg-red-100 border border-red-200 px-4 py-3 text-red-600">
            {categoryError}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-8"
        >
          {/* Title */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Blog Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter an interesting blog title..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Category */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={categoryLoading}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-gray-100"
            >
              <option value="">
                {categoryLoading
                  ? "Loading categories..."
                  : "Select a category"}
              </option>

              {categories.map((categoryItem) => (
                <option key={categoryItem._id} value={categoryItem._id}>
                  {categoryItem.name}
                </option>
              ))}
            </select>
          </div>

          {/* Cover Image */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cover Image
            </label>

            <label className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
              <ImagePlus size={40} className="text-gray-400 mb-3" />

              <p className="font-medium text-gray-700">
                Click to upload cover image
              </p>

              <p className="text-sm text-gray-400 mt-1">PNG, JPG or WEBP</p>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {preview && (
              <div className="relative mt-5">
                <img
                  src={preview}
                  alt="Cover preview"
                  className="w-full h-72 object-cover rounded-xl"
                />

                <button
                  type="button"
                  onClick={removeCoverImage}
                  className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="mb-7">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Tag size={16} />
              Tags
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Type a tag and press Enter..."
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={addTag}
                className="px-5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition"
              >
                Add
              </button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm"
                  >
                    {tag}

                    <button type="button" onClick={() => removeTag(tag)}>
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Blog Content */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Blog Content
            </label>

            <div className="border border-gray-300 rounded-2xl overflow-hidden">
              {/* Toolbar */}
              {editor && (
                <div className="flex flex-wrap gap-2 p-3 border-b border-gray-200 bg-gray-50">
                  {/* Bold */}
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded-lg ${
                      editor.isActive("bold")
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <Bold size={18} />
                  </button>

                  {/* Italic */}
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded-lg ${
                      editor.isActive("italic")
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <Italic size={18} />
                  </button>

                  {/* Bullet List */}
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().toggleBulletList().run()
                    }
                    className={`p-2 rounded-lg ${
                      editor.isActive("bulletList")
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <List size={18} />
                  </button>

                  {/* Ordered List */}
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().toggleOrderedList().run()
                    }
                    className={`p-2 rounded-lg ${
                      editor.isActive("orderedList")
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <ListOrdered size={18} />
                  </button>

                  {/* Quote */}
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().toggleBlockquote().run()
                    }
                    className={`p-2 rounded-lg ${
                      editor.isActive("blockquote")
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <Quote size={18} />
                  </button>

                  <div className="w-px bg-gray-300 mx-1" />

                  {/* Undo */}
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    className="p-2 rounded-lg hover:bg-gray-200"
                  >
                    <Undo2 size={18} />
                  </button>

                  {/* Redo */}
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    className="p-2 rounded-lg hover:bg-gray-200"
                  >
                    <Redo2 size={18} />
                  </button>
                </div>
              )}

              {/* Editor */}
              <EditorContent editor={editor} />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end border-t pt-6">
            <button
              type="button"
              className="px-6 py-3 rounded-xl border border-gray-300 font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={blogLoading}
              className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {blogLoading ? "Publishing..." : "Publish Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
