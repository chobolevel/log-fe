import { api } from "@/lib/fetcher";
import type { Subject, SubjectType } from "@/types/subject";
import type { Pageable } from "@/types/common";

export interface SearchSubjectParams {
  type?: SubjectType;
  title?: string;
  page?: number;
  size?: number;
}

function buildSubjectQuery(params: SearchSubjectParams): string {
  const qs = new URLSearchParams();
  if (params.type) qs.append("filter.type", params.type);
  if (params.title) qs.append("filter.title", params.title);
  qs.append("pageRequest.page", String(params.page ?? 0));
  qs.append("pageRequest.size", String(params.size ?? 20));
  qs.append("pageRequest.orderTypes", "CREATED_AT_DESC");
  return qs.toString();
}

export const searchSubjectsApi = (params: SearchSubjectParams) =>
  api.get<Pageable<Subject>>(`/api/v1/subjects?${buildSubjectQuery(params)}`);
