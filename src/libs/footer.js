import React from 'react';
import { FaTwitter, FaDiscord } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-purple-400 text-black py-6 text-center">
      <div className="mb-4">
        <a href="#" className="text-black hover:text-gray-700 mx-4">Home</a>
        <a href="#" className="text-black hover:text-gray-700 mx-4">About</a>
        <a href="#" className="text-black hover:text-gray-700 mx-4">Contact</a>
      </div>
      <div className="mb-4">
        <p>&copy; 2024 IfinityArt. All rights reserved.</p>
      </div>
      <div className="flex justify-center space-x-4">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700">
          <FaTwitter size={24} />
        </a>
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700">
          <FaDiscord size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

