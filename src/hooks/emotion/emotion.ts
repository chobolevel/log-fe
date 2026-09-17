"use client";

import { useQuery } from "@tanstack/react-query";
import {
  searchEmotionCategoriesApi,
  searchEmotionsApi,
  type SearchEmotionCategoryParams,
  type SearchEmotionParams,
} from "@/api/emotion";
import { ApiError } from "@/lib/fetcher";
import type { Pageable } from "@/types/common";
import type { Emotion, EmotionCategory } from "@/types/emotion";

export const EMOTION_CATEGORIES_QUERY_KEY = (
  params: SearchEmotionCategoryParams
) => ["emotion-categories", params] as const;

export const EMOTIONS_QUERY_KEY = (params: SearchEmotionParams) =>
  ["emotions", params] as const;

export function useEmotionCategories(params: SearchEmotionCategoryParams = {}) {
  return useQuery<Pageable<EmotionCategory>, ApiError>({
    queryKey: EMOTION_CATEGORIES_QUERY_KEY(params),
    queryFn: () => searchEmotionCategoriesApi(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useEmotions(params: SearchEmotionParams = {}) {
  return useQuery<Pageable<Emotion>, ApiError>({
    queryKey: EMOTIONS_QUERY_KEY(params),
    queryFn: () => searchEmotionsApi(params),
    staleTime: 5 * 60 * 1000,
  });
}
