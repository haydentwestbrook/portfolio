import React from 'react';
import { ProfileImage } from '../ProfileImage/ProfileImage';
import type { ImageMetadata } from 'astro';

interface HeroProps {
  imageUrl: ImageMetadata;
  name: string;
  title: string;
}

export const Hero: React.FC<HeroProps> = ({ imageUrl, name, title }) => {
  return (
    <section 
      id="hero" 
      className="relative min-h-[calc(100vh-4rem)] w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mb-8 aspect-square rounded-full overflow-hidden shadow-2xl ring-4 ring-white ring-offset-4 ring-offset-gray-50">
          <ProfileImage
            imageUrl={imageUrl}
            altText={`${name}'s profile picture`}
          />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900">
          {name}
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl">
          {title}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="/blog"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-full transition-all duration-200"
          >
            <svg
              className="h-4 w-4 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Blog
          </a>
          <a
            href="https://github.com/haydenwestbrook"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200"
          >
            <svg
              className="h-4 w-4 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/haydenwestbrook"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-full transition-all duration-200"
          >
            <svg
              className="h-4 w-4 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}; 