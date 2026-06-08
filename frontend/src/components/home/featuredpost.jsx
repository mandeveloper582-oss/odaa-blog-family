import { Link } from 'react-router-dom';
import { FiHeart, FiMessageCircle, FiEye } from 'react-icons/fi';

export default function FeaturedPosts({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">⭐ Featured Stories</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our most popular and impactful articles handpicked for you
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map(post => (
            <div key={post._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all">
              <div className="relative h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="flex items-center gap-1"><FiHeart /> {post.likes}</span>
                    <span className="flex items-center gap-1"><FiMessageCircle /> {post.comments?.length || 0}</span>
                    <span className="flex items-center gap-1"><FiEye /> {post.views}</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs text-primary-600 font-semibold mb-2">{post.category}</div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <Link to={`/post/${post._id}`} className="text-primary-500 font-semibold hover:text-primary-600">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}