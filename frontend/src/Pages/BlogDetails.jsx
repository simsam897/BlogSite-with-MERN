import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import api from "../services/auth.service";

const BlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getBlog = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/blog/${id}`);

        setBlog(response.data.blog);
      } catch (error) {
        console.log("Get single blog error:", error);

        setError(error.response?.data?.message || "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getBlog();
    }
  }, [id]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />

          <p className="text-gray-500">Loading blog...</p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Something went wrong
          </h2>

          <p className="mt-3 break-words text-sm text-red-500">{error}</p>

          <button
            onClick={() => navigate("/blogs")}
            className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  // Blog not found
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Blog not found</h2>

          <button
            onClick={() => navigate("/blogs")}
            className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Browse Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <article className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-gray-600 transition hover:bg-white hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          Back to blogs
        </button>
        {/* Blog Header */}
        <header className="rounded-3xl bg-white px-5 py-7 shadow-sm border border-gray-200 sm:px-8 sm:py-10 lg:px-12">
          {/* Category */}
          {blog.category?.name && (
            <div className="mb-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-indigo-600">
                <Tag size={14} />
                {blog.category.name}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="break-words text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {blog.title}
          </h1>

          {/* Author + Date */}
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-500">
            {blog.author?.username && (
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <User size={17} />
                </div>

                <div>
                  <p className="text-xs text-gray-400">Written by</p>

                  <p className="font-medium text-gray-700">
                    {blog.author.username}
                  </p>
                </div>
              </div>
            )}

            {blog.createdAt && (
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                  <Calendar size={17} />
                </div>

                <div>
                  <p className="text-xs text-gray-400">Published</p>

                  <p className="font-medium text-gray-700">
                    {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </header>
        {/* Cover Image */}
        {blog.coverImage?.url && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <img
              src={blog.coverImage.url}
              alt={blog.title}
              className="block h-auto max-h-[600px] w-full object-cover"
            />
          </div>
        )}
        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="max-w-full break-words rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        {/* Blog Content */}
        {/* Blog Content */}{" "}
        <section className="mt-8 w-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          {" "}
          <div
            className=" w-full px-5 py-7 sm:px-8 sm:py-10 lg:px-12 lg:py-12 break-words [overflow-wrap:anywhere] text-base leading-8 text-gray-700 [&_p]:mb-6 [&_p]:leading-8 [&_p]:break-words [&_h1]:mb-6 [&_h1]:mt-10 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:text-gray-900 [&_h2]:mb-5 [&_h2]:mt-9 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-gray-900 [&_h3]:mb-4 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-900 [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_li]:break-words [&_strong]:font-bold [&_strong]:text-gray-900 [&_a]:break-all [&_a]:text-indigo-600 [&_a]:underline [&_blockquote]:my-7 [&_blockquote]:border-l-4 [&_blockquote]:border-indigo-500 [&_blockquote]:bg-gray-50 [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_img]:my-8 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-2xl [&_pre]:my-7 [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-gray-900 [&_pre]:p-5 [&_code]:break-words "
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />{" "}
        </section>
        {/* Bottom Back Button */}
        <div className="mt-10 border-t border-gray-200 pt-8">
          <button
            onClick={() => navigate("/blogs")}
            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            <ArrowLeft size={17} />
            Back to all blogs
          </button>
        </div>
      </article>
    </main>
  );
};

export default BlogDetails;
