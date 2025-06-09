import React from 'react';
import type { BlogPost } from '../../types/Blog';

export interface BlogListProps {
  posts: BlogPost[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <ul className="space-y-4">
      {posts.map(post => (
        <li key={post.slug} className="border-b pb-4">
          <a href={`/blog/${post.slug}/`} className="block hover:underline">
            <strong className="text-xl">{post.data.title}</strong>
          </a>
          <p className="text-gray-600 mt-2">{post.data.description}</p>
          <small className="text-gray-500">{post.data.pubDate} by {post.data.author}</small>
        </li>
      ))}
    </ul>
  );
};

export { BlogList };