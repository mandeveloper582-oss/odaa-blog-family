import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/contexts/authcontext';
import { adminLogin } from '../services/firebase';
import toast from 'react-hot-toast';

export default function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const result = await adminLogin(email, password);
      if (result?.token) {
        login({ email });
        localStorage.setItem('token', result.token);
        navigate('/admin/create');
      } else {
        toast.error(result.error || 'Invalid credentials');
      }
    }catch(err){
      toast.error('Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-fade-in">
        <div className="text-center">
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="text-3xl font-bold gradient-text">Admin Login</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Enter your Firebase credentials to access dashboard
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="galataaomer@gmail.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </form>
        
        <div className="text-center text-sm text-gray-500">
          <p>Sign in with your registered admin email and password</p>
        </div>
      </div>
    </div>
  );
}