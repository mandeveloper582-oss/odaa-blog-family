import { Link } from 'react-router-dom';
import { FiHeart, FiMessageCircle, FiEye } from 'react-icons/fi';
export default function PostCard({ post }) {
  return (
    <div className="card group animate-fade-in">
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
            {post.category}
          </span>
        </div>
        <img 
          src={post.imageUrl || post.image || 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&w=1200&h=400&fit=crop'} 
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {post.content.substring(0, 120)}...
        </p>
        <div className="flex items-center justify-between">
          <Link to={`/post/${post._id}`} className="text-primary-500 font-semibold hover:text-primary-600 transition-colors flex items-center gap-1">
            Read More <span>→</span>
          </Link>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><FiHeart /> {Array.isArray(post.likes) ? post.likes.length : post.likes || 0}</span>
            <span className="flex items-center gap-1"><FiMessageCircle /> {post.comments?.length || 0}</span>
            <span className="flex items-center gap-1"><FiEye /> {post.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
}