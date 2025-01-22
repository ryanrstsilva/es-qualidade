import React from 'react';

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and nav items */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">Portal</span>
            </div>
            
            {/* Navigation items */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
                Feed
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
                Library
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
                Suggest
              </a>
            </div>
          </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center">
            <button className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
              Sign In
            </button>
            <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;