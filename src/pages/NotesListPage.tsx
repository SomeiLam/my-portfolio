import { useEffect, useState } from 'react';
import { Note } from '../types';
import { useNavigate } from 'react-router-dom';
import { NoteCard } from '../components/NoteCard';
import { TechnologyFilter } from '../components/TechnologyFilter';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

function NotesListPage() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<
    { name: string; category: string }[]
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchNotes() {
      try {
        const { data, error } = await supabase
          .from('notes')
          .select('*')
          .order('date', { ascending: false });

        if (error) throw error;
        const notes = user ? data : data.filter((d) => !d.is_private);
        setNotes(notes || []);

        // Extract unique categories from fetched notes
        const noteCategories = Array.from(
          new Set(data.map((note) => note.category)),
        ).map((category) => ({ name: category, category }));
        setCategories(noteCategories);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    }
    fetchNotes();
  }, [user]);

  // Toggle category selection
  const handleToggleCategory = (category: {
    name: string;
    category: string;
  }) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(category.name)
          ? prev.filter((name) => name !== category.name) // Remove if already selected
          : [...prev, category.name], // Add if not selected
    );
  };

  // Filter notes based on selected categories
  const filteredNotes = selectedCategories.length
    ? notes.filter((note) => selectedCategories.includes(note.category))
    : notes;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category Filter for Notes */}
      <TechnologyFilter
        items={categories}
        selectedItems={selectedCategories.map((name) => ({
          name,
          category: name,
        }))}
        onToggleItem={handleToggleCategory} // Updated to use toggle
        title="Filter by Category"
      />

      {/* Filtered Notes */}
      <div className="flex flex-col gap-6">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onClick={() => navigate(`/my-portfolio/notes/${note.id}`)}
          />
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No notes found.</p>
        </div>
      )}
    </main>
  );
}

export { NotesListPage };
