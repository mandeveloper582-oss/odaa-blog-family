import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, adminLogout } from '../../services/firebase';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try{
        const currentUser = await getCurrentUser();
        setUser(currentUser || null);
        setIsAuthenticated(!!currentUser);
      }catch(err){
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const logout = async () => {
    const result = await adminLogout();
    if (result.success) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      toast.success('Logged out successfully');
    } else {
      toast.error('Logout failed');
    }
  };

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    if (userData?.token) localStorage.setItem('token', userData.token);
    toast.success('Logged in successfully');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, logout, login, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};