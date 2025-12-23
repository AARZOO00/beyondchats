// src/types.ts
export interface Article {
  id: number;
  title: string;
  source_url: string;
  image_url: string | null;
  original_content: string;
  rewritten_content?: string | null;
  references?: string[];
  created_at?: string;
  updated_at?: string;
}
