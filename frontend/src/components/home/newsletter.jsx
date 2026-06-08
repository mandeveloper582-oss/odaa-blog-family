import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    setSubscribing(true);
    setTimeout(() => {
      toast.success('Subscribed successfully! 🎉');
      setEmail('');
      setSubscribing(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
      <div className="container-custom text-center text-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-4">📧</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-6 opacity-90">
            Get the latest tech tips, family stories, and exclusive content delivered to your inbox
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button type="submit" disabled={subscribing} className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all disabled:opacity-50">
              {subscribing ? 'Subscribing...' : 'Subscribe →'}
            </button>
          </form>
          <p className="text-sm mt-4 opacity-75">No spam, unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}