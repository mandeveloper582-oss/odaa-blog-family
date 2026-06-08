 import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost, uploadImage } from '../services/firebase';
import { useAuth } from '../components/contexts/authcontext';
import toast from 'react-hot-toast';

const categories = ['Technology', 'Family', 'Tutorial', 'interprenership', 'Review'];

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Technology');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/admin');
    return null;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in title and content');
      return;
    }

    setLoading(true);

    const postData = {
      title: title.trim(),
      content: content.trim(),
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      isFeatured,
      author: 'ODAA Admin',
    };

    const result = await createPost(postData, image);
    
    if (result.success) {
      toast.success('Post created successfully!');
      navigate('/blog');
    } else {
      toast.error('Failed to create post');
    }
    setLoading(false);
  };

  return (
    <div className="container-custom py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-6 gradient-text">Create New Post</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field"
                placeholder="Enter post title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="input-field"
                placeholder="React, JavaScript, Web Development"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Featured Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
 />
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Preview" className="h-48 w-full object-cover rounded-lg" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
              />
              <label htmlFor="featured" className="text-sm font-medium">Feature this post</label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content *</label>
              <textarea
                rows="12"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="input-field resize-none"
                placeholder="Write your post content here..."
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/blog')}
                className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                {loading ? 'Publishing...' : '📝 Publish Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}