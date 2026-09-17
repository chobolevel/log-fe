import { api } from "@/lib/fetcher";
import type { Pageable } from "@/types/common";
import type {
  Emotion,
  EmotionCategory,
  EmotionCategoryType,
} from "@/types/emotion";

export interface SearchEmotionCategoryParams {
  name?: string;
  type?: EmotionCategoryType;
  page?: number;
  size?: number;
  order_types?: ("ORDER_ASC" | "ORDER_DESC")[];
}

export interface SearchEmotionParams {
  emotion_category_id?: number;
  name?: string;
  page?: number;
  size?: number;
  order_types?: ("ORDER_ASC" | "ORDER_DESC")[];
}

function buildOrderQuery(params: {
  page?: number;
  size?: number;
  order_types?: ("ORDER_ASC" | "ORDER_DESC")[];
}): URLSearchParams {
  const qs = new URLSearchParams();
  qs.append("page", String(params.page ?? 1));
  qs.append("size", String(params.size ?? 100));
  const orders = params.order_types ?? ["ORDER_ASC"];
  orders.forEach((o) => qs.append("order_types", o));
  return qs;
}

export const searchEmotionCategoriesApi = (
  params: SearchEmotionCategoryParams = {}
) => {
  const qs = buildOrderQuery(params);
  if (params.name) qs.append("name", params.name);
  if (params.type) qs.append("type", params.type);
  return api.get<Pageable<EmotionCategory>>(
    `/api/v1/emotion-categories?${qs.toString()}`
  );
};

export const searchEmotionsApi = (params: SearchEmotionParams = {}) => {
  const qs = buildOrderQuery(params);
  if (params.emotion_category_id)
    qs.append("emotionCategoryId", String(params.emotion_category_id));
  if (params.name) qs.append("name", params.name);
  return api.get<Pageable<Emotion>>(`/api/v1/emotions?${qs.toString()}`);
};
