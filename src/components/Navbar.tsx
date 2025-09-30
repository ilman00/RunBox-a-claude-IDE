import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="text-xl font-bold cursor-pointer z-50">
          <Link to="/">
            <img src="/images/logo.png" alt="" style={{ width: "50px" }} />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-sm font-medium">
          <li><Link to="/features" className="hover:text-gray-400">Features</Link></li>
          <li><Link to="/use-cases" className="hover:text-gray-400">Use Cases</Link></li>
          <li><Link to="/sdk" className="hover:text-gray-400">SDK</Link></li>
          <li><Link to="/resources" className="hover:text-gray-400">Resources</Link></li>
          <li><Link to="/docs" className="hover:text-gray-400">Docs</Link></li>
          <li><Link to="/support" className="hover:text-gray-400">Support</Link></li>
          <li><Link to="/pricing" className="hover:text-gray-400">Pricing</Link></li>
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
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

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden z-50 p-2 hover:bg-gray-900 rounded"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-black z-40 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          {/* Mobile Navigation Links */}
          <ul className="flex flex-col space-y-6 text-lg font-medium">
            <li>
              <Link to="/features" className="hover:text-gray-400" onClick={closeMenu}>
                Features
              </Link>
            </li>
            <li>
              <Link to="/use-cases" className="hover:text-gray-400" onClick={closeMenu}>
                Use Cases
              </Link>
            </li>
            <li>
              <Link to="/sdk" className="hover:text-gray-400" onClick={closeMenu}>
                SDK
              </Link>
            </li>
            <li>
              <Link to="/resources" className="hover:text-gray-400" onClick={closeMenu}>
                Resources
              </Link>
            </li>
            <li>
              <Link to="/docs" className="hover:text-gray-400" onClick={closeMenu}>
                Docs
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-gray-400" onClick={closeMenu}>
                Support
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-gray-400" onClick={closeMenu}>
                Pricing
              </Link>
            </li>
          </ul>

          {/* Mobile Actions */}
          <div className="flex flex-col space-y-4 mt-8">
            <Link
              to="/signin"
              className="text-center text-sm px-4 py-3 rounded border border-gray-700 hover:bg-gray-900"
              onClick={closeMenu}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-center text-sm px-4 py-3 rounded bg-white text-black font-semibold hover:bg-gray-200"
              onClick={closeMenu}
            >
              Try for Free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;