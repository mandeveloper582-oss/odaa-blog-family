import React, { useState } from 'react';
import api from '../../services/api';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = async (e)=>{
    e.preventDefault();
    try{
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/admin';
    }catch(err){
      alert('Login failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        <input className="w-full p-2 border rounded mb-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input type="password" className="w-full p-2 border rounded mb-4" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <button className="w-full py-2 bg-blue-600 text-white rounded">Login</button>
      </form>
    </div>
  )
}
