import React from 'react';
import type { Section } from './types';

interface DesktopNavigationProps {
  sections: Section[];
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  sections,
  activeSection,
  scrollToSection
}) => {
  return (
    <div className="hidden md:flex space-x-8 items-center">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className={`relative group px-3 py-2 text-sm font-medium transition-all duration-300 ${
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
          <span className="absolute inset-0 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      ))}
    </div>
  );
}; 