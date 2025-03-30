'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiMail, FiEye, FiTrash2, FiCheckCircle, FiCheck } from 'react-icons/fi';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export default function MessageManagementPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');
  
  // Authentication check
  useEffect(() => {
    const adminAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!adminAuthenticated || adminAuthenticated !== 'true') {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
      fetchMessages();
    }
  }, [router]);
  
  // Fetch contact messages from API
  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/contact');
      
      if (!response.ok) {
        throw new Error('Failed to fetch contact messages');
      }
      
      const data = await response.json();
      setMessages(data);
      setError('');
    } catch (err) {
      console.error('Error fetching contact messages:', err);
      setError('Failed to load contact messages. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // View message details
  const handleViewMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
    
    // If the message is unread, mark it as read
    if (message.status === 'unread') {
      try {
        const response = await fetch(`/api/contact/${message.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'read' }),
        });
        
        if (response.ok) {
          // Update local state
          setMessages(messages.map(m => 
            m.id === message.id ? { ...m, status: 'read' } : m
          ));
        }
      } catch (err) {
        console.error('Error marking message as read:', err);
      }
    }
  };
  
  // Mark message as replied
  const handleMarkReplied = async (id: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'replied' }),
      });
      
      if (response.ok) {
        // Update local state
        setMessages(messages.map(m => 
          m.id === id ? { ...m, status: 'replied' } : m
        ));
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error('Error marking message as replied:', err);
    }
  };
  
  // Delete a message
  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Remove from local state
        setMessages(messages.filter(m => m.id !== id));
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };
  
  // Filter messages
  const filteredMessages = filter === 'all' 
    ? messages 
    : messages.filter(message => message.status === filter);
  
  if (isLoading && !isAuthenticated) {
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
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="text-gray-500 hover:text-gray-700 mr-4">
              <FiArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-red-700">
            {error}
          </div>
        )}
        
        {/* Filter Options */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          >
            All Messages
          </button>
          <button 
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-md ${filter === 'unread' ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          >
            Unread
          </button>
          <button 
            onClick={() => setFilter('read')}
            className={`px-4 py-2 rounded-md ${filter === 'read' ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          >
            Read
          </button>
          <button 
            onClick={() => setFilter('replied')}
            className={`px-4 py-2 rounded-md ${filter === 'replied' ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          >
            Replied
          </button>
        </div>
        
        {/* Messages Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sender
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMessages.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No messages found.
                    </td>
                  </tr>
                ) : (
                  filteredMessages.map((message) => (
                    <tr 
                      key={message.id} 
                      className={`hover:bg-gray-50 ${message.status === 'unread' ? 'font-semibold bg-blue-50' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {message.status === 'unread' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            New
                          </span>
                        )}
                        {message.status === 'read' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Read
                          </span>
                        )}
                        {message.status === 'replied' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Replied
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-0">
                            <div className="text-sm font-medium text-gray-900">{message.name}</div>
                            <div className="text-sm text-gray-500">{message.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{message.subject}</div>
                        {message.company && (
                          <div className="text-sm text-gray-500">From: {message.company}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewMessage(message)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <FiEye className="inline mr-1" /> View
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(message.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiTrash2 className="inline mr-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      
      {/* Message Detail Modal */}
      {isModalOpen && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedMessage.subject}</h2>
                <div className="flex space-x-2">
                  {selectedMessage.status !== 'replied' && (
                    <button
                      onClick={() => handleMarkReplied(selectedMessage.id)}
                      className="flex items-center text-green-600 hover:text-green-800"
                    >
                      <FiCheckCircle className="mr-1" /> Mark as Replied
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                    className="flex items-center text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 className="mr-1" /> Delete
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                  <div>
                    <span className="text-sm text-gray-600">From:</span>
                    <p className="font-medium">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Email:</span>
                    <p className="font-medium">{selectedMessage.email}</p>
                  </div>
                  {selectedMessage.company && (
                    <div>
                      <span className="text-sm text-gray-600">Company:</span>
                      <p className="font-medium">{selectedMessage.company}</p>
                    </div>
                  )}
                  {selectedMessage.phone && (
                    <div>
                      <span className="text-sm text-gray-600">Phone:</span>
                      <p className="font-medium">{selectedMessage.phone}</p>
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-sm text-gray-600">Date Received:</span>
                  <p className="font-medium">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Message:</h3>
                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <Link
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <FiMail className="mr-2" /> Reply via Email
                </Link>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 