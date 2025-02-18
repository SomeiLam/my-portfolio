import { Technology } from '../types';
import { X } from 'lucide-react';

interface TechnologyFilterProps {
  technologies: Technology[];
  selectedTechnologies: Technology[];
  onSelectTechnology: (tech: Technology) => void;
  onRemoveTechnology: (tech: Technology) => void;
}

export function TechnologyFilter({
  technologies,
  selectedTechnologies,
  onSelectTechnology,
  onRemoveTechnology,
}: TechnologyFilterProps) {
  // Group technologies by category
  const groupedTechnologies = technologies.reduce(
    (acc, tech) => {
      // Create a category group if it doesn't exist
      if (!acc[tech.category]) {
        acc[tech.category] = [];
      }
      acc[tech.category].push(tech);
      return acc;
    },
    {} as Record<string, Technology[]>,
  );

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Filter by Technology</h2>

      {/* Display selected technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedTechnologies.map((tech) => (
          <span
            key={tech.name}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
          >
            {tech.name}
            <button
              onClick={() => onRemoveTechnology(tech)}
              className="ml-2 hover:text-indigo-600"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>

      {/* Display technologies by category */}
      {Object.keys(groupedTechnologies).map((category) => (
        <div key={category} className="mb-4 flex flex-row gap-3 items-center">
          <h3 className="font-semibold text-gray-900">{category}</h3>
          <div className="flex flex-wrap gap-2 items-center">
            {groupedTechnologies[category].map((tech) => (
              <button
                key={tech.name}
                onClick={() => onSelectTechnology(tech)}
                className="px-3 py-1 rounded-full text-sm border border-gray-300 hover:border-indigo-500 hover:text-indigo-500 transition-colors"
              >
                {tech.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
