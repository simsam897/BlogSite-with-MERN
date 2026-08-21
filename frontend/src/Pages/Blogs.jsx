import React, { useEffect } from "react";

import { ArrowRight, CalendarDays, User, Tag } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { getAllBlogs } from "../features/blog/blogSlice";

const Blogs = () => {
  const dispatch = useDispatch();

  const { blogs, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

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
    <section className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto mb-12 max-w-7xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Our Blog
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Latest Articles
        </h1>

        <p className="mt-3 max-w-2xl text-gray-600">
          Discover useful articles, ideas, and insights from our latest posts.
        </p>
      </div>

      {/* Blog Grid */}
      {blogs.length > 0 ? (
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((item) => (
            <article
              key={item._id}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Cover Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Category Badge */}
                {item.category?.name && (
                  <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold capitalize text-indigo-600 shadow-sm backdrop-blur-sm">
                    <Tag size={13} />

                    {item.category.name}
                  </span>
                )}
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Author + Date */}
                <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  {/* Author */}
                  {item.author?.username && (
                    <span className="flex items-center gap-1.5">
                      <User size={14} />

                      {item.author.username}
                    </span>
                  )}

                  {/* Date */}
                  {item.createdAt && (
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={14} />

                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="line-clamp-2 text-xl font-bold leading-snug text-gray-900 transition group-hover:text-indigo-600">
                  {item.title}
                </h2>

                {/* Content */}
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                  {item.content}
                </p>

                {/* Read More */}
                <button
                  type="button"
                  className="mt-6 flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-all duration-200 hover:gap-3"
                >
                  Read More
                  <ArrowRight size={17} />
                </button>
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

export default Blogs;
