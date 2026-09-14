"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RecordEditor } from "@/components/record/record-editor";
import { TagInput } from "@/components/record/tag-input";
import { SubjectSelectModal } from "@/components/subject/subject-select-modal";
import { StarRating } from "@/components/record/star-rating";
import { useCreateRecord } from "@/hooks/record/record";
import {
  RECORD_TYPE_OPTIONS,
  RECORD_TYPE_ACTIVE_CLASSES,
} from "@/constants/record";
import { SUBJECT_TYPE_PLACEHOLDER } from "@/constants/subject";
import { PILL_SIZE } from "@/constants/ui";
import type { RecordType } from "@/types/record";
import type { Subject } from "@/types/subject";

const schema = z
  .object({
    type: z.enum(["BLOG_TECH", "BLOG_DAILY", "DIARY", "REVIEW"]),
    title: z
      .string()
      .min(1, "제목을 입력해주세요.")
      .max(200, "제목은 200자 이하여야 합니다."),
    content: z.string().min(1, "내용을 입력해주세요."),
    is_private: z.boolean(),
    tags: z.array(z.string()),
    subject: z.custom<Subject>().optional(),
    rating: z.number().min(0.5).max(5).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "REVIEW") {
      if (!data.subject) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "주제를 선택해주세요.",
          path: ["subject"],
        });
      }
      if (!data.rating) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "별점을 선택해주세요.",
          path: ["rating"],
        });
      }
    }
  });

type FormValues = z.infer<typeof schema>;

export function RecordWriteForm() {
  const { mutate: createRecord, isPending } = useCreateRecord();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "BLOG_TECH",
      title: "",
      content: "",
      is_private: false,
      tags: [],
    },
  });

  const watchType = watch("type");
  const watchIsPrivate = watch("is_private");
  const watchSubject = watch("subject");
  const isReview = watchType === "REVIEW";

  const onSubmit = (values: FormValues) => {
    createRecord({
      type: values.type,
      title: values.title,
      content: values.content,
      is_private: values.is_private,
      tags: values.tags,
      ...(isReview && values.subject && values.rating
        ? { review: { subject_id: values.subject.id, rating: values.rating } }
        : {}),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {/* Sticky action bar */}
      <div className="sticky top-14 z-40 border-b border-border/60 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3">
          {/* Type pill chips */}
          <div className="flex flex-wrap gap-1.5">
            {RECORD_TYPE_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setValue("type", value as RecordType)}
                className={cn(
                  PILL_SIZE.md,
                  "rounded-full font-medium transition-all",
                  watchType === value
                    ? RECORD_TYPE_ACTIVE_CLASSES[value as RecordType]
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Private toggle + submit */}
          <div className="flex shrink-0 items-center gap-4">
            <button
              type="button"
              role="switch"
              aria-checked={watchIsPrivate}
              onClick={() => setValue("is_private", !watchIsPrivate)}
              className="flex items-center gap-2"
            >
              <span
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
                  watchIsPrivate ? "bg-green" : "bg-input"
                )}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 translate-x-1 rounded-full bg-white shadow-sm transition-transform",
                    watchIsPrivate && "translate-x-6"
                  )}
                />
              </span>
              <span className="text-sm text-muted-foreground select-none">
                비공개
              </span>
            </button>

            <Button
              type="submit"
              disabled={isPending}
              size="sm"
              className="rounded-full bg-green px-5 text-green-foreground hover:bg-green/85"
            >
              {isPending ? "등록 중..." : "등록하기"}
            </Button>
          </div>
        </div>
      </div>

      {/* Writing area */}
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        {/* Ghost title */}
        <div className="mb-3">
          <input
            {...register("title")}
            placeholder="제목을 입력하세요"
            className="w-full bg-transparent text-[1.75rem] leading-tight font-bold placeholder:text-muted-foreground/30 focus:outline-none"
          />
          {errors.title && (
            <p className="mt-1.5 text-xs text-destructive">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="mb-4 h-px bg-border/60" />

        {/* 태그 */}
        <div className="mb-6">
          <Controller
            control={control}
            name="tags"
            render={({ field }) => (
              <TagInput value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        {/* Review info (REVIEW type only) */}
        {isReview && (
          <div className="mb-6 rounded-2xl bg-muted/40 px-5 py-4">
            <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              리뷰 정보
            </p>
            <div className="flex gap-4">
              {/* Poster */}
              <div className="relative h-48 w-32 shrink-0 overflow-hidden rounded-xl bg-muted">
                {watchSubject?.images?.[0] ? (
                  <Image
                    src={watchSubject.images[0].url}
                    alt={watchSubject.images[0].name}
                    fill
                    className="object-cover"
                  />
                ) : watchSubject ? (
                  (() => {
                    const { bg, color, Icon } = SUBJECT_TYPE_PLACEHOLDER[watchSubject.type];
                    return (
                      <div className={cn("flex h-full flex-col items-center justify-center gap-2", bg)}>
                        <Icon className={cn("h-8 w-8 opacity-60", color)} />
                      </div>
                    );
                  })()
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-1.5 text-muted-foreground/40">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-3">
                <Controller
                  control={control}
                  name="subject"
                  render={({ field }) => (
                    <SubjectSelectModal
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.subject && (
                  <p className="text-xs text-destructive">
                    {errors.subject.message as string}
                  </p>
                )}
                <Controller
                  control={control}
                  name="rating"
                  render={({ field }) => (
                    <StarRating
                      value={field.value ?? 0}
                      onChange={field.onChange}
                    />
                  )}
                />
                {watchSubject?.description && (
                  <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                    {watchSubject.description}
                  </p>
                )}
                {errors.rating && (
                  <p className="text-xs text-destructive">
                    {errors.rating.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Content editor */}
        <div>
          <Controller
            control={control}
            name="content"
            render={({ field }) => (
              <RecordEditor
                value={field.value}
                onChange={field.onChange}
                placeholder="내용을 입력하세요..."
              />
            )}
          />
          {errors.content && (
            <p className="mt-1.5 text-xs text-destructive">
              {errors.content.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
