import { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description:
      'A full-stack e-commerce platform with real-time inventory management',
    image_url:
      'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=60',
    technologies: [
      { name: 'Next.js', category: 'frontend' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'MongoDB', category: 'database' },
    ],
    demo_url: 'https://demo.example.com',
    github_url: 'https://github.com/example/project',
    year: 2024,
  },
  {
    id: '2',
    title: 'Testing Dashboard',
    description: 'Comprehensive testing dashboard with automated UI testing',
    image_url:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    technologies: [
      { name: 'React', category: 'frontend' },
      { name: 'Storybook', category: 'testing' },
      { name: 'Cypress', category: 'testing' },
    ],
    year: 2023,
  },
  {
    id: '3',
    title: 'Real-time Chat Application',
    description: 'Chat application with real-time messaging and file sharing',
    image_url:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60',
    technologies: [
      { name: 'React', category: 'frontend' },
      { name: 'Firebase', category: 'backend' },
      { name: 'TypeScript', category: 'frontend' },
    ],
    year: 2024,
  },
];
