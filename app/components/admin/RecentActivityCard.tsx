import React from 'react';
import { FiEdit, FiPlusCircle, FiMail, FiEye } from 'react-icons/fi';

interface RecentActivityCardProps {
  type: 'edit' | 'new' | 'contact' | 'view';
  user: string;
  target: string;
  date: Date;
  message?: string;
}

const RecentActivityCard = ({ type, user, target, date, message }: RecentActivityCardProps) => {
  // Format the date to relative time (e.g., "2 hours ago")
  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);
    
    if (diffSec < 60) return `${diffSec} seconds ago`;
    if (diffMin < 60) return `${diffMin} minutes ago`;
    if (diffHour < 24) return `${diffHour} hours ago`;
    if (diffDay < 30) return `${diffDay} days ago`;
    
    return date.toLocaleDateString();
  };
  
  // Get appropriate icon based on activity type
  const getActivityIcon = () => {
    switch (type) {
      case 'edit':
        return <FiEdit className="text-blue-500" />;
      case 'new':
        return <FiPlusCircle className="text-green-500" />;
      case 'contact':
        return <FiMail className="text-yellow-500" />;
      case 'view':
        return <FiEye className="text-purple-500" />;
      default:
        return <FiEdit className="text-gray-500" />;
    }
  };
  
  // Get background color based on activity type
  const getActivityBg = () => {
    switch (type) {
      case 'edit': return 'bg-blue-100';
      case 'new': return 'bg-green-100';
      case 'contact': return 'bg-yellow-100';
      case 'view': return 'bg-purple-100';
      default: return 'bg-gray-100';
    }
  };
  
  return (
    <div className="flex items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
      <div className={`${getActivityBg()} p-3 rounded-full mr-4`}>
        {getActivityIcon()}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="font-medium">{user}</h4>
          <span className="text-xs text-gray-500">{getRelativeTime(date)}</span>
        </div>
        <p className="text-gray-600 text-sm">
          {type === 'edit' && 'Edited'}
          {type === 'new' && 'Created'}
          {type === 'contact' && 'Submitted'}
          {type === 'view' && 'Viewed'}
          {' '}
          <span className="font-medium">{target}</span>
        </p>
        {message && <p className="text-gray-500 text-sm mt-1">{message}</p>}
      </div>
    </div>
  );
};

export default RecentActivityCard; 