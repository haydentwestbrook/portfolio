import React from 'react';

export const About: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">About Me</h2>
        <div className="prose prose-lg">
          <p>
            I'm a full-stack software engineer with a passion for building modern web applications.
            I specialize in React, TypeScript, and Node.js, with experience in both frontend and backend development.
          </p>
          <p>
            My approach to software development combines technical expertise with a focus on user experience
            and clean, maintainable code. I believe in writing code that is not only functional but also
            easy to understand and extend.
          </p>
          <p>
            When I'm not coding, you can find me exploring new technologies, contributing to open-source
            projects, or sharing my knowledge through technical writing and mentoring.
          </p>
        </div>
      </div>
    </section>
  );
}; 