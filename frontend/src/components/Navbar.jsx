import { useEffect, useRef, useState } from "react";
import {
  Sun,
  Moon,
  User,
  LogOut,
  Search,
  ChevronDown,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";
import { signoutUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Redux theme
  const mode = useSelector((state) => state.theme.mode);
  const isDarkMode = mode === "dark";

  // Profile dropdown
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Redux dark mode
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  // Profile dropdown
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  const handleSignout = async () => {
    const result = await dispatch(signoutUser());

    if (signoutUser.fulfilled.match(result)) {
      setIsProfileMenuOpen(false);
      navigate("/signin");
    }
  };
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200  dark:border-gray-700 bg-slate-900 dark:bg-black transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        <div className="mr-auto flex-shrink-0">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 dark:text-blue-400"
          >
            BlogVerse
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              to="/"
              className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Home
            </Link>

            <Link
              to="/blogs"
              className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Blogs
            </Link>

            <Link
              to="/about"
              className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
            >
              About Us
            </Link>
          </div>

          {/* DESKTOP SEARCH + DARK MODE */}
          <div className="hidden md:flex items-center gap-2">

            {/* Search */}
            <form className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-40 rounded-full border border-gray-200 px-3 py-1.5 pl-8 text-sm text-gray-700  outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-black dark:text-white bg-slate-100 placeholder:text-gray-700"
              />

              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            </form>

            {/* Dark Mode */}
            <button
              onClick={handleToggleTheme}
              type="button"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {isDarkMode ? (
                <>
                  <Sun className="h-4 w-4 text-yellow-400" />
                  Light
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  Dark
                </>
              )}
            </button>
          </div>

          {/* MOBILE SEARCH */}
          <div className="flex md:hidden">
            <form className="relative w-32">
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-full border border-gray-200 bg-gray-100 px-3 py-1.5 pl-8 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
              />

              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            </form>
          </div>

          {/* PROFILE */}
          <div
            className="relative"
            ref={dropdownRef}
          >
            <button
              type="button"
              onClick={toggleProfileMenu}
              className="flex items-center gap-1 rounded-full focus:outline-none"
              aria-label="Profile menu"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="h-9 w-9 cursor-pointer rounded-full border-2 border-gray-200 object-cover transition-colors duration-200 hover:border-blue-500 dark:border-gray-600 dark:hover:border-blue-400"
              />

              <ChevronDown
                className={`hidden sm:block h-4 w-4 text-gray-600 transition-transform duration-200 dark:text-gray-300 ${isProfileMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {/* DROPDOWN */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-xl dark:border-gray-700 dark:bg-gray-800">

                {/* Mobile Navigation */}
                <div className="border-b border-gray-200 pb-2 dark:border-gray-700 md:hidden">

                  <Link
                    to="/"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Home
                  </Link>

                  <Link
                    to="/blogs"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Blogs
                  </Link>

                  <Link
                    to="/about"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    About Us
                  </Link>

                  <button
                    type="button"
                    onClick={handleToggleTheme}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    {isDarkMode ? (
                      <>
                        <Sun className="mr-2 h-4 w-4 text-yellow-400" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="mr-2 h-4 w-4" />
                        Dark Mode
                      </>
                    )}
                  </button>
                </div>

                {/* Profile */}
                <Link
                  to="/profile"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>

                {/* Sign Out */}
                <button
                  type="button"
                  onClick={handleSignout}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;