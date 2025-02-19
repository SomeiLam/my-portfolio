import { useEffect, useState } from 'react';
import { Note } from '../types';
import { useNavigate } from 'react-router-dom';
import { NoteCard } from '../components/NoteCard';
import { TechnologyFilter } from '../components/TechnologyFilter';
import { supabase } from '../lib/supabase';

function NotesListPage() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<
    { name: string; category: string }[]
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Filter notes by selected categories
  const filteredNotes = selectedCategories.length
    ? notes.filter((note) => selectedCategories.includes(note.category))
    : notes;

  const handleSelectCategory = (category: {
    name: string;
    category: string;
  }) => {
    setSelectedCategories([...selectedCategories, category.name]);
  };

  const handleRemoveCategory = (category: {
    name: string;
    category: string;
  }) => {
    setSelectedCategories(
      selectedCategories.filter((name) => name !== category.name),
    );
  };

  useEffect(() => {
    async function fetchNotes() {
      try {
        const { data, error } = await supabase
          .from('notes')
          .select('*')
          .order('date', { ascending: false });

        if (error) throw error;
        setNotes(data);
        // Get unique note categories
        const noteCategories = Array.from(
          new Set(notes.map((note) => note.category)),
        ).map((category) => ({ name: category, category }));
        setCategories(noteCategories);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    }
    fetchNotes();
  }, [notes]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category Filter for Notes */}
      <TechnologyFilter
        items={categories}
        selectedItems={selectedCategories.map((name) => ({
          name,
          category: name,
        }))}
        onSelectItem={handleSelectCategory}
        onRemoveItem={handleRemoveCategory}
        title="Filter by Category"
      />

      {/* Filtered Notes */}
      <div className="flex flex-col gap-6">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onClick={(note) => navigate(`/my-portfolio/notes/${note.id}`)}
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
