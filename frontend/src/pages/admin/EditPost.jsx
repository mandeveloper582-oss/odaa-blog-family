import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import api from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function EditPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  useEffect(()=>{
    api.get(`/posts/${id}`).then(r=>{setPost(r.data); setTitle(r.data.title); setContent(r.data.content)}).catch(console.error)
  },[id]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      // support optional image
      const form = new FormData();
      form.append('title', title);
      form.append('content', content);
      if (image) form.append('image', image);
      await api.put(`/posts/${id}`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Post updated');
      navigate('/admin/posts');
    }catch(err){
      console.error(err);
    }finally{ setLoading(false); }
  };

  const [image, setImage] = useState(null);

  if (!post) return <div className="min-h-screen flex"><Sidebar /><div className="flex-1"><Navbar /><main className="p-6">Loading...</main></div></div>

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Edit Post</h1>
          <form onSubmit={submit} className="space-y-4 max-w-2xl">
            <input className="w-full p-2 border rounded" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title"/>
            <textarea className="w-full p-2 border rounded" value={content} onChange={e=>setContent(e.target.value)} placeholder="Content" rows={8}></textarea>
            <input type="file" onChange={e=>setImage(e.target.files[0])} />
            <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading? 'Updating...' : 'Update'}</button>
          </form>
        </main>
      </div>
    </div>
  );
}
