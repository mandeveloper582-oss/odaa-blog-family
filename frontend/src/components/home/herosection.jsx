import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-secondary-600/20 to-transparent"></div>
      <div className="absolute top-20 left-10 text-4xl animate-float opacity-30">🚀</div>
      <div className="absolute bottom-20 right-10 text-4xl animate-float delay-150 opacity-30">💻</div>
      <div className="absolute top-1/3 right-1/4 text-3xl animate-float delay-300 opacity-30">📱</div>
      <div className="absolute bottom-1/3 left-1/4 text-3xl animate-float delay-75 opacity-30">🌐</div>
      
      <div className="container-custom text-center relative z-10 animate-slide-up">
        <div className="inline-block p-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6 shadow-xl">
          <span className="text-5xl animate-float">🌳</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Welcome to{' '}
          <span className="gradient-text">ODAA</span>
          <br />
          <span className="text-gray-800 dark:text-white">FAMILY BLOG</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Empowering families through technology, one story at a time. Join our community of tech-savvy families.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/blog" className="btn-primary">
            Explore Blog →
          </Link>
          <Link to="/about" className="btn-outline">
            Learn More
          </Link>
        </div>
        
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">500+</div>
            <div className="text-sm text-gray-500">Articles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">10K+</div>
            <div className="text-sm text-gray-500">Readers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">50+</div>
            <div className="text-sm text-gray-500">Authors</div>
          </div>
        </div>
      </div>
    </section>
  );
}