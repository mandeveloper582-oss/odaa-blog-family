import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDarkMode } from './hooks/useDarkMode';
import Layout from './components/layout/layout';
import { AuthProvider } from './components/contexts/authcontext';
import Home from './page/home';
import Blog from './page/blog';
import SinglePost from './page/singlepost';
import About from './page/about';
import AdminIndex from './pages/admin/Index';
import CreatePost from './page/createpost';
import EditPost from './page/editpost';
import Contact from './page/contact';
import NotFound from './page/notfound';
// firebase removed; using custom API
import AdminDashboard from './pages/admin/Dashboard';
import AdminPosts from './pages/admin/Posts';
import AdminCreate from './pages/admin/CreatePost';
import AdminEdit from './pages/admin/EditPost';
import AdminLoginPage from './pages/admin/Login';
import AdminSettings from './pages/admin/Settings';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <AuthProvider>
    <BrowserRouter>
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
          <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/post/:id" element={<SinglePost />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminIndex />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/posts" element={<ProtectedRoute><AdminPosts /></ProtectedRoute>} />
              <Route path="/admin/create-post" element={<ProtectedRoute><AdminCreate /></ProtectedRoute>} />
              <Route path="/admin/edit-post/:id" element={<ProtectedRoute><AdminEdit /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </div>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: darkMode ? '#1f2937' : '#fff',
              color: darkMode ? '#fff' : '#1f2937',
              borderRadius: '12px',
            },
          }}
        />
      </div>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;