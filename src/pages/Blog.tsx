import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import BlogNav from '../components/BlogNav';
import { blogPosts } from '../data/blog';

const Blog = () => {
  // Trier les articles par date (du plus récent au plus ancien)
  const sortedPosts = [...blogPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Notre Blog</h1>
      
      <BlogNav />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link to={`/blog/article/${post.slug}`}>
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex gap-2 mb-2">
                  {post.categories.map((category) => (
                    <span 
                      key={category}
                      className="text-xs text-gold-600 bg-gold-50 px-2 py-1 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  {post.date}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;