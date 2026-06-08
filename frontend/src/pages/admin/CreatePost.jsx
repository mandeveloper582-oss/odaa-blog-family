import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      const form = new FormData();
      form.append('title', title);
      form.append('content', content);
      if (image) form.append('image', image);
      await api.post('/posts', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      setTitle(''); setContent(''); setImage(null);
      toast.success('Post created');
      navigate('/admin/posts');
    }catch(err){
      console.error(err);
    }finally{ setLoading(false); }
  };

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Create Post</h1>
          <form onSubmit={submit} className="space-y-4 max-w-2xl">
            <input className="w-full p-2 border rounded" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title"/>
            <textarea className="w-full p-2 border rounded" value={content} onChange={e=>setContent(e.target.value)} placeholder="Content" rows={8}></textarea>
            <input type="file" onChange={e=>setImage(e.target.files[0])} />
            <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading? 'Creating...' : 'Create'}</button>
          </form>
        </main>
      </div>
    </div>
  );
}
