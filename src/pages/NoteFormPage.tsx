import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Code, Image, Type, ArrowUp, ArrowDown } from 'lucide-react';
import { ContentBlock } from '../types';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import Layout from './Layout';

export function NoteFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [category, setCategory] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  // Fetch existing note if editing
  useEffect(() => {
    async function fetchNote() {
      if (!id) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('notes')
          .select('*')
          .eq('id', id)
          .single();
        if (error) throw error;
        setTitle(data.title);
        setCategory(data.category);
        setBlocks(data.details || []);
        setIsPrivate(data.is_private);
      } catch (error) {
        console.error('Error fetching note:', error);
        setError('Failed to load note');
      } finally {
        setLoading(false);
      }
    }
    fetchNote();
  }, [id]);

  // Add a new content block
  const addBlock = (type: ContentBlock['type']) => {
    setBlocks([
      ...blocks,
      {
        type,
        content: '',
        language: type === 'code' ? 'javascript' : undefined,
      },
    ]);
  };

  // Update a content block
  const updateBlock = (index: number, content: string, language?: string) => {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], content, language };
    setBlocks(newBlocks);
  };

  // Remove a content block
  const removeBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  // Move a block up or down
  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < newBlocks.length) {
      [newBlocks[index], newBlocks[targetIndex]] = [
        newBlocks[targetIndex],
        newBlocks[index],
      ];
      setBlocks(newBlocks);
    }
  };

  // Handle form submission (Create or Update Note)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const noteData = {
      title,
      category,
      details: blocks,
      user_id: user?.id,
      is_private: isPrivate,
    };

    try {
      if (id) {
        // Update existing note
        const { error } = await supabase
          .from('notes')
          .update(noteData)
          .eq('id', id);
        if (error) throw error;
      } else {
        // Insert new note
        const { error } = await supabase.from('notes').insert([noteData]);
        if (error) throw error;
      }
      navigate('/my-portfolio/manage-projects');
    } catch (error) {
      setError('Failed to save note');
      console.error('Error saving note:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-md p-6 space-y-6"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {id ? 'Edit Note' : 'Create New Note'}
              </h2>
            </div>

            <div className="space-y-6">
              {/* Title Input */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Category Input */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Content Blocks */}
              <div className="flex flex-col gap-5 space-y-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Blocks
                </label>
                {blocks.map((block, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between items-start gap-2"
                  >
                    {/* Move and Remove Buttons */}
                    <div className="flex flex-col gap-1">
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => moveBlock(index, 'up')}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                      )}
                      {index < blocks.length - 1 && (
                        <button
                          type="button"
                          onClick={() => moveBlock(index, 'down')}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Text Block */}
                    {block.type === 'text' && (
                      <textarea
                        value={block.content}
                        onChange={(e) => updateBlock(index, e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        rows={4}
                        placeholder="Enter text content..."
                      />
                    )}

                    {/* Code Block */}
                    {block.type === 'code' && (
                      <div className="space-y-2 flex flex-col gap-5 w-full">
                        <select
                          value={block.language}
                          onChange={(e) =>
                            updateBlock(index, block.content, e.target.value)
                          }
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                          <option value="javascript">JavaScript</option>
                          <option value="typescript">TypeScript</option>
                          <option value="html">HTML</option>
                          <option value="css">CSS</option>
                        </select>
                        <textarea
                          value={block.content}
                          onChange={(e) => updateBlock(index, e.target.value)}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono"
                          rows={6}
                          placeholder="Enter code..."
                        />
                      </div>
                    )}

                    {/* Image Block */}
                    {block.type === 'image' && (
                      <input
                        type="url"
                        value={block.content}
                        onChange={(e) => updateBlock(index, e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Enter image URL..."
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => removeBlock(index)}
                      className=" text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Blocks */}
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => addBlock('text')}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Type className="h-5 w-5 mr-2" />
                  Add Text
                </button>
                <button
                  type="button"
                  onClick={() => addBlock('code')}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Code className="h-5 w-5 mr-2" />
                  Add Code
                </button>
                <button
                  type="button"
                  onClick={() => addBlock('image')}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Image className="h-5 w-5 mr-2" />
                  Add Image
                </button>
              </div>
            </div>

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <div className="flex justify-between items-center flex-wrap w-full">
              <div className="flex gap-2">
                <span>Public: </span>
                <div
                  style={{
                    width: '50px',
                    height: '25px',
                    backgroundColor: isPrivate ? 'gray' : 'green',
                    borderRadius: '12.5px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setIsPrivate(!isPrivate)}
                >
                  <div
                    style={{
                      width: '21px',
                      height: '21px',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      transform: isPrivate
                        ? 'translateX(0)'
                        : 'translateX(25px)',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/my-portfolio/manage-projects')}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                >
                  {id ? 'Update Note' : 'Create Note'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
