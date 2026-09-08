"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RecordEditor } from "@/components/record/record-editor";
import { SubjectCombobox } from "@/components/record/subject-combobox";
import { StarRating } from "@/components/record/star-rating";
import { useCreateRecord } from "@/hooks/record/record";
import {
  RECORD_TYPE_OPTIONS,
  RECORD_TYPE_ACTIVE_CLASSES,
} from "@/constants/record";
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
    },
  });

  const watchType = watch("type");
  const watchIsPrivate = watch("is_private");
  const isReview = watchType === "REVIEW";

  const onSubmit = (values: FormValues) => {
    createRecord({
      type: values.type,
      title: values.title,
      content: values.content,
      is_private: values.is_private,
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
                  "rounded-full px-3 py-1 text-xs font-medium transition-all",
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
                  "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors",
                  watchIsPrivate ? "bg-green" : "bg-input"
                )}
              >
                <span
                  className={cn(
                    "inline-block h-3.5 w-3.5 translate-x-0.5 rounded-full bg-white shadow-sm transition-transform",
                    watchIsPrivate && "translate-x-[1.125rem]"
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
            className="w-full bg-transparent text-[1.75rem] font-bold leading-tight placeholder:text-muted-foreground/30 focus:outline-none"
          />
          {errors.title && (
            <p className="mt-1.5 text-xs text-destructive">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="mb-8 h-px bg-border/60" />

        {/* Review info (REVIEW type only) */}
        {isReview && (
          <div className="mb-6 space-y-4 rounded-2xl bg-muted/40 px-5 py-4">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              리뷰 정보
            </p>
            <div className="space-y-3">
              <Controller
                control={control}
                name="subject"
                render={({ field }) => (
                  <SubjectCombobox
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
              {errors.rating && (
                <p className="text-xs text-destructive">
                  {errors.rating.message}
                </p>
              )}
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
