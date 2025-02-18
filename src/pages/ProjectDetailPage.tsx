import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Project } from '../types';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

export function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailsHtml, setDetailsHtml] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProject(data);

        // Convert Draft.js JSON to HTML
        if (data.detailsjson) {
          try {
            const rawContent =
              typeof data.detailsjson === 'string'
                ? JSON.parse(data.detailsjson)
                : data.detailsjson;

            const contentState = convertFromRaw(rawContent);
            const html = stateToHTML(contentState);
            setDetailsHtml(html);
          } catch (error) {
            console.error('Error parsing rich text:', error);
            setDetailsHtml('<p>Error displaying details.</p>');
          }
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Project not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/my-portfolio"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col justify-center items-center sm:flex-row">
            {project.image_url.map((image, index) => (
              <div className="mt-2 mx-3 border" key={index}>
                <img
                  src={image}
                  alt={`${project.title}-${index}`}
                  className="h-full w-full sm:w-full sm:h-64 object-cover cursor-pointer"
                  onClick={() => window.open(image, '_blank')}
                />
              </div>
            ))}
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {project.title}
              </h1>
              <span className="text-gray-500">{project.year}</span>
            </div>

            <p className="text-gray-600 mb-6">{project.description}</p>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech.name}
                    className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Render Rich Text from Draft.js */}
            {detailsHtml && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Project Details</h2>
                <div
                  className="prose prose-lg max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{ __html: detailsHtml }}
                />
              </div>
            )}

            <div className="flex gap-4">
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Live Demo
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
