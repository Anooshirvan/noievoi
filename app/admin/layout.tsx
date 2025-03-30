import React from 'react';
import { Metadata } from 'next';
import AdminNavbar from '../components/admin/AdminNavbar';
import AdminSidebar from '../components/admin/AdminSidebar';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Noievoi Industrial',
  description: 'Content management for Noievoi Industrial website',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="flex pt-16">
        <AdminSidebar />
        <div className="flex-1 lg:ml-64">
          <main className="p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 