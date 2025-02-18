export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  technologies: Technology[];
  demo_url?: string;
  github_url?: string;
  year: number;
  details?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Technology {
  id?: string;
  name: string;
  category: string;
}

export const technologies: Technology[] = [
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Storybook', category: 'testing' },
  { name: 'Cypress', category: 'testing' },
  { name: 'Firebase', category: 'backend' },
  { name: 'MongoDB', category: 'database' },
];
