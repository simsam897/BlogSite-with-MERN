import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FileText, Pencil, Trash2 } from "lucide-react";

import { deleteBlog, userBlogs } from "../features/blog/blogSlice";

const MyBlogs = () => {
  const dispatch = useDispatch();

  const { blogs, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(userBlogs());
  }, [dispatch]);

  const handleEdit = (id) => {
    console.log("Edit blog:", id);
  };

  const handleDelete = (_id) => {
    // console.log("Delete blog:", blogId);

    dispatch(deleteBlog(_id));
  };

  if (loading) {
    return <p className="p-6 text-center">Loading blogs...</p>;
  }

  if (error) {
    return <p className="p-6 text-center text-red-500">{error}</p>;
  }

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">My Blogs</h1>

        <p className="mt-2 text-gray-500">Manage your blog posts from here.</p>
      </div>

      {/* No Blogs */}
      {blogs?.length === 0 && (
        <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
          <FileText size={45} className="mx-auto mb-4 text-gray-400" />

          <h2 className="text-xl font-semibold">No Blogs Found</h2>

          <p className="mt-2 text-gray-500">
            You haven't created any blogs yet.
          </p>
        </div>
      )}

      {/* Blog Cards */}
      <div className="grid gap-4">
        {blogs?.map((blog) => (
          <div
            key={blog._id}
            className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center"
          >
            {/* Small Image */}
            <img
              src={blog.coverImage?.url || blog.coverImage}
              alt={blog.title}
              className="h-20 w-full rounded-lg object-cover sm:w-28"
            />

            {/* Blog Details */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{blog.title}</h2>

              <span className="mt-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                {blog.category?.name || blog.category}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(blog._id)}
                className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
              >
                <Pencil size={17} />
                Edit
              </button>

              <button
                onClick={() => handleDelete(blog._id)}
                className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
              >
                <Trash2 size={17} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
