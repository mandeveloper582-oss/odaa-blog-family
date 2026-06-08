import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authcontext';
import { HiMenu, HiX, HiSun, HiMoon } from 'react-icons/hi';
import logo from '../../assets/odaa blog logo.jpg';

export default function Header({ darkMode, setDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/blog', label: 'Blog', icon: '📝' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/contact', label: 'Contact', icon: '📧' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img src={logo} alt="ODAA Family Blog logo" className="w-12 h-12 rounded-full shadow-lg" />
            <div>
              <h1 className="text-xl font-bold gradient-text tracking-tight">
                ODAA FAMILY BLOG
              </h1>
              <p className="text-xs uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">Innovate · Educate · Empower</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin/create"
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  ✏️ Write
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <Link
                to="/admin"
                className="px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
              >
                Admin Login
              </Link>
            )}
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <HiSun size={20} /> : <HiMoon size={20} />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            aria-label="Menu"
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div> {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-xl animate-slide-down">
            <div className="flex flex-col p-4 space-y-3">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/admin/create"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg text-center"
                  >
                    ✏️ Write Post
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 bg-secondary-500 text-white rounded-lg text-center"
                >
                  Admin Login
                </Link>
              )}
              
              <button
                onClick={() => {
                  setDarkMode(!darkMode);
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
              >
                {darkMode ? <HiSun size={20} /> : <HiMoon size={20} />}
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}