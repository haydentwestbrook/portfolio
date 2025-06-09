import React from 'react';
import type { Section } from './types';

interface MobileNavigationProps {
  sections: Section[];
  activeSection: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  scrollToSection: (id: string) => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  sections,
  activeSection,
  isMenuOpen,
  setIsMenuOpen,
  scrollToSection
}) => {
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 rounded-md text-gray-500 hover:text-primary hover:bg-primary/5 focus:outline-none"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isMenuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-white/95 backdrop-blur-sm z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`relative group px-6 py-3 text-lg font-medium transition-all duration-300 ${
                activeSection === id
                  ? 'text-primary scale-110'
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              <span className="relative">
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                {activeSection === id && (
                  <>
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary" />
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  </>
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}; 