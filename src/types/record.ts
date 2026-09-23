import type { User } from "@/types/user";
import type { Subject } from "@/types/subject";
import type { Emotion } from "@/types/emotion";

export type RecordType = "BLOG_TECH" | "BLOG_DAILY" | "DIARY" | "REVIEW";

export interface RecordReviewItem {
  id: number;
  subject: Subject;
  rating: number;
  created_at: number;
  updated_at: number;
}

export interface RecordEmotionItem {
  id: number;
  emotion: Emotion;
  intensity: number;
  created_at: number;
  updated_at: number;
}

export interface RecordListItem {
  id: number;
  writer: User;
  type: RecordType;
  title: string;
  is_private: boolean;
  tags: string[];
  review?: RecordReviewItem;
  emotion?: RecordEmotionItem;
  like_count: number;
  view_count: number;
  created_at: number;
  updated_at: number;
}

export interface RecordItem extends RecordListItem {
  content: string;
}
