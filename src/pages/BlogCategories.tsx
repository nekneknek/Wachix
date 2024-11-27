import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blog';

const BlogCategories = () => {
  const { category } = useParams();
  
  const filteredPosts = blogPosts.filter(post => 
    post.categories.includes(category || '')
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 capitalize">{category}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link to={`/blog/article/${post.slug}`}>
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex gap-2 mb-2">
                  {post.categories.map((cat) => (
                    <span 
                      key={cat}
                      className="text-xs text-gold-600 bg-gold-50 px-2 py-1 rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <span className="text-gold-600 hover:text-gold-700">Lire la suite →</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogCategories;