import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-sm">
          © {new Date().getFullYear()} Form Submission Viewer. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;