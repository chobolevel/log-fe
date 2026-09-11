"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  SUBJECT_TYPE_LABELS,
  SUBJECT_TYPE_OPTIONS,
  SUBJECT_TYPE_PILL_CLASSES,
  SUBJECT_TYPE_PLACEHOLDER,
} from "@/constants/subject";
import { PILL_SIZE } from "@/constants/ui";
import { useSubjects } from "@/hooks/subject/subject";
import { useDebounce } from "@/hooks/use-debounce";
import type { Subject, SubjectType } from "@/types/subject";

const PAGE_SIZE = 12;

interface SubjectSelectModalProps {
  value?: Subject;
  onChange: (subject: Subject) => void;
}

export function SubjectSelectModal({
  value,
  onChange,
}: SubjectSelectModalProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [typeFilter, setTypeFilter] = useState<SubjectType | undefined>(
    undefined
  );
  const [page, setPage] = useState(1);
  const debouncedTitle = useDebounce(title, 300);

  const { data, isFetching } = useSubjects(
    {
      title: debouncedTitle || undefined,
      type: typeFilter,
      page,
      size: PAGE_SIZE,
    },
    { enabled: open }
  );
  const subjects = data?.data ?? [];
  const totalPages = Math.ceil((data?.total_count ?? 0) / PAGE_SIZE);

  const handleSelect = (subject: Subject) => {
    onChange(subject);
    setOpen(false);
  };

  const handleTitleChange = (next: string) => {
    setTitle(next);
    setPage(1);
  };

  const handleTypeFilterChange = (next: SubjectType | undefined) => {
    setTypeFilter(next);
    setPage(1);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setTitle("");
      setTypeFilter(undefined);
      setPage(1);
    }
    setOpen(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="w-full justify-start font-normal"
          />
        }
      >
        {value ? (
          <span className="flex items-center gap-2">
            <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-xs", SUBJECT_TYPE_PILL_CLASSES[value.type].active)}>
              {SUBJECT_TYPE_LABELS[value.type]}
            </span>
            <span className="truncate">{value.title}</span>
          </span>
        ) : (
          <span className="text-muted-foreground">주제를 선택하세요</span>
        )}
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-4 sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>주제 선택</DialogTitle>
        </DialogHeader>

        {/* Search — pill shape, no border */}
        <div className="relative">
          <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
          <input
            type="text"
            placeholder="제목으로 검색..."
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full rounded-full bg-muted/70 py-2 pr-4 pl-10 text-sm outline-none placeholder:text-muted-foreground/40 focus:bg-muted"
          />
        </div>

        {/* Type filter pills */}
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => handleTypeFilterChange(undefined)}
            className={cn(
              PILL_SIZE.sm,
              "rounded-full font-medium transition-all",
              !typeFilter
                ? "bg-green text-green-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            전체
          </button>
          {SUBJECT_TYPE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleTypeFilterChange(option.value)}
              className={cn(
                PILL_SIZE.sm,
                "rounded-full font-medium transition-all",
                typeFilter === option.value
                  ? SUBJECT_TYPE_PILL_CLASSES[option.value].active
                  : SUBJECT_TYPE_PILL_CLASSES[option.value].inactive
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="h-[420px] overflow-y-auto">
          {isFetching && subjects.length === 0 && (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="aspect-[2/3] w-full animate-pulse rounded-2xl bg-muted" />
                  <div className="space-y-1.5 px-1">
                    <div className="h-2.5 w-10 animate-pulse rounded-full bg-muted" />
                    <div className="h-2.5 w-full animate-pulse rounded-full bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isFetching && subjects.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
              <ImageIcon className="mb-3 h-8 w-8 opacity-25" />
              <p className="text-sm">검색 결과가 없습니다.</p>
            </div>
          )}

          {subjects.length > 0 && (
            <div
              className={cn(
                "grid grid-cols-3 gap-3 sm:grid-cols-4",
                isFetching && "opacity-50"
              )}
            >
              {subjects.map((subject) => {
                const isSelected = value?.id === subject.id;
                const posterUrl = subject.images?.[0]?.url;
                return (
                  <button
                    key={subject.id}
                    type="button"
                    onClick={() => handleSelect(subject)}
                    className={cn(
                      "group flex cursor-pointer flex-col gap-2 rounded-2xl p-1.5 text-left transition-all",
                      isSelected && "bg-green-subtle"
                    )}
                  >
                    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-muted">
                      {posterUrl ? (
                        <Image
                          src={posterUrl}
                          alt={subject.images[0].name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 30vw, 160px"
                        />
                      ) : (
                        (() => {
                          const { bg, color, Icon } = SUBJECT_TYPE_PLACEHOLDER[subject.type];
                          return (
                            <div className={cn("flex h-full flex-col items-center justify-center gap-1.5", bg)}>
                              <Icon className={cn("h-7 w-7 opacity-60", color)} />
                            </div>
                          );
                        })()
                      )}
                      {isSelected ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-green/30">
                          <div className="rounded-full bg-green p-1 shadow-sm">
                            <Check className="h-3.5 w-3.5 text-green-foreground" />
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/45">
                          <span className="scale-90 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-foreground opacity-0 shadow-sm transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                            선택
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="px-1 pb-0.5">
                      <span className="mb-1 inline-block rounded-full bg-muted px-2 py-0.5 text-[10px] leading-none text-muted-foreground">
                        {SUBJECT_TYPE_LABELS[subject.type]}
                      </span>
                      <p className="line-clamp-2 text-xs font-medium leading-snug">
                        {subject.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-border/60 pt-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={page === 1 || isFetching}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
              이전
            </Button>
            <span className="text-xs text-muted-foreground">
              {page} / {totalPages}
            </span>
            <Button
              type="button"
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
      </DialogContent>
    </Dialog>
  );
}
