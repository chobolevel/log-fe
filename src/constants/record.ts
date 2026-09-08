import type { RecordType } from "@/types/record";

export const RECORD_TYPE_LABELS: Record<RecordType, string> = {
  BLOG_TECH: "기술 블로그",
  BLOG_DAILY: "일상 블로그",
  DIARY: "일기",
  REVIEW: "리뷰",
};

export const RECORD_TYPE_OPTIONS: { value: RecordType; label: string }[] = [
  { value: "BLOG_TECH", label: "기술 블로그" },
  { value: "BLOG_DAILY", label: "일상 블로그" },
  { value: "DIARY", label: "일기" },
  { value: "REVIEW", label: "리뷰" },
];

export const RECORD_TYPE_ACTIVE_CLASSES: Record<RecordType, string> = {
  BLOG_TECH:
    "bg-record-tech text-record-tech-foreground shadow-sm",
  BLOG_DAILY:
    "bg-record-daily text-record-daily-foreground shadow-sm",
  DIARY:
    "bg-record-diary text-record-diary-foreground shadow-sm",
  REVIEW:
    "bg-record-review text-record-review-foreground shadow-sm",
};

export const RECORD_TYPE_SUBTLE_CLASSES: Record<RecordType, string> = {
  BLOG_TECH:
    "bg-record-tech-subtle text-record-tech-subtle-foreground",
  BLOG_DAILY:
    "bg-record-daily-subtle text-record-daily-subtle-foreground",
  DIARY:
    "bg-record-diary-subtle text-record-diary-subtle-foreground",
  REVIEW:
    "bg-record-review-subtle text-record-review-subtle-foreground",
};
