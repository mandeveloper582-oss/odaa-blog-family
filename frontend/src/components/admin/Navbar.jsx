import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(){
  const [open, setOpen] = useState(false);
  const logout = ()=>{ localStorage.removeItem('token'); window.location.href = '/admin/login'; }
  return (
    <header className="bg-white border-b p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2" onClick={()=>setOpen(true)}>☰</button>
        <div className="font-bold">Odaa Admin</div>
      </div>
      <div className="hidden md:flex items-center gap-3">
        <Link to="/admin/dashboard" className="text-sm text-gray-600">Dashboard</Link>
        <Link to="/admin/posts" className="text-sm text-gray-600">Posts</Link>
        <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden" onClick={()=>setOpen(false)}>
          <div className="bg-white w-64 h-full p-4" onClick={e=>e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold">Admin</div>
              <button onClick={()=>setOpen(false)}>✕</button>
            </div>
            <nav className="flex flex-col gap-2">
              <Link to="/admin/dashboard" onClick={()=>setOpen(false)} className="p-2">Dashboard</Link>
              <Link to="/admin/posts" onClick={()=>setOpen(false)} className="p-2">Posts</Link>
              <Link to="/admin/create-post" onClick={()=>setOpen(false)} className="p-2">Create Post</Link>
              <Link to="/admin/settings" onClick={()=>setOpen(false)} className="p-2">Settings</Link>
              <button onClick={logout} className="mt-4 px-3 py-2 bg-red-500 text-white rounded">Logout</button>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
