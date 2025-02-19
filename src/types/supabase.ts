import { RawDraftContentState } from 'draft-js';
import { ContentBlock, Technology } from '.';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          image_url: string[];
          thumbnail_url: string;
          demo_url: string;
          github_url: string;
          year: number;
          technologies: Technology[];
          detailsJson: RawDraftContentState; // Rich text content stored as JSON
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          image_url?: string[];
          thumbnail_url?: string;
          demo_url?: string;
          github_url?: string;
          year: number;
          technologies?: Technology[];
          detailsJson: RawDraftContentState;
        };
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };

      notes: {
        Row: {
          id: string;
          title: string;
          category: string;
          details: ContentBlock[]; // Rich text content stored as JSONB
          date: string; // Timestamp
          user_id: string | null; // References auth.users
        };
        Insert: {
          id?: string;
          title: string;
          category: string;
          details: ContentBlock[];
          date?: string;
          user_id?: string | null;
        };
        Update: Partial<Database['public']['Tables']['notes']['Insert']>;
      };

      technologies: {
        Row: {
          id: string;
          name: string;
          category: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
        };
        Update: Partial<Database['public']['Tables']['technologies']['Insert']>;
      };
    };
  };
}
