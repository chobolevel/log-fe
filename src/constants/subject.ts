import type { SubjectType } from "@/types/subject";

export const SUBJECT_TYPE_LABELS: Record<SubjectType, string> = {
  BOOK: "책",
  MOVIE: "영화",
  DRAMA: "드라마",
  MUSIC: "음악",
};

export const SUBJECT_TYPE_OPTIONS: { value: SubjectType; label: string }[] = [
  { value: "BOOK", label: "책" },
  { value: "MOVIE", label: "영화" },
  { value: "DRAMA", label: "드라마" },
  { value: "MUSIC", label: "음악" },
];
