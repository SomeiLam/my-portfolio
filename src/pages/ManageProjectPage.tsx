import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Note, Project, Technology } from '../types';
import { Edit, Trash2, Plus, Check, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { formatDate } from '../utils/helper';

export function ManageProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTechnology, setNewTechnology] = useState<Partial<Technology>>({
    name: '',
    category: '',
  });
  const [editingTech, setEditingTech] = useState<Technology | null>(null);
  const [editForm, setEditForm] = useState<Partial<Technology>>({});
  const { user } = useAuth();

  useEffect(() => {
    fetchProjects();
    fetchTechnologies();
    fetchNotes();
  }, []);

  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  }

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

  async function fetchNotes() {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Are you sure you want to delete this project?'))
      return;

    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  }

  const handleAddTechnology = async () => {
    if (!newTechnology.name || !newTechnology.category) {
      alert('Please fill in both name and category');
      return;
    }

    const formattedCategory =
      newTechnology.category.charAt(0).toUpperCase() +
      newTechnology.category.slice(1).toLowerCase();

    const technologyData = {
      name: newTechnology.name,
      category: formattedCategory, // Ensure category is capitalized
      user_id: user?.id, // Associate technology with the authenticated user
    };

    // Check if technology already exists
    if (
      technologies.some(
        (tech) => tech.name.toLowerCase() === newTechnology.name?.toLowerCase(),
      )
    ) {
      alert('This technology already exists');
      return;
    }

    try {
      // Insert the new technology into the technologies table
      const { error } = await supabase
        .from('technologies')
        .insert([technologyData]);

      if (error) {
        throw error;
      }
      console.log('Technology added successfully:', technologyData);
      fetchTechnologies();
    } catch (error) {
      console.error('Error adding technology:', error);
    }

    // Reset form
    setNewTechnology({
      name: '',
      category: '',
    });
  };

  const handleEditTechnology = (tech: Technology) => {
    setEditingTech(tech);
    setEditForm({ ...tech });
  };

  // Function to handle updating a technology
  const handleUpdateTechnology = async () => {
    if (!editForm.name || !editForm.category) {
      alert('Please fill in both name and category');
      return;
    }

    // Format the category to capitalize the first letter
    const formattedCategory =
      editForm.category.charAt(0).toUpperCase() +
      editForm.category.slice(1).toLowerCase();

    // Prepare the updated technology data
    const updatedTechnologyData = {
      name: editForm.name,
      category: formattedCategory,
    };

    if (
      updatedTechnologyData.name !== editingTech?.name ||
      updatedTechnologyData.category !== editingTech?.category
    ) {
      try {
        // Update the technology in the technologies table
        const { error } = await supabase
          .from('technologies')
          .update(updatedTechnologyData)
          .eq('id', editingTech?.id);

        if (error) throw error;
        console.log('Technology updated successfully:', updatedTechnologyData);

        // Fetch the updated list of technologies
        fetchTechnologies();

        // Reset the editing state
        setEditingTech(null);
        setEditForm({});
      } catch (error) {
        console.error('Error updating technology:', error);
      }
    }
    // Reset the editing state
    setEditingTech(null);
    setEditForm({});
  };

  // Function to handle deleting a technology
  const handleDeleteTechnology = async (tech: Technology) => {
    if (!window.confirm('Are you sure you want to delete this technology?'))
      return;

    try {
      // Delete the technology from the technologies table
      const { error } = await supabase
        .from('technologies')
        .delete()
        .eq('id', tech.id);

      if (error) throw error;
      console.log('Technology deleted successfully:', tech.name);

      // Remove the deleted technology from the list
      setTechnologies(
        technologies.filter((technology) => technology.id !== tech.id),
      );
    } catch (error) {
      console.error('Error deleting technology:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-20">
        {/* Projects Section */}
        <div className="space-y-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Manage Projects</h2>
            <Link
              to="/my-portfolio/projects/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Project
            </Link>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Technologies
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-lg object-cover"
                          src={project.thumbnail_url}
                          alt=""
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {project.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {project.year}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech.name}
                            className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-7 py-6 whitespace-nowrap text-right text-sm font-medium flex items-end justify-end">
                      <Link
                        to={`/my-portfolio/projects/${project.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-8">
          {/* Technologies Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Manage Technologies
            </h2>
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    {editingTech?.name === tech.name ? (
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          type="text"
                          value={editForm.name || ''}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          className="w-full flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          placeholder="Technology name"
                        />
                        <input
                          type="text"
                          value={editForm.category || ''}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              category: e.target.value,
                            })
                          }
                          className="w-full flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          placeholder="Category"
                        />
                        <button
                          onClick={handleUpdateTechnology}
                          className="p-1 text-green-600 hover:text-green-800"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingTech(null)}
                          className="p-1 text-gray-600 hover:text-gray-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div>
                          <span className="font-medium text-gray-900">
                            {tech.name}
                          </span>
                          <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700">
                            {tech.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditTechnology(tech)}
                            className="p-1 text-indigo-600 hover:text-indigo-800"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTechnology(tech)}
                            className="p-1 text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Technology name"
                    value={newTechnology.name}
                    onChange={(e) =>
                      setNewTechnology({
                        ...newTechnology,
                        name: e.target.value,
                      })
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Category"
                    value={newTechnology.category}
                    onChange={(e) =>
                      setNewTechnology({
                        ...newTechnology,
                        category: e.target.value,
                      })
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <button
                  onClick={handleAddTechnology}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Technology
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="space-y-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Manage Notes</h2>
            <Link
              to="/my-portfolio/notes/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Note
            </Link>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {notes.map((note) => (
                  <tr key={note.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {note.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {note.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDate(note.date)}
                    </td>
                    <td className="px-7 py-6 whitespace-nowrap text-right flex items-end justify-end gap-4">
                      <Link
                        to={`/my-portfolio/notes/${note.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        // onClick={() => handleDeleteNote(note.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
