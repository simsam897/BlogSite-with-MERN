import React, { useEffect } from "react";

import { ArrowRight, CalendarDays, User, Tag, Trash2 } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { getAllBlogs, deleteBlog } from "../../features/blog/blogSlice";

import { useNavigate } from "react-router-dom";

const ManageBlogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blogs, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  // Delete blog
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?",
    );

    if (confirmDelete) {
      dispatch(deleteBlog(id));
    }
  };

  // Read more
  const handleReadMore = (id) => {
    navigate(`/blog/${id}`);
  };

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg font-medium text-gray-600">Loading blogs...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="rounded-lg bg-red-50 px-5 py-3 text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto mb-10 max-w-7xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Admin Dashboard
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Manage Blogs
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-gray-600">
          Manage all blog posts from here.
        </p>
      </div>

      {/* Blog Grid */}
      {blogs.length > 0 ? (
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((item) => (
            <article
              key={item._id}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Cover Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={item.coverImage?.url}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Category */}
                {item.category?.name && (
                  <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold capitalize text-indigo-600 shadow-sm">
                    <Tag size={12} />
                    {item.category.name}
                  </span>
                )}
              </div>

              {/* Card Content */}
              <div className="p-4">
                {/* Author + Date */}
                <div className="mb-3 flex flex-wrap items-center gap-3 text-[11px] text-gray-500">
                  {item.author?.username && (
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      {item.author.username}
                    </span>
                  )}

                  {item.createdAt && (
                    <span className="flex items-center gap-1">
                      <CalendarDays size={12} />

                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition group-hover:text-indigo-600">
                  {item.title}
                </h2>

                {/* Content */}
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-600">
                  {item.content}
                </p>

                {/* Buttons */}
                <div className="mt-5 flex items-center justify-between">
                  {/* Read More */}
                  <button
                    type="button"
                    onClick={() => handleReadMore(item._id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 transition-all duration-200 hover:gap-2.5"
                  >
                    Read More
                    <ArrowRight size={15} />
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center gap-1.5 rounded-md bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* No Blogs */
        <div className="py-20 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            No blogs found
          </h2>

          <p className="mt-2 text-gray-500">
            There are no blog posts available yet.
          </p>
        </div>
      )}
    </section>
  );
};

export default ManageBlogs;
