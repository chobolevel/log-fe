"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  RecordCard,
  RecordCardSkeleton,
} from "@/components/record/record-card";
import {
  RECORD_TYPE_ACTIVE_CLASSES,
  RECORD_TYPE_OPTIONS,
} from "@/constants/record";
import { PILL_SIZE } from "@/constants/ui";
import { useRecords } from "@/hooks/record/record";
import type { RecordType } from "@/types/record";

const PAGE_SIZE = 12;

export function RecordList() {
  const [typeFilter, setTypeFilter] = useState<RecordType | undefined>(
    undefined
  );
  const [page, setPage] = useState(1);

  const { data, isFetching } = useRecords({
    type: typeFilter,
    page,
    size: PAGE_SIZE,
    orderTypes: ["CREATED_AT_DESC"],
  });

  const records = data?.data ?? [];
  const totalPages = Math.ceil((data?.total_count ?? 0) / PAGE_SIZE);

  const handleTypeChange = (type: RecordType | undefined) => {
    setTypeFilter(type);
    setPage(1);
  };

  return (
    <div className="w-full">
      {/* Type filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => handleTypeChange(undefined)}
          className={cn(
            PILL_SIZE.md,
            "rounded-full font-medium transition-all",
            !typeFilter
              ? "bg-green text-green-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          전체
        </button>
        {RECORD_TYPE_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleTypeChange(option.value)}
            className={cn(
              PILL_SIZE.md,
              "rounded-full font-medium transition-all",
              typeFilter === option.value
                ? RECORD_TYPE_ACTIVE_CLASSES[option.value]
                : "bg-muted text-muted-foreground"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {isFetching && records.length === 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <RecordCardSkeleton key={i} />
          ))}
        </div>
      ) : records.length === 0 ? (
        <div className="flex w-full flex-col items-center justify-center py-24 text-muted-foreground">
          <p className="text-sm">
            아직 기록이 없어요. 가장 먼저 기록을 남겨보세요!
          </p>
        </div>
      ) : (
        <div
          className={cn(
            "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
            isFetching && "opacity-60 transition-opacity"
          )}
        >
          {records.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={page === 1 || isFetching}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
            이전
          </Button>
          <span className="px-2 text-sm text-muted-foreground">
            {page} / {totalPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            disabled={page >= totalPages || isFetching}
            onClick={() => setPage((p) => p + 1)}
          >
            다음
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
