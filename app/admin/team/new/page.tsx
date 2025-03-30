'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiSave, FiUpload } from 'react-icons/fi';

export default function NewTeamMemberPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    location: '',
    bio: '',
    department: '',
    imagePath: '',
    published: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // For checkboxes
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to create a team member
      // await fetch('/api/team', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      
      // For this demo, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect back to team list
      router.push('/admin/team');
      
    } catch (error) {
      console.error('Failed to create team member:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Link 
            href="/admin/team" 
            className="flex items-center text-primary hover:underline mb-2"
          >
            <FiArrowLeft className="mr-1" />
            Back to Team Members
          </Link>
          <h1 className="text-2xl font-bold">Add New Team Member</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
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
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
              
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                >
                  <option value="">Select Department</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Compliance">Compliance</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Image
                </label>
                <div className="flex items-center gap-4">
                  {formData.imagePath ? (
                    <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                      <img 
                        src={formData.imagePath} 
                        alt="Profile" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center">
                      <FiUpload />
                    </div>
                  )}
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200"
                  >
                    Upload Image
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Recommended: 300x300px, JPG or PNG.
                </p>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    name="published"
                    checked={formData.published}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                    Published (visible on website)
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href="/admin/team"
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-75"
          >
            {isSubmitting ? 'Saving...' : (
              <>
                <FiSave className="mr-2" />
                Save Team Member
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 