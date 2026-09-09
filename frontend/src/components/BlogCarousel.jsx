import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";

import { getAllBlogs } from "../features/blog/blogSlice";

const BlogCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get blogs from Redux
  const { blogs, loading, error } = useSelector((state) => state.blog);

  // Fetch blogs when component mounts
  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  // Get latest 6 blogs
  const latestBlogs = [...(blogs || [])]
    .sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    .slice(0, 6);

  // Loading state
  if (loading) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Latest Blogs
          </h2>

          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Discover our latest articles
          </p>
        </div>

        <div className="flex gap-4 sm:gap-6 overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="flex-none w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
            >
              <div className="h-44 sm:h-48 md:h-52 bg-gray-200"></div>

              <div className="p-4 sm:p-5">
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>

                <div className="h-5 bg-gray-200 rounded mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-4/5 mb-4"></div>

                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center py-10">
          <p className="text-red-500">
            Failed to load blogs. Please try again.
          </p>
        </div>
      </section>
    );
  }

  // Empty state
  if (!latestBlogs.length) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center py-10">
          <p className="text-gray-500">No blogs available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Latest Blogs
        </h2>

        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Explore our six latest articles
        </p>
      </div>

      {/* Carousel */}
      <div className="overflow-x-auto pb-4 scroll-smooth hide-scrollbar -mx-4 sm:mx-0">
        <div
          className="flex gap-4 sm:gap-6 px-4 sm:px-0"
          style={{ width: "max-content" }}
        >
          {latestBlogs.map((blog) => (
            <article
              key={blog._id}
              className="flex-none w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden">
                <img
                  src={
                    blog.coverImage.url ||
                    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&h=300&fit=crop"
                  }
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />

                {/* Category */}
                {blog.category && (
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full text-gray-800">
                    {typeof blog.category === "object"
                      ? blog.category.name
                      : blog.category}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                {/* Date + Read Time */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <div className="flex items-center gap-1">
                    <CalendarDays size={13} />
                    <span>
                      {blog.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Recent"}
                    </span>
                  </div>

                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>

                  <div className="flex items-center gap-1">
                    <Clock size={13} />
                    <span>{blog.readTime || "5 min read"}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {blog.excerpt ||
                    blog.content?.replace(/<[^>]*>/g, "").slice(0, 120) + "..."}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  {/* Author */}
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs sm:text-sm font-semibold">
                      {(typeof blog.author === "object"
                        ? blog.author?.username
                        : blog.author || "A"
                      )
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <span className="text-xs sm:text-sm font-medium text-gray-700 truncate max-w-[80px] sm:max-w-[100px]">
                      {typeof blog.author === "object"
                        ? blog.author?.username
                        : blog.author || "Admin"}
                    </span>
                  </div>

                  {/* Read More */}
                  <button
                    onClick={() => navigate(`/blog/${blog._id}`)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-semibold whitespace-nowrap transition-colors"
                  >
                    Read More
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4 sm:mt-6">
        {latestBlogs.map((_, index) => (
          <span
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === 0 ? "bg-blue-600 w-6" : "bg-gray-300 w-2"
            }`}
          ></span>
        ))}
      </div>

      {/* Mobile hint */}
      {latestBlogs.length > 1 && (
        <div className="text-center mt-3 sm:hidden">
          <span className="text-xs text-gray-400">← Scroll to see more →</span>
        </div>
      )}

      {/* Hide scrollbar + line clamp */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default BlogCarousel;
