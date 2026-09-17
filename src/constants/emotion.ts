import type { EmotionCategoryType } from "@/types/emotion";

export const EMOTION_CATEGORY_TYPE_LABELS: Record<EmotionCategoryType, string> =
  {
    POSITIVE: "긍정",
    NEGATIVE: "부정",
    NEUTRAL: "중립",
  };

export const EMOTION_CATEGORY_TYPE_CLASSES: Record<
  EmotionCategoryType,
  { text: string; bg: string; dot: string }
> = {
  POSITIVE: {
    text: "text-amber-500",
    bg: "bg-amber-500/10",
    dot: "bg-amber-500",
  },
  NEGATIVE: { text: "text-blue-400", bg: "bg-blue-500/10", dot: "bg-blue-400" },
  NEUTRAL: {
    text: "text-slate-400",
    bg: "bg-slate-500/10",
    dot: "bg-slate-400",
  },
};
