import React, { useState } from 'react';

const CategoryExplore = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Sample categories with icons and counts
  const categories = [
    {
      id: 1,
      name: 'All',
      icon: '🔥',
      count: 156,
      color: 'from-gray-400 to-gray-600'
    },
    {
      id: 2,
      name: 'Technology',
      icon: '💻',
      count: 42,
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 3,
      name: 'Health',
      icon: '💪',
      count: 28,
      color: 'from-green-400 to-green-600'
    },
    {
      id: 4,
      name: 'Travel',
      icon: '✈️',
      count: 35,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 5,
      name: 'Food',
      icon: '🍳',
      count: 19,
      color: 'from-red-400 to-red-600'
    },
    {
      id: 6,
      name: 'Lifestyle',
      icon: '🌿',
      count: 23,
      color: 'from-emerald-400 to-teal-600'
    },
    {
      id: 7,
      name: 'Coding',
      icon: '👨‍💻',
      count: 31,
      color: 'from-purple-400 to-purple-700'
    },
    {
      id: 8,
      name: 'Business',
      icon: '📊',
      count: 17,
      color: 'from-indigo-400 to-indigo-600'
    },
    {
      id: 9,
      name: 'Science',
      icon: '🔬',
      count: 14,
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      id: 10,
      name: 'Education',
      icon: '📚',
      count: 21,
      color: 'from-amber-400 to-amber-600'
    }
  ];

  // Sample blog cards for each category (for demonstration)
  const getCategoryBlogs = (category) => {
    // This would be replaced with actual API call
    return [
      { id: 1, title: `${category} Blog 1`, author: 'John Doe', date: 'Aug 10, 2026' },
      { id: 2, title: `${category} Blog 2`, author: 'Jane Smith', date: 'Aug 8, 2026' },
      { id: 3, title: `${category} Blog 3`, author: 'Mike Johnson', date: 'Aug 5, 2026' },
    ];
  };

  const filteredBlogs = activeCategory === 'All'
    ? getCategoryBlogs('Featured')
    : getCategoryBlogs(activeCategory);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          Explore Categories
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl mx-auto">
          Discover blogs by topic and find content that matters to you
        </p>
      </div>

      {/* Categories Pills - Horizontal Scroll */}
      <div className="relative">
        <div className="overflow-x-auto pb-4 hide-scrollbar -mx-4 sm:mx-0">
          <div className="flex gap-2 sm:gap-3 px-4 sm:px-0 min-w-max">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.name)}
                className={`
                  flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full 
                  text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300
                  ${activeCategory === category.name
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-${category.color.split(' ')[1]}/30 scale-105`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                  }
                `}
              >
                <span className="text-base sm:text-lg">{category.icon}</span>
                <span>{category.name}</span>
                <span className={`
                  ml-0.5 text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full
                  ${activeCategory === category.name
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Gradient fade on edges for desktop */}
        <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>

      {/* Mobile Scroll Hint */}
      <div className="text-center mt-3 sm:hidden">
        <span className="text-xs text-gray-400">← Scroll to see more categories →</span>
      </div>

      {/* Category Grid Display (Shows blogs in selected category) */}
      <div className="mt-8 sm:mt-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            {activeCategory === 'All' ? 'Featured Blogs' : `${activeCategory} Blogs`}
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-5 border border-gray-100"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    by {blog.author}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {blog.date}
                  </p>
                </div>
                <span className="text-gray-300">📄</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Categories Section (Alternative Layout) */}
      <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-gray-200">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-6 sm:mb-8">
          Popular Categories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.slice(1, 6).map((category) => (
            <div
              key={category.id}
              onClick={() => setActiveCategory(category.name)}
              className={`
                group cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl 
                transition-all duration-300 p-4 sm:p-5 text-center border-2
                ${activeCategory === category.name
                  ? `border-${category.color.split(' ')[1]} bg-gradient-to-br ${category.color} text-white`
                  : 'border-transparent hover:border-gray-200'
                }
              `}
            >
              <div className={`
                text-3xl sm:text-4xl mb-2 transition-transform duration-300
                ${activeCategory === category.name ? 'scale-110' : 'group-hover:scale-110'}
              `}>
                {category.icon}
              </div>
              <p className={`
                text-sm sm:text-base font-semibold
                ${activeCategory === category.name ? 'text-white' : 'text-gray-800'}
              `}>
                {category.name}
              </p>
              <p className={`
                text-xs sm:text-sm
                ${activeCategory === category.name ? 'text-white/80' : 'text-gray-500'}
              `}>
                {category.count} blogs
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        /* Custom scrollbar for category pills */
        .categories-scroll::-webkit-scrollbar {
          height: 4px;
        }
        .categories-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .categories-scroll::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .categories-scroll::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default CategoryExplore;