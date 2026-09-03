import React, { useState } from "react";
import { User, FileText, LogOut, Camera, Menu, X } from "lucide-react";
import { signoutUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
const Userdashboard = () => {
  const [activePage, setActivePage] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Change dashboard page
  const handlePageChange = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const handleSignout = () => {
    signoutUser();
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* =====================================================
          DASHBOARD
          Navbar and Footer are NOT included here.
          Your parent layout should render them.
      ===================================================== */}

      <div className="flex min-h-[calc(100vh-8rem)] flex-col lg:flex-row">
        {/* =====================================================
            MOBILE SIDEBAR TOGGLE
        ===================================================== */}
        <div className="border-b border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700"
          >
            <div className="flex items-center gap-3">
              <User size={20} />

              <span className="font-medium">Dashboard Menu</span>
            </div>

            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* =====================================================
            SIDEBAR
        ===================================================== */}
        <aside
          className={`
            w-full shrink-0 border-b border-gray-200
            bg-white dark:border-gray-800 dark:bg-gray-900
            lg:min-h-[calc(100vh-8rem)]
            lg:w-64 lg:border-b-0 lg:border-r
            ${sidebarOpen ? "block" : "hidden lg:block"}
          `}
        >
          <div className="flex min-h-full flex-col">
            {/* Sidebar Header */}
            <div className="border-b border-gray-200 p-5 dark:border-gray-800">
              <h2 className="text-lg font-semibold">Dashboard</h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage your account
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
              <div className="space-y-2">
                <Link to="/userupdate">Profile update</Link>
                <button
                  type="button"
                  onClick={() => navigate("/createblog")}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition"
                >
                  <FileText size={20} />
                  <span className="font-medium">Create Blog</span>
                </button>

                {/* Blogs */}
                <button
                  type="button"
                  onClick={() => navigate("/userblogs")}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition ${
                    activePage === "blogs"
                      ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  <FileText size={20} />

                  <span className="font-medium">Blogs</span>
                </button>
              </div>
            </nav>

            {/* Sign Out */}
            <div className="border-t border-gray-200 p-4 dark:border-gray-800">
              <button
                type="button"
                onClick={handleSignout}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
              >
                <LogOut size={20} />

                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}
        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
            {/* =================================================
                BLOGS
            ================================================= */}
            {activePage === "blogs" && (
              <section>
                <div className="mb-8">
                  <h1 className="text-2xl font-bold sm:text-3xl">Blogs</h1>

                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Manage your blogs from here.
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
                  <FileText size={50} className="mx-auto text-gray-400" />

                  <h2 className="text-xl font-semibold">Your Blogs</h2>

                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Your blog posts will appear here.
                  </p>

                  <button
                    type="button"
                    className="mt-6 rounded-lg bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                  >
                    Create Blog
                  </button>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Userdashboard;
