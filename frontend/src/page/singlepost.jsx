import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiHeart, FiArrowLeft, FiShare2 } from 'react-icons/fi';
import CommentSection from '../components/Post/CommentSection';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { getPost, likePost, incrementViews } from '../services/firebase';
import toast from 'react-hot-toast';
import moment from 'moment';

export default function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    setLoading(true);
    const result = await getPost(id);
    if (result.success) {
      setPost(result.post);
      setLikesCount(Array.isArray(result.post.likes) ? result.post.likes.length : result.post.likes || 0);
    }
    setLoading(false);
  };

  const handleLike = async () => {
    if (!liked) {
      const result = await likePost(id);
      if (result.success) {
        setLikesCount(result.likes);
        setLiked(true);
        toast.success('You liked this post!');
      }
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  if (loading) return <LoadingSpinner />;
  if (!post) return <div className="container-custom py-16 text-center">Post not found</div>;

  return (
    <div className="container-custom py-12 animate-fade-in">
      {/* Back Button */}
      <button onClick={() => navigate('/blog')} className="flex items-center gap-2 text-gray-500 hover:text-primary-500 mb-6 transition-colors">
        <FiArrowLeft /> Back to Blog
      </button>

      {/* Post Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="relative h-96">
          <img src={post.imageUrl || post.image || 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&w=1200&h=400&fit=crop'} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-primary-500 rounded-full text-sm font-semibold">{post.category}</span>
              <span className="text-sm opacity-90">📅 {moment(post.createdAt?.toDate()).format('MMMM DD, YYYY')}</span>
              <span className="text-sm opacity-90">✍️ {post.author || 'ODAA Admin'}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-6 text-sm">
              <span>❤️ {likesCount} likes</span>
              <span>💬 {post.comments?.length || 0} comments</span>
              <span>👁️ {(post.views || 0) + 1} views</span>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="p-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          )}
 {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex gap-4">
            <button
              onClick={handleLike}
              disabled={liked}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                liked 
                  ? 'bg-red-500 text-white cursor-default' 
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-red-500 hover:text-white'
              }`}
            >
              <FiHeart className={liked ? 'fill-white' : ''} /> {liked ? 'Liked' : 'Like'} ({likesCount})
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gray-100 dark:bg-gray-700 hover:bg-primary-500 hover:text-white transition-all"
            >
              <FiShare2 /> Share
            </button>
          </div>

          {/* Comments Section */}
          <CommentSection postId={id} />
        </div>
      </div>
    </div>
  );
}