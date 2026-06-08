import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar(){
  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-4 font-bold">Admin</div>
      <nav className="p-4 space-y-2">
        <Link to="/admin" className="block p-2 rounded hover:bg-gray-100">Dashboard</Link>
        <Link to="/admin/posts" className="block p-2 rounded hover:bg-gray-100">Posts</Link>
        <Link to="/admin/create" className="block p-2 rounded hover:bg-gray-100">Create Post</Link>
        <Link to="/admin/settings" className="block p-2 rounded hover:bg-gray-100">Settings</Link>
      </nav>
    </aside>
  )
}
