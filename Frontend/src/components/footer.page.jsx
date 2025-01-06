import React from 'react'; 
import { Link } from 'react-router-dom';
import logo from '../imgs/logo.png'; // Assuming you have a logo to include

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-10 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul>
              <li className="mb-2">
                <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-gray-400 hover:text-white">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/editor" className="text-gray-400 hover:text-white">Write a Blog</Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <i className="fi fi-brands-facebook text-2xl"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <i className="fi fi-brands-twitter text-2xl"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <i className="fi fi-brands-instagram text-2xl"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <i className="fi fi-brands-linkedin text-2xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Your Blog Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
