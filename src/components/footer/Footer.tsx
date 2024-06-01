// components/Footer.js
import React from 'react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white shadow-md mt-8">
      <div className="container mx-auto p-4 flex flex-col items-center space-y-4">
        <p className="text-center">
          Thank you for visiting our website. We hope you have a wonderful experience!
        </p>
        <a href="https://github.com/Pravin1616" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-gray-400">
          <GitHubLogoIcon className="w-6 h-6" />
        </a>
        <p className="text-sm">&copy; 2024 Ease My CV. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
