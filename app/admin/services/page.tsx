'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiSettings, FiEdit2, FiTrash2, FiPlus, FiEye, FiEyeOff } from 'react-icons/fi';

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  imagePath: string | null;
  icon: string | null;
  benefits: any | null;
  order: number | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ServiceManagementPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  
  // Form state
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    imagePath: '',
    icon: 'settings',
    published: true,
    benefits: JSON.stringify([{ title: 'Benefit Title', description: 'Benefit description goes here.' }], null, 2)
  });
  
  // Authentication check
  useEffect(() => {
    const adminAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!adminAuthenticated || adminAuthenticated !== 'true') {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
      fetchServices();
    }
  }, [router]);
  
  // Fetch services from API
  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/services');
      
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      
      const data = await response.json();
      setServices(data);
      setError('');
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setForm(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  
  // Handle title change to auto-generate slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };
  
  // Open modal for adding new service
  const handleAddNew = () => {
    setFormMode('add');
    setForm({
      title: '',
      slug: '',
      description: '',
      imagePath: '',
      icon: 'settings',
      published: true,
      benefits: JSON.stringify([{ title: 'Benefit Title', description: 'Benefit description goes here.' }], null, 2)
    });
    setIsModalOpen(true);
  };
  
  // Open modal for editing existing service
  const handleEdit = (service: Service) => {
    setFormMode('edit');
    setSelectedService(service);
    setForm({
      title: service.title,
      slug: service.slug,
      description: service.description || '',
      imagePath: service.imagePath || '',
      icon: service.icon || 'settings',
      published: service.published,
      benefits: service.benefits ? JSON.stringify(service.benefits, null, 2) : JSON.stringify([], null, 2)
    });
    setIsModalOpen(true);
  };
  
  // Toggle service published status
  const handleTogglePublished = async (service: Service) => {
    try {
      const response = await fetch(`/api/services/${service.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...service,
          published: !service.published
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update service status');
      }
      
      // Update local state
      setServices(services.map(s => 
        s.id === service.id ? { ...s, published: !s.published } : s
      ));
    } catch (err) {
      console.error('Error updating service status:', err);
      setError('Failed to update service status');
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    let parsedBenefits;
    try {
      parsedBenefits = JSON.parse(form.benefits);
    } catch (err) {
      setError('Invalid benefits JSON format');
      setIsLoading(false);
      return;
    }
    
    try {
      const formData = {
        ...form,
        benefits: parsedBenefits
      };
      
      if (formMode === 'add') {
        // Add new service
        const response = await fetch('/api/services', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
          throw new Error('Failed to add service');
        }
      } else {
        // Update existing service
        const response = await fetch(`/api/services/${selectedService?.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
          throw new Error('Failed to update service');
        }
      }
      
      // Refresh services list
      await fetchServices();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(formMode === 'add' ? 'Failed to add service' : 'Failed to update service');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle service deletion
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete service');
      }
      
      // Refresh services list
      await fetchServices();
    } catch (err) {
      console.error('Error deleting service:', err);
      setError('Failed to delete service');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Available icons for services
  const iconOptions = [
    'settings', 'tool', 'zap', 'shield', 'truck', 'database', 
    'globe', 'trending-up', 'layers', 'activity', 'users', 
    'box', 'cpu', 'server', 'power', 'sliders', 'grid'
  ];
  
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
            <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
          </div>
          <button 
            onClick={handleAddNew}
            className="flex items-center px-4 py-2 bg-primary hover:bg-primary/90 rounded-md text-white"
          >
            <FiPlus className="mr-2" /> Add Service
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
        
        {/* Services Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                      No services found. Add your first service.
                    </td>
                  </tr>
                ) : (
                  services.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-primary h-10 w-10 rounded-full flex items-center justify-center text-white">
                            <FiSettings size={18} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{service.title}</div>
                            <div className="text-sm text-gray-500">
                              {service.description ? 
                                service.description.length > 50 
                                  ? service.description.substring(0, 50) + '...' 
                                  : service.description 
                                : ''}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {service.slug}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span 
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            service.published 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {service.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleTogglePublished(service)}
                          className="text-gray-600 hover:text-gray-900 mr-4"
                          title={service.published ? 'Unpublish' : 'Publish'}
                        >
                          {service.published ? <FiEyeOff className="inline mr-1" /> : <FiEye className="inline mr-1" />}
                        </button>
                        <button
                          onClick={() => handleEdit(service)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <FiEdit2 className="inline mr-1" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
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
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {formMode === 'add' ? 'Add New Service' : 'Edit Service'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      value={form.title}
                      onChange={handleTitleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                      Slug *
                    </label>
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      required
                      value={form.slug}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Used in URLs - automatically generated from title
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
                      Icon
                    </label>
                    <select
                      id="icon"
                      name="icon"
                      value={form.icon}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon.charAt(0).toUpperCase() + icon.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="published" className="flex items-center">
                      <input
                        type="checkbox"
                        id="published"
                        name="published"
                        checked={form.published}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Published</span>
                    </label>
                    <p className="mt-1 text-xs text-gray-500">
                      Only published services appear on the website
                    </p>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    value={form.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="imagePath" className="block text-sm font-medium text-gray-700 mb-1">
                    Image Path (optional)
                  </label>
                  <input
                    type="text"
                    id="imagePath"
                    name="imagePath"
                    value={form.imagePath}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="/images/services/your-image.jpg"
                  />
                </div>
                
                <div>
                  <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-1">
                    Benefits (JSON)
                  </label>
                  <textarea
                    id="benefits"
                    name="benefits"
                    rows={8}
                    value={form.benefits}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary font-mono text-sm"
                  ></textarea>
                  <p className="mt-1 text-xs text-gray-500">
                    JSON array of benefits with title and description properties
                  </p>
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
                    {isLoading ? 'Saving...' : formMode === 'add' ? 'Add Service' : 'Save Changes'}
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