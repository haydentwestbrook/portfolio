import { useState } from 'react';

interface ToggleProps {
  onChange: (isGrid: boolean) => void;
  initialValue?: boolean;
  className?: string;
}

export default function Toggle({ onChange, initialValue = true, className = '' }: ToggleProps) {
  const [isGrid, setIsGrid] = useState(initialValue);

  const handleToggle = () => {
    const newValue = !isGrid;
    setIsGrid(newValue);
    onChange(newValue);
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        isGrid ? 'bg-primary' : 'bg-gray-200'
      } ${className}`}
      aria-label={`Switch to ${isGrid ? 'carousel' : 'grid'} view`}
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
          isGrid ? 'translate-x-8' : 'translate-x-1'
        }`}
      >
        <div className="flex h-full w-full items-center justify-center">
          {isGrid ? (
            <svg
              className="h-4 w-4 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          ) : (
            <svg
              className="h-4 w-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          )}
        </div>
      </span>
    </button>
  );
} 