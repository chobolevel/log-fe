export type SubjectType = "BOOK" | "MOVIE" | "DRAMA" | "MUSIC";

export interface Subject {
  id: number;
  type: SubjectType;
  title: string;
  description?: string;
  created_at: number;
  updated_at: number;
}
