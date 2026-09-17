export type EmotionCategoryType = "POSITIVE" | "NEGATIVE" | "NEUTRAL";

export interface EmotionCategory {
  id: number;
  name: string;
  type: EmotionCategoryType;
  order: number;
  created_at: number;
  updated_at: number;
}

export interface Emotion {
  id: number;
  emotion_category: EmotionCategory;
  name: string;
  order: number;
  created_at: number;
  updated_at: number;
}
