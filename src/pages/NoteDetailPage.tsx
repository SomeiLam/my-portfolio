import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Note } from '../types';
import { ArrowLeft } from 'lucide-react';
import { formatDate } from '../utils/helper';
import { CodeBlock } from '../components/CodeBlock';
import Layout from './Layout';

export function NoteDetailPage() {
  const { id } = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchNote() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('notes')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setNote(data);
      } catch (error) {
        console.error('Error fetching note:', error);
        setError('Failed to load note');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchNote();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading note...</p>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Note not found</h2>
        <Link
          to="/my-portfolio/notes"
          className="text-indigo-600 hover:text-indigo-500"
        >
          Back to notes
        </Link>
      </div>
    );
  }

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <Link
            to="/my-portfolio/notes"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to notes
          </Link>
        </div>
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {note.title}
          </h2>
          <p className="text-sm text-gray-500 mb-6">{formatDate(note.date)}</p>

          <div className="space-y-6">
            {note.details.map((block, index) => {
              switch (block.type) {
                case 'text':
                  return (
                    <div key={index} className="text-gray-700 leading-relaxed">
                      {block.content.split('\n').map((line, lineIndex) => (
                        <p key={lineIndex} className="mb-2">
                          {line}
                        </p>
                      ))}
                    </div>
                  );
                case 'image':
                  return (
                    <img
                      key={index}
                      src={block.content}
                      alt={block.alt || 'Note image'}
                      className="rounded-lg max-w-full h-auto"
                    />
                  );
                case 'code':
                  return (
                    <pre
                      key={index}
                      className=" p-4 rounded-lg overflow-x-auto"
                    >
                      <CodeBlock code={block.content} />
                    </pre>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
