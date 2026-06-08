import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        <div className="text-8xl mb-6">🌳</div>
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary inline-flex">
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}