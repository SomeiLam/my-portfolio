import { RawDraftContentState } from 'draft-js';

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string[];
  thumbnail_url: string;
  technologies: Technology[];
  demo_url?: string;
  github_url?: string;
  year: number;
  detailsjson?: RawDraftContentState;
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

export type ContentBlock = {
  type: 'text' | 'image' | 'code';
  content: string;
  language?: string; // For code blocks
  alt?: string; // For images
};

export type Note = {
  id: string;
  title: string;
  date: string;
  category: string;
  details: ContentBlock[];
  isPrivate: boolean;
};

export type Comment = {
  comment: string;
  created_at: Date;
  id: string;
  name: string;
  project_id: string;
};
