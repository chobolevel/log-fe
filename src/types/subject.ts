export type SubjectType = "BOOK" | "MOVIE" | "DRAMA" | "MUSIC";

export interface SubjectImage {
  id: number;
  url: string;
  name: string;
  created_at: number;
  updated_at: number;
}

export interface Subject {
  id: number;
  type: SubjectType;
  title: string;
  description?: string;
  images: SubjectImage[];
  created_at: number;
  updated_at: number;
}
