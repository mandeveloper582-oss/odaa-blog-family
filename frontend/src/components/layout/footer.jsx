import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaTelegram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl animate-float">🌳</span>
              <h3 className="text-xl font-bold">ODAA FAMILY BLOG</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
                ODAA FAMILY BLOG is dedicated to empowering families through technology, interprenership, leadership. We provide insights, tips, and stories to help you navigate the digital world while keeping family values at the core.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><FaFacebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><FaTelegram size={20} /> </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><FaYoutube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-primary-400 transition-colors">Blog</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/blog?category=Technology" className="text-gray-400 hover:text-primary-400 transition-colors">Technology</Link></li>
              <li><Link to="/blog?category=Family" className="text-gray-400 hover:text-primary-400 transition-colors">Family</Link></li>
              <li><Link to="/blog?category=Entrepreneurship" className="text-gray-400 hover:text-primary-400 transition-colors">Entrepreneurship</Link></li>
              <li><Link to="/blog?category=Tutorial" className="text-gray-400 hover:text-primary-400 transition-colors">Tutorials</Link></li>
              <li><Link to="/blog?category=Review" className="text-gray-400 hover:text-primary-400 transition-colors">leadership</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-3">Subscribe and receive the latest family tech stories straight to your phone.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500" />
              <button className="btn-primary text-sm py-3 min-w-[140px]">Subscribe</button>
            </div>
            <p className="text-xs text-gray-500 mt-3">Clean updates, no spam — just the stories that matter.</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} ODAA FAMILY blog. All rights reserved. | Made with ❤️ for families</p>
        </div>
      </div>
    </footer>
  );
}