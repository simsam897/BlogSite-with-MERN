import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">BlogVerse</h2>
            <p className="text-sm text-gray-400 mt-2 max-w-sm">
              Share your thoughts, explore inspiring stories, and connect with
              readers around the world.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6 font-medium">
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>

            <Link to="/blogs" className="hover:text-white transition">
              Blogs
            </Link>

            <Link to="/about" className="hover:text-white transition">
              About
            </Link>

            <Link to="/contact" className="hover:text-white transition">
              Contact
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} BlogVerse. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;