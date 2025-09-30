import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="text-xl font-bold cursor-pointer">
          <Link to="/">Brand</Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-sm font-medium">
          <li><Link to="/features" className="hover:text-gray-400">Features</Link></li>
          <li><Link to="/use-cases" className="hover:text-gray-400">Use Cases</Link></li>
          <li><Link to="/sdk" className="hover:text-gray-400">SDK</Link></li>
          <li><Link to="/resources" className="hover:text-gray-400">Resources</Link></li>
          <li><Link to="/docs" className="hover:text-gray-400">Docs</Link></li>
          <li><Link to="/support" className="hover:text-gray-400">Support</Link></li>
          <li><Link to="/pricing" className="hover:text-gray-400">Pricing</Link></li>
        </ul>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Link to="/signin" className="text-sm px-4 py-2 rounded hover:text-gray-400">
            Sign In
          </Link>
          <Link
            to="/signup"
            className="text-sm px-4 py-2 rounded bg-white text-black font-semibold hover:bg-gray-200"
          >
            Try for Free
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
