import type { User } from "@/types/user";
import type { Subject } from "@/types/subject";

export type RecordType = "BLOG_TECH" | "BLOG_DAILY" | "DIARY" | "REVIEW";

export interface RecordReviewItem {
  id: number;
  subject: Subject;
  rating: number;
  created_at: number;
  updated_at: number;
}

export interface RecordItem {
  id: number;
  writer: User;
  type: RecordType;
  title: string;
  content: string;
  is_private: boolean;
  tags: string[];
  review?: RecordReviewItem;
  like_count: number;
  created_at: number;
  updated_at: number;
}
