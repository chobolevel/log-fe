"use client";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { EMOTION_CATEGORY_TYPE_CLASSES } from "@/constants/emotion";
import { useEmotionCategories, useEmotions } from "@/hooks/emotion/emotion";
import type { Emotion } from "@/types/emotion";

interface EmotionSelectTableProps {
  value?: Emotion;
  onChange: (emotion: Emotion) => void;
}

export function EmotionSelectTable({
  value,
  onChange,
}: EmotionSelectTableProps) {
  const { data: categoryData, isLoading: isCategoriesLoading } =
    useEmotionCategories();
  const { data: emotionData, isLoading: isEmotionsLoading } = useEmotions();

  const categories = categoryData?.data ?? [];
  const emotions = emotionData?.data ?? [];

  if (isCategoriesLoading || isEmotionsLoading) {
    return (
      <div className="grid grid-cols-4 gap-px overflow-hidden rounded-xl bg-border/60">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2 bg-card p-3">
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-6 w-full rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <p className="rounded-xl bg-muted/40 px-4 py-6 text-center text-sm text-muted-foreground">
        등록된 감정 카테고리가 없습니다.
      </p>
    );
  }

  return (
    <div
      className="grid gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60"
      style={{
        gridTemplateColumns: `repeat(${categories.length}, minmax(0, 1fr))`,
      }}
    >
      {categories.map((category) => {
        const { text, bg } = EMOTION_CATEGORY_TYPE_CLASSES[category.type];
        const categoryEmotions = emotions.filter(
          (emotion) => emotion.emotion_category.id === category.id
        );

        return (
          <div key={category.id} className="flex flex-col bg-card">
            <div
              className={cn(
                "px-2 py-2 text-center text-xs font-semibold",
                bg,
                text
              )}
            >
              {category.name}
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1.5">
              {categoryEmotions.length === 0 ? (
                <span className="py-2 text-center text-xs text-muted-foreground/40">
                  -
                </span>
              ) : (
                categoryEmotions.map((emotion) => {
                  const isSelected = value?.id === emotion.id;
                  return (
                    <button
                      key={emotion.id}
                      type="button"
                      onClick={() => onChange(emotion)}
                      className={cn(
                        "rounded-lg px-2 py-1.5 text-xs font-medium transition-colors",
                        isSelected
                          ? "bg-green text-green-foreground"
                          : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {emotion.name}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
