import React from 'react';
import { Moon, ShoppingCart } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Moon className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold">Moon Client</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2">Home</a>
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2">Features</a>
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2">Packages</a>
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2">Support</a>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;