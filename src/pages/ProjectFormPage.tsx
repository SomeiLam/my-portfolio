import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Project, Technology } from '../types';
import { useAuth } from '../hooks/useAuth';
import { Upload, X } from 'lucide-react';

export function ProjectFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { user } = useAuth();

  async function fetchTechnologies() {
    try {
      const { data, error } = await supabase
        .from('technologies')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setTechnologies(data || []);
    } catch (error) {
      console.error('Error fetching technologies:', error);
    }
  }

  async function fetchProject() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setFormData(data);
      if (data.image_url) {
        setImagePreview(data.image_url);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      setError('Failed to load project');
    }
  }

  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    image_url: '',
    demo_url: '',
    github_url: '',
    year: new Date().getFullYear(),
    technologies: [],
    details: '',
  });

  const uploadImage = async (file: File) => {
    const fileName = `${user?.id}-${file.name}`; // You can use any naming convention
    const bucket = 'images'; // Name of the bucket
    const filePath = `profile-images/${fileName}`; // Folder and file name structure

    // Upload the image to the bucket
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) {
      console.error('Error uploading image:', error);
      return;
    }

    console.log('Image uploaded successfully', data);

    // Get the public URL of the uploaded file
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    // If urlData is present, return the public URL
    const imageUrl = urlData?.publicUrl;
    if (!imageUrl) {
      console.error('Failed to get public URL.');
      return;
    }

    console.log('Image URL:', imageUrl);
    return imageUrl; // You can use this URL to save in your database or display
  };

  useEffect(() => {
    if (id) {
      fetchProject();
      fetchTechnologies();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formattedFormData = {
      ...formData,
      user_id: user?.id,
    };
    try {
      if (id) {
        const { error } = await supabase
          .from('projects')
          .update(formattedFormData)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([formattedFormData]);
        if (error) throw error;
      }

      navigate('/dashboard');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTechnologyToggle = (tech: Technology) => {
    const exists = formData.technologies?.some((t) => t.name === tech.name);
    if (exists) {
      setFormData({
        ...formData,
        technologies:
          formData.technologies?.filter((t) => t.name !== tech.name) || [],
      });
    } else {
      setFormData({
        ...formData,
        technologies: [...(formData.technologies || []), tech],
      });
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setLoading(true);
      // Assuming you have an uploadImage function that handles the upload to Supabase storage
      const imageUrl = await uploadImage(file);
      setFormData({ ...formData, image_url: imageUrl });
      setImagePreview(URL.createObjectURL(file));
    } catch (error) {
      setError('Failed to upload image');
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image_url: '' });
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          {id ? 'Edit Project' : 'Add New Project'}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-lg shadow"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project Image
            </label>
            <div
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${
                isDragging
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-300 hover:border-indigo-500'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-64 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleFileSelect}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Demo URL
            </label>
            <input
              type="url"
              value={formData.demo_url}
              onChange={(e) =>
                setFormData({ ...formData, demo_url: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              GitHub URL
            </label>
            <input
              type="url"
              value={formData.github_url}
              onChange={(e) =>
                setFormData({ ...formData, github_url: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Year
            </label>
            <input
              type="number"
              required
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: parseInt(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technologies
            </label>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => {
                const isSelected = formData.technologies?.some(
                  (t) => t.name === tech.name,
                );
                return (
                  <button
                    key={tech.name}
                    type="button"
                    onClick={() => handleTechnologyToggle(tech)}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      isSelected
                        ? 'bg-indigo-100 text-indigo-800 border-indigo-500'
                        : 'border-gray-300 hover:border-indigo-500 hover:text-indigo-500'
                    }`}
                  >
                    {tech.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Details
            </label>
            <textarea
              required
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/my-portfolio/dashboard')}
              className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
