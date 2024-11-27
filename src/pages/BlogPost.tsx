import React from 'react';
import { useParams } from 'react-router-dom';
import { blogPosts } from '../data/blog';
import { Calendar, User, Tag } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return <div>Article non trouvé</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <article>
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />
        
        <div className="flex items-center gap-6 text-gray-500 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span>{post.author}</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
        
        <div className="flex gap-2 mb-8">
          {post.categories.map((category) => (
            <span 
              key={category}
              className="flex items-center gap-1 text-sm text-gold-600 bg-gold-50 px-3 py-1 rounded-full"
            >
              <Tag className="h-4 w-4" />
              {category}
            </span>
          ))}
        </div>

        <div className="prose prose-lg max-w-none">
          {post.content}
        </div>
      </article>
    </div>
  );
};

export default BlogPost;