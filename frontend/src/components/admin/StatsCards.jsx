import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function StatsCards(){
  const [stats, setStats] = useState({ posts:0, views:0, likes:0, comments:0 });

  useEffect(()=>{
    api.get('/posts').then(res=>{
      const posts = res.data || [];
      const views = posts.reduce((s,p)=>s+(p.views||0),0);
      const likes = posts.reduce((s,p)=>s+(p.likes? p.likes.length : 0),0);
      const comments = posts.reduce((s,p)=>s+(p.comments? p.comments.length : 0),0);
      setStats({ posts: posts.length, views, likes, comments });
    }).catch(()=>{});
  },[]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded shadow">Total Posts<br/><span className="text-2xl font-bold">{stats.posts}</span></div>
      <div className="bg-white p-4 rounded shadow">Total Views<br/><span className="text-2xl font-bold">{stats.views}</span></div>
      <div className="bg-white p-4 rounded shadow">Total Likes<br/><span className="text-2xl font-bold">{stats.likes}</span></div>
      <div className="bg-white p-4 rounded shadow">Total Comments<br/><span className="text-2xl font-bold">{stats.comments}</span></div>
    </div>
  )
}
