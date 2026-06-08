import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    api.get('/posts').then(res => setPosts(res.data)).catch(console.error);
  }, []);

  const navigate = useNavigate();

  const remove = async (id) => {
    if (!confirm('Delete this post?')) return;
    try{
      await api.delete(`/posts/${id}`);
      setPosts(prev=>prev.filter(p=>p._id !== id));
      toast.success('Post deleted');
    }catch(err){ console.error(err); }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Posts</h1>
          <div className="grid gap-4">
            {posts.map(p => (
              <div key={p._id} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="font-bold">{p.title}</h2>
                    <div className="text-sm text-gray-500">{new Date(p.createdAt).toLocaleString()}</div>
                    <p className="text-sm text-gray-600 mt-2">Likes: {p.likes?.length || 0} Comments: {p.comments?.length || 0} Views: {p.views}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={()=>navigate(`/admin/edit-post/${p._id}`)} className="px-3 py-1 bg-yellow-400 rounded">Edit</button>
                    <button onClick={()=>remove(p._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
