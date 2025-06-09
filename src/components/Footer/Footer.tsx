import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Hayden Westbrook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}; 