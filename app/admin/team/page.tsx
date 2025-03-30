'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiEdit2, FiTrash2, FiPlus, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  location: string;
  bio: string;
  imageColor: string;
  imageUrl?: string | null;
  email?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
}

export default function TeamManagementPage() {
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  
  // Form state
  const [form, setForm] = useState({
    name: '',
    position: '',
    location: '',
    bio: '',
    imageColor: 'bg-primary',
    email: '',
    linkedinUrl: '',
    twitterUrl: ''
  });

  // Authentication check
  useEffect(() => {
    const adminAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!adminAuthenticated || adminAuthenticated !== 'true') {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
      fetchTeamMembers();
    }
  }, [router]);

  // Fetch team members from API
  const fetchTeamMembers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/team');
      
      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }
      
      const data = await response.json();
      setTeamMembers(data);
      setError('');
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError('Failed to load team members. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Open modal for adding new member
  const handleAddNew = () => {
    setFormMode('add');
    setForm({
      name: '',
      position: '',
      location: '',
      bio: '',
      imageColor: 'bg-primary',
      email: '',
      linkedinUrl: '',
      twitterUrl: ''
    });
    setIsModalOpen(true);
  };

  // Open modal for editing existing member
  const handleEdit = (member: TeamMember) => {
    setFormMode('edit');
    setSelectedMember(member);
    setForm({
      name: member.name,
      position: member.position,
      location: member.location,
      bio: member.bio,
      imageColor: member.imageColor,
      email: member.email || '',
      linkedinUrl: member.linkedinUrl || '',
      twitterUrl: member.twitterUrl || ''
    });
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (formMode === 'add') {
        // Add new team member
        const response = await fetch('/api/team', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });
        
        if (!response.ok) {
          throw new Error('Failed to add team member');
        }
      } else {
        // Update existing team member
        const response = await fetch(`/api/team/${selectedMember?.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });
        
        if (!response.ok) {
          throw new Error('Failed to update team member');
        }
      }
      
      // Refresh team members list
      await fetchTeamMembers();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(formMode === 'add' ? 'Failed to add team member' : 'Failed to update team member');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle team member deletion
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/team/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete team member');
      }
      
      // Refresh team members list
      await fetchTeamMembers();
    } catch (err) {
      console.error('Error deleting team member:', err);
      setError('Failed to delete team member');
    } finally {
      setIsLoading(false);
    }
  };

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
            <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
          </div>
          <button 
            onClick={handleAddNew}
            className="flex items-center px-4 py-2 bg-primary hover:bg-primary/90 rounded-md text-white"
          >
            <FiPlus className="mr-2" /> Add Team Member
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-red-700">
            {error}
          </div>
        )}

        {/* Team Members Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teamMembers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                      No team members found. Add your first team member.
                    </td>
                  </tr>
                ) : (
                  teamMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`${member.imageColor} h-10 w-10 rounded-full flex items-center justify-center text-white font-bold`}>
                            {member.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                            {member.email && (
                              <div className="text-sm text-gray-500">{member.email}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(member)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <FiEdit2 className="inline mr-1" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
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

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {formMode === 'add' ? 'Add New Team Member' : 'Edit Team Member'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                      Position *
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      required
                      value={form.position}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      value={form.location}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="imageColor" className="block text-sm font-medium text-gray-700 mb-1">
                      Avatar Color
                    </label>
                    <select
                      id="imageColor"
                      name="imageColor"
                      value={form.imageColor}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    >
                      <option value="bg-primary">Primary</option>
                      <option value="bg-secondary">Secondary</option>
                      <option value="bg-accent">Accent</option>
                      <option value="bg-blue-500">Blue</option>
                      <option value="bg-green-500">Green</option>
                      <option value="bg-yellow-500">Yellow</option>
                      <option value="bg-red-500">Red</option>
                      <option value="bg-purple-500">Purple</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      id="linkedinUrl"
                      name="linkedinUrl"
                      value={form.linkedinUrl}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio *
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    required
                    value={form.bio}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {isLoading ? 'Saving...' : formMode === 'add' ? 'Add Member' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 