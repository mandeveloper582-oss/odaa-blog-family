import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostCard from '../components/post/postcard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { getPosts } from '../services/firebase';
import { FiSearch } from 'react-icons/fi';

const categories = [
  { id: 'all', name: 'All', icon: '📚' },
  { id: 'Technology', name: 'Technology', icon: '💻' },
  { id: 'Family', name: 'Family', icon: '👨‍👩‍👧‍👦' },
  { id: 'Tutorial', name: 'Tutorial', icon: '📖' },
  { id: 'interprenership', name: 'interprenership', icon: '📰' },
  { id: 'leadership', name: 'leadership', icon: '⭐' },
];

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPosts();
  }, [activeCategory]);

  const loadPosts = async () => {
    setLoading(true);
    const filters = activeCategory !== 'all' ? { category: activeCategory } : {};
    const result = await getPosts(filters);
    if (result.success) {
      let filtered = result.posts;
      if (searchTerm) {
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setPosts(filtered);
    }
    setLoading(false);
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setSearchParams({ category: categoryId === 'all' ? '' : categoryId });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadPosts();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container-custom py-12 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Our Blog</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Explore our collection of articles about technology, family, interprenership, leadership, and digital life
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-12"
          />
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </form>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-5 py-2 rounded-full font-semibold transition-all flex items-center gap-2 ${
              activeCategory === cat.id
                ? 'bg-primary-500 text-white shadow-lg scale-105'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-center mb-6 text-gray-500">
        Found {posts.length} article{posts.length !== 1 ? 's' : ''}
      </div>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-500 text-lg">No posts found. Try a different search or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => <PostCard key={post._id} post={post} />)}
        </div>
      )}
    </div>
  );
}