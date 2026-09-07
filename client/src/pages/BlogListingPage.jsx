import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { fetchBlogs } from '../services/api';

export const BlogListingPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadBlogs = async () => {
      setLoading(true);
      const data = await fetchBlogs();
      if (isMounted) {
        setBlogs(data);
        setLoading(false);
      }
    };
    loadBlogs();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="bg-gradient-to-r from-[#FFF3E0] to-[#FFF8F0] p-8 rounded-3xl border border-[#F28C28]/20 text-center space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F28C28] uppercase tracking-widest bg-white px-3 py-1 rounded-full">
          <BookOpen className="w-4 h-4" />
          <span>Culinary Heritage Journal</span>
        </div>
        <h1 className="font-heritage text-3xl sm:text-5xl font-extrabold text-gray-900">
          Maharashtrian Recipes & Food Stories
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
          Explore authentic recipes, grain roasting traditions, millet superfoods, and regional food culture.
        </p>
      </div>

      {loading ? (
        <p className="text-xs font-bold text-gray-400 text-center">Loading articles...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-bold">
                    <span className="text-[#2E7D32] uppercase">{blog.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {blog.readTime}</span>
                  </div>
                  <h2 className="font-heritage text-xl font-bold text-gray-900 group-hover:text-[#F28C28] transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">{blog.excerpt}</p>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-semibold">By {blog.author || 'Naik Foods Team'}</span>
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="text-xs font-bold text-[#F28C28] hover:text-[#E07B18] flex items-center gap-1"
                  >
                    <span>Read Recipe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
