import { api } from "@/lib/fetcher";
import type { RecordItem, RecordType } from "@/types/record";
import type { Pageable } from "@/types/common";

export interface CreateRecordReviewRequest {
  subject_id: number;
  rating: number;
}

export interface CreateRecordRequest {
  type: RecordType;
  title: string;
  content: string;
  is_private: boolean;
  review?: CreateRecordReviewRequest;
}

export interface UpdateRecordRequest {
  type?: RecordType;
  title?: string;
  content?: string;
  is_private?: boolean;
  review?: CreateRecordReviewRequest;
  update_mask: ("TYPE" | "TITLE" | "CONTENT" | "IS_PRIVATE")[];
}

export interface SearchRecordParams {
  userId?: number;
  type?: RecordType;
  title?: string;
  page?: number;
  size?: number;
  orderTypes?: ("CREATED_AT_ASC" | "CREATED_AT_DESC" | "UPDATED_AT_ASC" | "UPDATED_AT_DESC")[];
}

function buildRecordQuery(params: SearchRecordParams): string {
  const qs = new URLSearchParams();
  if (params.userId) qs.append("filter.userId", String(params.userId));
  if (params.type) qs.append("filter.type", params.type);
  if (params.title) qs.append("filter.title", params.title);
  qs.append("pageRequest.page", String(params.page ?? 0));
  qs.append("pageRequest.size", String(params.size ?? 20));
  const orders = params.orderTypes ?? ["CREATED_AT_DESC"];
  orders.forEach((o) => qs.append("pageRequest.orderTypes", o));
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
