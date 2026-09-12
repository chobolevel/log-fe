"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Code2, Heart, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  RECORD_TYPE_LABELS,
  RECORD_TYPE_SUBTLE_CLASSES,
} from "@/constants/record";
import {
  SUBJECT_TYPE_LABELS,
  SUBJECT_TYPE_PLACEHOLDER,
} from "@/constants/subject";
import type { RecordItem, RecordType } from "@/types/record";

const TYPE_HEADER_BG: Record<RecordType, string> = {
  BLOG_TECH: "bg-record-tech-subtle",
  BLOG_DAILY: "bg-record-daily-subtle",
  DIARY: "bg-record-diary-subtle",
  REVIEW: "bg-muted",
};

const TYPE_ICON_COLOR: Record<RecordType, string> = {
  BLOG_TECH: "text-record-tech",
  BLOG_DAILY: "text-record-daily",
  DIARY: "text-record-diary",
  REVIEW: "text-muted-foreground",
};

const TYPE_ICON = {
  BLOG_TECH: Code2,
  BLOG_DAILY: PenLine,
  DIARY: BookOpen,
} as const;

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function formatDate(timestamp: number): string {
  const d = new Date(timestamp);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

interface RecordCardProps {
  record: RecordItem;
}

export function RecordCard({ record }: RecordCardProps) {
  const { id, type, title, content, writer, review, like_count, created_at } = record;
  const posterUrl = review?.subject?.images?.[0]?.url;
  const Icon = type !== "REVIEW" ? TYPE_ICON[type as keyof typeof TYPE_ICON] : null;

  return (
    <Link
      href={`/records/${id}`}
      className="group block overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:border-border hover:shadow-sm"
    >
      {/* Header */}
      <div className={cn("relative h-36 overflow-hidden", type === "REVIEW" ? "bg-black" : TYPE_HEADER_BG[type])}>
        {type === "REVIEW" ? (
          <>
            {/* 블러 배경 */}
            {posterUrl && (
              <Image
                src={posterUrl}
                alt=""
                fill
                aria-hidden
                className="scale-110 object-cover opacity-40 blur-xl brightness-50"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            )}
            {/* 세로 비율 포스터 */}
            <div className="absolute inset-0 flex items-center justify-center p-3">
              {posterUrl ? (
                <div className="relative aspect-[2/3] h-full max-h-28 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={posterUrl}
                    alt={review!.subject.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              ) : review?.subject ? (
                (() => {
                  const { bg, color, Icon } = SUBJECT_TYPE_PLACEHOLDER[review.subject.type];
                  return (
                    <div className={cn("flex h-full w-full flex-col items-center justify-center gap-2", bg)}>
                      <Icon className={cn("h-8 w-8 opacity-60", color)} />
                      <span className={cn("text-[10px] font-semibold opacity-80", color)}>
                        {SUBJECT_TYPE_LABELS[review.subject.type]}
                      </span>
                    </div>
                  );
                })()
              ) : null}
            </div>
            {review && (
              <div className="absolute right-2.5 bottom-2.5 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                <span className="text-yellow-400">★</span>
                {review.rating}
              </div>
            )}
          </>
        ) : (
          <div className={cn("flex h-full items-center justify-center", TYPE_ICON_COLOR[type])}>
            {Icon && <Icon className="h-12 w-12 opacity-15" />}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="mb-2 flex items-center gap-1.5 overflow-hidden">
          <span
            className={cn(
              "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
              RECORD_TYPE_SUBTLE_CLASSES[type]
            )}
          >
            {RECORD_TYPE_LABELS[type]}
          </span>
          {type === "REVIEW" && review?.subject && (
            <span className="truncate text-[10px] text-muted-foreground">
              {review.subject.title}
            </span>
          )}
        </div>
        <h3 className="mb-1.5 line-clamp-2 text-sm font-bold leading-snug">
          {title}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {stripHtml(content) || " "}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 border-t border-border/40 px-4 py-2.5">
        <Avatar className="h-5 w-5">
          <AvatarImage src={writer.profile_image?.url} alt={writer.nickname} />
          <AvatarFallback className="text-[8px] font-bold">
            {writer.nickname.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground">{writer.nickname}</span>
        <div className="ml-auto flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Heart className="h-3 w-3" />
            {like_count}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDate(created_at)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function RecordCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
      <div className="h-36 animate-pulse bg-muted" />
      <div className="p-4">
        <div className="mb-2 h-4 w-14 animate-pulse rounded-full bg-muted" />
        <div className="mb-1.5 h-4 w-full animate-pulse rounded-full bg-muted" />
        <div className="mb-1 h-4 w-4/5 animate-pulse rounded-full bg-muted" />
        <div className="h-3 w-3/5 animate-pulse rounded-full bg-muted" />
      </div>
      <div className="flex items-center gap-2 border-t border-border/40 px-4 py-2.5">
        <div className="h-5 w-5 animate-pulse rounded-full bg-muted" />
        <div className="h-3 w-14 animate-pulse rounded-full bg-muted" />
        <div className="ml-auto h-3 w-18 animate-pulse rounded-full bg-muted" />
      </div>
    </div>
  );
}
