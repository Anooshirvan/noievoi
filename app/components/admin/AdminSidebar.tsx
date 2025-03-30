'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, FiLayers, FiUsers, FiFolder, FiSettings, 
  FiMail, FiPenTool, FiDatabase, FiGlobe, FiLayout, 
  FiGrid, FiChevronsLeft, FiChevronsRight 
} from 'react-icons/fi';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  mode: 'dashboard' | 'content';
}

const navItems: NavItem[] = [
  // Dashboard mode items
  { name: 'Dashboard', href: '/admin', icon: <FiHome className="w-5 h-5" />, mode: 'dashboard' },
  { name: 'Analytics', href: '/admin/analytics', icon: <FiLayers className="w-5 h-5" />, mode: 'dashboard' },
  { name: 'Content Status', href: '/admin/content-status', icon: <FiDatabase className="w-5 h-5" />, mode: 'dashboard' },
  
  // Content management mode items
  { name: 'Pages', href: '/admin/pages', icon: <FiLayout className="w-5 h-5" />, mode: 'content' },
  { name: 'Team Members', href: '/admin/team', icon: <FiUsers className="w-5 h-5" />, mode: 'content' },
  { name: 'Projects', href: '/admin/projects', icon: <FiFolder className="w-5 h-5" />, mode: 'content' },
  { name: 'Services', href: '/admin/services', icon: <FiPenTool className="w-5 h-5" />, mode: 'content' },
  { name: 'Messages', href: '/admin/messages', icon: <FiMail className="w-5 h-5" />, mode: 'content' },
  { name: 'Site Settings', href: '/admin/settings', icon: <FiSettings className="w-5 h-5" />, mode: 'content' },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mode, setMode] = useState<'dashboard' | 'content'>('dashboard');

  return (
    <aside className={`fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 pt-16 h-full duration-200 lg:flex border-r border-gray-200 bg-white ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="relative flex flex-col flex-1 min-h-0 pt-0">
        <div className="flex flex-col flex-1 pb-4 overflow-y-auto">
          {/* Mode toggle */}
          <div className="px-3 py-4 border-b border-gray-200">
            <div className="flex p-1 bg-gray-100 rounded-lg">
              <button
                className={`flex-1 px-3 py-2 text-sm font-medium text-center rounded-lg ${
                  mode === 'dashboard' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
                }`}
                onClick={() => setMode('dashboard')}
              >
                <div className="flex justify-center items-center">
                  <FiGrid className="mr-1" />
                  {!collapsed && 'Dashboard'}
                </div>
              </button>
              <button
                className={`flex-1 px-3 py-2 text-sm font-medium text-center rounded-lg ${
                  mode === 'content' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
                }`}
                onClick={() => setMode('content')}
              >
                <div className="flex justify-center items-center">
                  <FiGlobe className="mr-1" />
                  {!collapsed && 'Content'}
                </div>
              </button>
            </div>
          </div>
          
          {/* Navigation */}
          <ul className="px-3 pt-4 space-y-2">
            {navItems
              .filter(item => item.mode === mode)
              .map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-100 group ${
                        isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                      }`}
                    >
                      <div className={`${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                        {item.icon}
                      </div>
                      {!collapsed && (
                        <span className="ml-3">{item.name}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
        
        {/* Collapse button */}
        <div className="absolute right-0 top-4 -mr-3">
          <button
            className="flex items-center justify-center w-6 h-6 text-gray-500 bg-white rounded-full border border-gray-200 hover:bg-gray-100"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <FiChevronsRight /> : <FiChevronsLeft />}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar; 