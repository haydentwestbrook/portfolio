import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-sm space-y-1">
            <p>© {currentYear} Hayden Westbrook. All rights reserved.</p>
            <p className="text-xs opacity-75">
              This website and its contents are protected by copyright law. 
              Unauthorized use or reproduction of any content is prohibited.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 