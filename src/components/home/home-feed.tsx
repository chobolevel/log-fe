"use client";

import Link from "next/link";
import { BookOpen, Code2, PenLine, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  RecordCard,
  RecordCardSkeleton,
} from "@/components/record/record-card";
import { useRecords } from "@/hooks/record/record";
import type { RecordType } from "@/types/record";

interface SectionDef {
  type: RecordType;
  label: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

const SECTIONS: SectionDef[] = [
  {
    type: "BLOG_TECH",
    label: "기술 블로그",
    icon: Code2,
    color: "text-record-tech",
    bg: "bg-record-tech-subtle",
  },
  {
    type: "BLOG_DAILY",
    label: "일상 블로그",
    icon: PenLine,
    color: "text-record-daily",
    bg: "bg-record-daily-subtle",
  },
  {
    type: "DIARY",
    label: "일기",
    icon: BookOpen,
    color: "text-record-diary",
    bg: "bg-record-diary-subtle",
  },
  {
    type: "REVIEW",
    label: "리뷰",
    icon: Star,
    color: "text-record-review",
    bg: "bg-record-review-subtle",
  },
];

function TypeSection({ type, label, icon: Icon, color, bg }: SectionDef) {
  const { data, isFetching } = useRecords({
    type,
    size: 3,
    order_types: ["CREATED_AT_DESC"],
  });
  const records = data?.data ?? [];

  if (!isFetching && records.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn("rounded-lg p-1.5", bg)}>
            <Icon className={cn("h-4 w-4", color)} />
          </div>
          <h2 className="text-base font-bold tracking-tight">{label}</h2>
        </div>
        <Link
          href={`/records?type=${type}`}
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          전체 보기 →
        </Link>
      </div>

      {isFetching ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <RecordCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:overflow-visible sm:px-0">
          <div className="flex w-max gap-4 sm:w-auto sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {records.map((record) => (
              <div key={record.id} className="w-72 shrink-0 sm:w-auto">
                <RecordCard record={record} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default function HomeFeed() {
  return (
    <div>
      {SECTIONS.map((section) => (
        <TypeSection key={section.type} {...section} />
      ))}
    </div>
  );
}
