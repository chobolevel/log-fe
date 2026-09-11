"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  RECORD_TYPE_LABELS,
  RECORD_TYPE_SUBTLE_CLASSES,
} from "@/constants/record";
import {
  SUBJECT_TYPE_LABELS,
  SUBJECT_TYPE_PLACEHOLDER,
} from "@/constants/subject";
import { useRecord, useDeleteRecord } from "@/hooks/record/record";
import { useMe } from "@/hooks/user/user";
import type { RecordType } from "@/types/record";

function formatDate(timestamp: number): string {
  const d = new Date(timestamp);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}


interface RecordDetailProps {
  id: number;
}

export function RecordDetail({ id }: RecordDetailProps) {
  const router = useRouter();
  const { data: record, isLoading, isError } = useRecord(id);
  const { data: me } = useMe();
  const { mutate: deleteRecord, isPending: isDeleting } = useDeleteRecord();

  if (isLoading) return <RecordDetailSkeleton />;

  if (isError || !record) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-muted-foreground">기록을 불러올 수 없습니다.</p>
        <Button variant="ghost" size="sm" onClick={() => router.push("/records")}>
          <ArrowLeft className="h-4 w-4" />
          목록으로
        </Button>
      </div>
    );
  }

  const { type, title, content, writer, review, created_at } = record;
  const isAuthor = me?.id === writer.id;
  const posterUrl = review?.subject?.images?.[0]?.url;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-6 md:px-6 md:py-10">
      {/* 뒤로가기 */}
      <Link
        href="/records"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        기록 목록
      </Link>

      {/* 리뷰 포스터 */}
      {type === "REVIEW" && (
        <div className="relative mb-6 h-52 w-full overflow-hidden rounded-2xl bg-black md:h-72">
          {/* 블러 배경 */}
          {posterUrl && (
            <Image
              src={posterUrl}
              alt=""
              fill
              aria-hidden
              className="scale-110 object-cover opacity-40 blur-2xl brightness-50"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          )}
          {/* 세로 비율 포스터 */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            {posterUrl ? (
              <div className="relative aspect-[2/3] h-full max-h-44 overflow-hidden rounded-xl shadow-2xl md:max-h-60">
                <Image
                  src={posterUrl}
                  alt={review!.subject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 40vw, 240px"
                  priority
                />
              </div>
            ) : review?.subject ? (
              (() => {
                const { bg, color, Icon } = SUBJECT_TYPE_PLACEHOLDER[review.subject.type];
                return (
                  <div className={cn("flex h-full w-full flex-col items-center justify-center gap-3", bg)}>
                    <Icon className={cn("h-14 w-14 opacity-40", color)} />
                    <span className={cn("text-sm font-semibold opacity-60", color)}>
                      {SUBJECT_TYPE_LABELS[review.subject.type]}
                    </span>
                  </div>
                );
              })()
            ) : null}
          </div>

          {/* 별점 오버레이 */}
          {review && (
            <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
              <span className="text-yellow-400">★</span>
              {review.rating}
            </div>
          )}
        </div>
      )}

      {/* 타입 뱃지 + 제목 */}
      <div className="mb-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", RECORD_TYPE_SUBTLE_CLASSES[type])}>
            {RECORD_TYPE_LABELS[type]}
          </span>
          {type === "REVIEW" && review?.subject && (
            <span className="text-sm text-muted-foreground">
              {review.subject.title}
            </span>
          )}
        </div>
        <h1 className="text-2xl font-black leading-snug tracking-tight md:text-3xl">
          {title}
        </h1>
      </div>

      {/* 작성자 + 날짜 + 액션 */}
      <div className="mb-8 flex items-center gap-3 border-b border-border/60 pb-6">
        <Avatar className="h-8 w-8">
          <AvatarImage src={writer.profile_image?.url} alt={writer.nickname} />
          <AvatarFallback className="text-xs font-bold">
            {writer.nickname.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{writer.nickname}</span>
          <span className="text-xs text-muted-foreground">{formatDate(created_at)}</span>
        </div>

        {isAuthor && (
          <div className="ml-auto flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 rounded-full px-3 text-xs"
              onClick={() => router.push(`/records/${id}/edit`)}
            >
              <Pencil className="h-3.5 w-3.5" />
              수정
            </Button>
            <AlertDialog>
              <AlertDialogTrigger
                className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-3 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
              >
                <Trash2 className="h-3.5 w-3.5" />
                삭제
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>기록을 삭제할까요?</AlertDialogTitle>
                  <AlertDialogDescription>
                    삭제된 기록은 복구할 수 없습니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    disabled={isDeleting}
                    onClick={() => deleteRecord(id)}
                  >
                    {isDeleting ? "삭제 중..." : "삭제"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>

      {/* 본문 */}
      <div
        className="ProseMirror !min-h-0 !p-0"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}

export function RecordDetailSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 md:px-6 md:py-10">
      <Skeleton className="mb-6 h-5 w-24 rounded-full" />
      <Skeleton className="mb-6 h-48 w-full rounded-2xl md:h-64" />
      <Skeleton className="mb-2 h-4 w-16 rounded-full" />
      <Skeleton className="mb-1 h-8 w-3/4 rounded-xl" />
      <Skeleton className="mb-8 h-8 w-1/2 rounded-xl" />
      <div className="mb-8 flex items-center gap-3 border-b border-border/60 pb-6">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-20 rounded-full" />
          <Skeleton className="h-3 w-24 rounded-full" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full rounded-full" style={{ width: `${85 - i * 5}%` }} />
        ))}
      </div>
    </div>
  );
}
