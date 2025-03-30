'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FiUsers, FiFolder, FiMessageSquare, FiEdit, 
  FiSettings, FiLogOut, FiPieChart, FiClock 
} from 'react-icons/fi';

// Dashboard widget component
const DashboardWidget = ({ 
  title, 
  value, 
  icon: Icon, 
  bgColor = 'bg-primary', 
  path,
  implemented = true
}: { 
  title: string; 
  value: number; 
  icon: any; 
  bgColor?: string; 
  path: string;
  implemented?: boolean;
}) => (
  <Link href={path} className={`block ${!implemented ? 'opacity-70 cursor-not-allowed' : ''}`} onClick={(e) => !implemented && e.preventDefault()}>
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className={`${bgColor} p-3 rounded-full text-white mr-4`}>
          <Icon size={24} />
        </div>
        <div>
          <p className="text-gray-500 text-sm uppercase font-medium">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          {!implemented && <span className="text-xs text-gray-500 mt-1 block">Coming Soon</span>}
        </div>
      </div>
    </div>
  </Link>
);

// Recent activity card component
const RecentActivityCard = ({
  type,
  user,
  target,
  date,
  message
}: {
  type: 'create' | 'update' | 'delete';
  user: string;
  target: string;
  date: string;
  message: string;
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'create':
        return { color: 'text-green-600', bg: 'bg-green-100' };
      case 'update':
        return { color: 'text-blue-600', bg: 'bg-blue-100' };
      case 'delete':
        return { color: 'text-red-600', bg: 'bg-red-100' };
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-100' };
    }
  };
  
  const styles = getTypeStyles();
  
  return (
    <div className="p-4 border-b border-gray-200 last:border-b-0">
      <div className="flex items-start">
        <div className={`${styles.bg} p-2 rounded-full ${styles.color} mr-3 mt-1`}>
          {type === 'create' && <FiUsers size={16} />}
          {type === 'update' && <FiEdit size={16} />}
          {type === 'delete' && <FiMessageSquare size={16} />}
        </div>
        <div>
          <p className="text-sm text-gray-900">
            <span className="font-medium">{user}</span>
            {type === 'create' && ' added '}
            {type === 'update' && ' updated '}
            {type === 'delete' && ' removed '}
            <span className="font-medium">{target}</span>
          </p>
          <p className="text-sm text-gray-600 mt-1">{message}</p>
          <p className="text-xs text-gray-500 mt-1">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for statistics
  const stats = {
    teamMembers: 8,
    projects: 24,
    services: 6,
    messages: 15,
    pendingEdits: 3,
    siteConfig: 1
  };
  
  // Mock data for recent activities
  const recentActivities = [
    {
      type: 'create' as const,
      user: 'Admin',
      target: 'new team member',
      date: '2 hours ago',
      message: 'Added Sarah Johnson as Director of European Operations'
    },
    {
      type: 'update' as const,
      user: 'Admin',
      target: 'project details',
      date: '3 hours ago',
      message: 'Updated completion date for Lagos Port Expansion'
    },
    {
      type: 'delete' as const,
      user: 'Admin',
      target: 'contact message',
      date: '5 hours ago',
      message: 'Removed spam message from contact form'
    },
    {
      type: 'update' as const,
      user: 'Admin',
      target: 'service description',
      date: '1 day ago',
      message: 'Revised the description for Industrial Automation services'
    }
  ];
  
  // Check if user is authenticated
  useEffect(() => {
    const adminAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!adminAuthenticated || adminAuthenticated !== 'true') {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);
  
  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    router.push('/admin');
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            <FiLogOut className="mr-2" /> Logout
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Section */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardWidget 
              title="Team Members" 
              value={stats.teamMembers} 
              icon={FiUsers} 
              path="/admin/team" 
            />
            <DashboardWidget 
              title="Projects" 
              value={stats.projects} 
              icon={FiFolder} 
              bgColor="bg-blue-500" 
              path="/admin/projects" 
              implemented={true}
            />
            <DashboardWidget 
              title="Services" 
              value={stats.services} 
              icon={FiSettings} 
              bgColor="bg-green-500" 
              path="/admin/services" 
            />
            <DashboardWidget 
              title="Messages" 
              value={stats.messages} 
              icon={FiMessageSquare} 
              bgColor="bg-yellow-500" 
              path="/admin/messages" 
            />
            <DashboardWidget 
              title="Pending Edits" 
              value={stats.pendingEdits} 
              icon={FiEdit} 
              bgColor="bg-purple-500" 
              path="/admin/edits" 
              implemented={false}
            />
            <DashboardWidget 
              title="Site Configuration" 
              value={stats.siteConfig} 
              icon={FiSettings} 
              bgColor="bg-red-500" 
              path="/admin/config" 
              implemented={false}
            />
          </div>
        </section>
        
        {/* Recent Activity Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
            <span className="text-sm text-primary hover:underline cursor-pointer">View All</span>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {recentActivities.map((activity, index) => (
              <RecentActivityCard key={index} {...activity} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 