import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, User, LogOut, Search } from 'lucide-react';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Handle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleProfileMenu = (e) => {
    e.stopPropagation();
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Searching for:', searchQuery);
    setSearchQuery('');
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BlogVerse
            </h1>
          </div>

          {/* Desktop Navigation Links (Hidden on mobile) */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <a
              href="#home"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              Home
            </a>
            <a
              href="#blogs"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              Blogs
            </a>
            <a
              href="#aboutus"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              About Us
            </a>
          </div>

          {/* Desktop Search Bar & Right Section */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {/* Search Bar - Slightly larger on desktop */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-40 px-3 py-1.5 pl-8 pr-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm"
              />
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
            </form>

            {/* Dark Mode Toggle (Desktop) - Reduced space from profile */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-4.5 h-4.5 text-yellow-400" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>

          {/* Mobile Search Bar - Between logo and profile on mobile */}
          <div className="flex-1 md:hidden flex justify-center px-2">
            <form onSubmit={handleSearch} className="relative w-full max-w-[8rem]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-1.5 pl-8 pr-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm"
              />
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
            </form>
          </div>

          {/* Profile Picture - Always visible on all screens */}
          <div className="relative ml-1" ref={dropdownRef}>
            <button
              onClick={toggleProfileMenu}
              className="flex items-center focus:outline-none"
              aria-label="Profile menu"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-gray-200 dark:border-gray-600 cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200"
              />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-50">
                {/* Mobile Navigation Links (Only visible on small screens) */}
                <div className="md:hidden border-b border-gray-200 dark:border-gray-700 pb-2">
                  <a
                    href="#home"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-sm"
                  >
                    Home
                  </a>
                  <a
                    href="#blogs"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-sm"
                  >
                    Blogs
                  </a>
                  <a
                    href="#aboutus"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-sm"
                  >
                    About Us
                  </a>

                  {/* Mobile Dark Mode Toggle */}
                  <button
                    onClick={toggleDarkMode}
                    className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-sm"
                  >
                    {isDarkMode ? (
                      <>
                        <Sun className="w-4 h-4 mr-2 text-yellow-400" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-300" />
                        Dark Mode
                      </>
                    )}
                  </button>
                </div>

                {/* Desktop Dark Mode Toggle (Only visible on large screens) */}
                <div className="hidden md:block border-b border-gray-200 dark:border-gray-700 pb-2">
                  <button
                    onClick={toggleDarkMode}
                    className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-sm"
                  >
                    {isDarkMode ? (
                      <>
                        <Sun className="w-4 h-4 mr-2 text-yellow-400" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-300" />
                        Dark Mode
                      </>
                    )}
                  </button>
                </div>

                {/* Profile and Sign Out Links - Always visible */}
                <a
                  href="#profile"
                  className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-sm"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </a>
                <a
                  href="#signout"
                  className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-sm"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;