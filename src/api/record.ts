import { api } from "@/lib/fetcher";
import { buildPageQuery } from "@/lib/query";
import type { RecordItem, RecordType } from "@/types/record";
import type { Pageable } from "@/types/common";

export interface CreateRecordReviewRequest {
  subject_id: number;
  rating: number;
}

export interface CreateRecordEmotionRequest {
  emotion_id: number;
  intensity: number;
}

export interface CreateRecordRequest {
  type: RecordType;
  title: string;
  content: string;
  is_private: boolean;
  tags: string[];
  review?: CreateRecordReviewRequest;
  emotion?: CreateRecordEmotionRequest;
}

export interface UpdateRecordRequest {
  type?: RecordType;
  title?: string;
  content?: string;
  is_private?: boolean;
  tags?: string[];
  review?: CreateRecordReviewRequest;
  emotion?: CreateRecordEmotionRequest;
  update_mask: ("TYPE" | "TITLE" | "CONTENT" | "IS_PRIVATE" | "TAGS")[];
}

export interface SearchRecordParams {
  userId?: number;
  type?: RecordType;
  title?: string;
  tag_name?: string;
  page?: number;
  size?: number;
  order_types?: (
    "CREATED_AT_ASC" | "CREATED_AT_DESC" | "UPDATED_AT_ASC" | "UPDATED_AT_DESC"
  )[];
}

function buildRecordQuery(params: SearchRecordParams): string {
  const qs = buildPageQuery(params);
  if (params.userId) qs.append("userId", String(params.userId));
  if (params.type) qs.append("type", params.type);
  if (params.title) qs.append("title", params.title);
  if (params.tag_name) qs.append("tagName", params.tag_name);
  return qs.toString();
}

export const createRecordApi = (request: CreateRecordRequest) =>
  api.post<number>("/api/v1/records", request);

export const getRecordApi = (id: number) =>
  api.get<RecordItem>(`/api/v1/records/${id}`);

export const updateRecordApi = (id: number, request: UpdateRecordRequest) =>
  api.put<number>(`/api/v1/records/${id}`, request);

export const deleteRecordApi = (id: number) =>
  api.delete<boolean>(`/api/v1/records/${id}`);

export const searchRecordsApi = (params: SearchRecordParams) =>
  api.get<Pageable<RecordItem>>(`/api/v1/records?${buildRecordQuery(params)}`);

export const likeRecordApi = (id: number) =>
  api.post<number>(`/api/v1/records/${id}/like`, {});

export const dislikeRecordApi = (id: number) =>
  api.post<number>(`/api/v1/records/${id}/dislike`, {});

export const getIsLikedApi = (id: number) =>
  api.get<boolean>(`/api/v1/records/${id}/likes/me`);
