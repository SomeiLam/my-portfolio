import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Project, Technology } from '../types';
import { TechnologyFilter } from '../components/TechnologyFilter';
import { ProjectCard } from '../components/ProjectCard';

export function HomePage() {
  const [selectedTechnologies, setSelectedTechnologies] = useState<
    Technology[]
  >([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTechnologies();
    fetchProjects();
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

  // Toggle function to select/deselect technologies
  const handleToggleTechnology = (tech: Technology) => {
    setSelectedTechnologies(
      (prev) =>
        prev.some((t) => t.name === tech.name)
          ? prev.filter((t) => t.name !== tech.name) // Remove if already selected
          : [...prev, tech], // Add if not selected
    );
  };

  // Filter projects based on selected technologies
  const filteredProjects = selectedTechnologies.length
    ? projects.filter((project) =>
        selectedTechnologies.some((tech) =>
          project.technologies.some(
            (t: { name: string }) => t.name === tech.name,
          ),
        ),
      )
    : projects;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading projects...</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <TechnologyFilter
        items={technologies}
        selectedItems={selectedTechnologies}
        onToggleItem={handleToggleTechnology} // Updated to match refactored `TechnologyFilter`
        title="Filter by Technology"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No projects found with the selected technologies.
          </p>
        </div>
      )}
    </main>
  );
}
