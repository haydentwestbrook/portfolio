export const About: React.FC = () => {
  return (
    <section className="py-20 px-6 sm:px-8 lg:px-12 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
            About Me
          </h2>
          <div className="mt-4 h-px w-12 bg-gray-200 dark:bg-gray-700 mx-auto"></div>
        </div>
        <div className="prose prose-base mx-auto text-gray-600 dark:text-gray-400">
          <p className="text-sm leading-relaxed">
            I'm a full-stack software engineer with a passion for building modern web applications.
            I specialize in React, TypeScript, and Node.js, with experience in both frontend and backend development.
          </p>
          <p className="text-sm leading-relaxed">
            My approach to software development combines technical expertise with a focus on user experience
            and clean, maintainable code. I believe in writing code that is not only functional but also
            easy to understand and extend.
          </p>
          <p className="text-sm leading-relaxed">
            When I'm not coding, you can find me exploring new technologies, contributing to open-source
            projects, or sharing my knowledge through technical writing and mentoring.
          </p>
        </div>
      </div>
    </section>
  );
};
