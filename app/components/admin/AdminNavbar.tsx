'use client';

import React from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiLogOut, FiUser, FiSettings, FiChevronDown } from 'react-icons/fi';
import { useState } from 'react';

const AdminNavbar = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button 
              className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
            <Link href="/admin" className="text-xl font-bold flex items-center lg:ml-2.5">
              <span className="text-primary">noievoi</span>
              <span className="text-gray-600 ml-1">Admin</span>
            </Link>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold ml-2 px-2.5 py-0.5 rounded">
              Admin Panel
            </span>
          </div>
          
          <div className="flex items-center">
            <Link href="/" className="text-gray-500 hover:text-primary mr-4">
              View Site
            </Link>
            
            {/* Profile dropdown */}
            <div className="relative">
              <button 
                className="flex items-center text-sm font-medium text-gray-700 p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-2">
                  <FiUser />
                </div>
                <span className="hidden md:inline-block">Admin User</span>
                <FiChevronDown className="ml-1 w-4 h-4" />
              </button>
              
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link href="/admin/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <FiUser className="mr-2 text-gray-400" />
                    Profile
                  </Link>
                  <Link href="/admin/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <FiSettings className="mr-2 text-gray-400" />
                    Settings
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button className="flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50">
                    <FiLogOut className="mr-2 text-red-400" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar; 