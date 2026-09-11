import { BookOpen, Film, Music, Tv2, type LucideIcon } from "lucide-react";
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

export const SUBJECT_TYPE_PILL_CLASSES: Record<
  SubjectType,
  { active: string; inactive: string }
> = {
  BOOK:  { active: "bg-amber-500/20 text-amber-500",   inactive: "bg-muted text-muted-foreground" },
  MOVIE: { active: "bg-blue-500/20 text-blue-400",     inactive: "bg-muted text-muted-foreground" },
  DRAMA: { active: "bg-rose-500/20 text-rose-400",     inactive: "bg-muted text-muted-foreground" },
  MUSIC: { active: "bg-violet-500/20 text-violet-500", inactive: "bg-muted text-muted-foreground" },
};

export const SUBJECT_TYPE_PLACEHOLDER: Record<
  SubjectType,
  { bg: string; color: string; Icon: LucideIcon }
> = {
  BOOK:  { bg: "bg-amber-500/10",  color: "text-amber-500",  Icon: BookOpen },
  MOVIE: { bg: "bg-blue-500/10",   color: "text-blue-400",   Icon: Film     },
  DRAMA: { bg: "bg-rose-500/10",   color: "text-rose-400",   Icon: Tv2      },
  MUSIC: { bg: "bg-violet-500/10", color: "text-violet-500", Icon: Music    },
};
