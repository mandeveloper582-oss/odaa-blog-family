import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import StatsCards from '../../components/admin/StatsCards';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
          <StatsCards />
        </main>
      </div>
    </div>
  );
}
