import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, ArrowLeft, Sparkles, Utensils, Flame, BookOpen, CheckCircle2 } from 'lucide-react';
import { fetchBlogBySlug } from '../services/api';
import { mockProducts } from '../data/mockData';
import { ProductCard } from '../components/product/ProductCard';

export const BlogDetailsPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadBlog = async () => {
      setLoading(true);
      const data = await fetchBlogBySlug(slug);
      if (isMounted) {
        setBlog(data);
        setLoading(false);
      }
    };
    loadBlog();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-xs font-bold text-gray-400">Loading recipe & culinary story...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="font-heritage text-2xl font-bold text-gray-900">Article Not Found</h2>
        <Link to="/blog" className="text-xs font-bold text-[#F28C28] underline mt-2 block">
          Back to Journal
        </Link>
      </div>
    );
  }

  const relatedProducts = mockProducts.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#F28C28]">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Recipe Journal</span>
      </Link>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-[#2E7D32] uppercase tracking-wider bg-[#E8F5E9] px-3 py-1 rounded-full">
            {blog.category}
          </span>
          <span className="text-xs font-bold text-[#F28C28] uppercase tracking-wider bg-[#FFF3E0] px-3 py-1 rounded-full">
            Heritage Recipe
          </span>
        </div>

        <h1 className="font-heritage text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-semibold pt-1 border-b border-gray-100 pb-4">
          <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-[#F28C28]" /> {blog.author}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#2E7D32]" /> {blog.readTime}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-[#F28C28]" /> Woodfire Tradition</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="aspect-video rounded-3xl overflow-hidden shadow-lg border border-gray-100 relative">
        <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
      </div>

      {/* Recipe Quick Stats Box */}
      <div className="bg-[#FFF3E0] p-6 rounded-3xl border border-[#F28C28]/30 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Prep Time</span>
          <span className="font-extrabold text-gray-900 text-sm sm:text-base">{blog.prepTime || '20 Mins'}</span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Cook Time</span>
          <span className="font-extrabold text-gray-900 text-sm sm:text-base">{blog.cookTime || '25 Mins'}</span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Skill Level</span>
          <span className="font-extrabold text-[#2E7D32] text-sm sm:text-base">{blog.difficulty || 'Medium'}</span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Flavor Profile</span>
          <span className="font-extrabold text-[#F28C28] text-sm sm:text-base">Spicy & Crisp</span>
        </div>
      </div>

      {/* Article Markdown Body */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 space-y-6 shadow-xs leading-relaxed text-sm sm:text-base text-gray-800 font-normal">
        <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }} />
      </div>

      {/* BLOG -> PRODUCT FUNNEL CONVERSION SECTION */}
      <div className="bg-gradient-to-r from-[#FFF3E0] to-[#FFF8F0] p-6 sm:p-8 rounded-3xl border border-[#F28C28]/30 space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#F28C28]" />
          <h3 className="font-heritage text-2xl font-bold text-gray-900">Bring These Heritage Flavours Home</h3>
        </div>
        <p className="text-xs text-gray-600">
          Crafted in small artisanal woodfire batches with zero artificial colors or preservatives. Shop directly below:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
