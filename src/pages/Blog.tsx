import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: "How to Compress PDF Without Losing Quality",
    excerpt: "Learn the best techniques and tools to reduce your PDF file size while maintaining crystal-clear text and images for professional use.",
    date: "March 1, 2026",
    author: "PDFImage Team",
    category: "Tutorials",
    image: "https://picsum.photos/seed/pdf-compress/800/600"
  },
  {
    id: 2,
    title: "Best Free PDF Tools in 2026",
    excerpt: "A comprehensive guide to the top-rated free PDF utilities available this year, focusing on privacy, speed, and ease of use.",
    date: "February 25, 2026",
    author: "Digital Productivity",
    category: "Reviews",
    image: "https://picsum.photos/seed/pdf-tools/800/600"
  },
  {
    id: 3,
    title: "How to Convert Images to PDF Easily",
    excerpt: "Step-by-step instructions on how to quickly turn your JPG, PNG, and other image files into high-quality PDF documents directly in your browser.",
    date: "February 20, 2026",
    author: "Tech Tips",
    category: "Guides",
    image: "https://picsum.photos/seed/image-pdf/800/600"
  }
];

export const Blog = () => {
  return (
    <div className="pt-32 pb-20 max-w-6xl mx-auto px-4 sm:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent-purple to-accent-blue tracking-tight">
          Welcome to PDFImage Online Blog
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed mx-auto">
          Stay updated with the latest tips, tutorials, and news about PDF management, 
          digital productivity, and data privacy.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card overflow-hidden group hover:border-white/20 transition-all flex flex-col h-full"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-accent-purple/90 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow text-center items-center">
              <div className="flex items-center text-slate-500 text-xs mb-4 space-x-4 justify-center">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <User className="w-3 h-3 mr-1" />
                  {post.author}
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-accent-purple transition-colors">
                {post.title}
              </h2>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                {post.excerpt}
              </p>
              
              <Link 
                to="#" 
                className="inline-flex items-center text-accent-purple font-bold text-sm group/link justify-center"
              >
                Read More
                <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};
