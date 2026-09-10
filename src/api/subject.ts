import { api } from "@/lib/fetcher";
import { buildPageQuery } from "@/lib/query";
import type { Subject, SubjectType } from "@/types/subject";
import type { Pageable } from "@/types/common";

export interface SearchSubjectParams {
  type?: SubjectType;
  title?: string;
  page?: number;
  size?: number;
}

function buildSubjectQuery(params: SearchSubjectParams): string {
  const qs = buildPageQuery(params);
  if (params.type) qs.append("type", params.type);
  if (params.title) qs.append("title", params.title);
  return qs.toString();
}

export const searchSubjectsApi = (params: SearchSubjectParams) =>
  api.get<Pageable<Subject>>(`/api/v1/subjects?${buildSubjectQuery(params)}`);
