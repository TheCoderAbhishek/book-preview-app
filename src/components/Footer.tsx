// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p>
            &copy; {new Date().getFullYear()} AridentRIS™. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-4">
          <a
            href="/about"
            className="hover:text-white transition-colors duration-300"
          >
            About
          </a>
          <a
            href="/contact"
            className="hover:text-white transition-colors duration-300"
          >
            Contact
          </a>
          <a
            href="/privacy"
            className="hover:text-white transition-colors duration-300"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
