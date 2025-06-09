import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <p className="text-gray-700 text-sm font-medium">
            © {currentYear} Hayden Westbrook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}; 