import React from 'react';
import Link from 'next/link';

interface DashboardWidgetProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  linkHref: string;
  linkText: string;
  color: string;
}

const DashboardWidget = ({ 
  title, 
  value, 
  icon, 
  linkHref, 
  linkText, 
  color = 'bg-blue-500'
}: DashboardWidgetProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      <div className="flex items-center p-5">
        <div className={`${color} rounded-full p-3 text-white mr-4`}>
          {icon}
        </div>
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>
      </div>
      <div className="bg-gray-50 py-3 px-5 border-t border-gray-100">
        <Link 
          href={linkHref} 
          className="text-sm text-primary font-medium hover:underline flex items-center"
        >
          {linkText}
          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default DashboardWidget; 