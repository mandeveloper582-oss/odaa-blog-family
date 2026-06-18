 import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/post/postcard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { getPosts } from '../services/firebase';

export default function Home() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    const result = await getPosts({ limit: 6 });
    if (result.success) {
      setLatestPosts(result.posts.slice(0, 6));
      setFeaturedPosts(result.posts.filter(p => p.isFeatured).slice(0, 3));
    }
    setLoading(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-20 left-10 text-4xl animate-float opacity-30">🚀</div>
        <div className="absolute bottom-20 right-10 text-4xl animate-float delay-150 opacity-30">💻</div>
        <div className="absolute top-1/3 right-1/4 text-3xl animate-float delay-300 opacity-30">📱</div>
        
        <div className="relative container-custom py-24 text-center">
          <div className="inline-block p-4 bg-white/20 rounded-full mb-6 backdrop-blur-sm animate-float">
            <span className="text-5xl">🌳</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to <span className="text-yellow-300">ODAA</span>
            <br />
            FAMILY BLOG
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Empowering families through technology, interprenership,leadership one story at a time
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/blog" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Explore Blog →
            </Link>
            <Link to="/about" className="btn-outline border-white text-white hover:bg-white/10">
              Learn More
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm opacity-90">Articles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-sm opacity-90">Readers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm opacity-90">Authors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="container-custom py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">⭐ Featured Stories</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our most popular and impactful articles handpicked for you
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map(post => <PostCard key={post.id} post={post} />)}
          </div>
        </section>
      )}

      {/* Latest Posts */}
      <section className="container-custom py-16">
        <div className="text-center mb-12">
 <h2 className="text-3xl md:text-4xl font-bold mb-4">📝 Latest Stories</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the latest tech insights and family stories from our community
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map(post => <PostCard key={post._id} post={post} />)}
        </div>
        <div className="text-center mt-12">
          <Link to="/blog" className="btn-secondary">
            View All Posts →
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16">
        <div className="container-custom text-center text-white">
          <div className="max-w-2xl mx-auto">
            <div className="text-5xl mb-4">📧</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-6 opacity-90">
              Get the latest tech tips and family stories delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input type="email" placeholder="Enter your email" className="flex-1 px-5 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white" />
              <button className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all">
                Subscribe →
              </button>
            </div>
            <p className="text-sm mt-4 opacity-75">No spam, unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
}