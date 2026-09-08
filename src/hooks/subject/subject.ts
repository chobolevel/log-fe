"use client";

import { useQuery } from "@tanstack/react-query";
import { searchSubjectsApi, type SearchSubjectParams } from "@/api/subject";
import { ApiError } from "@/lib/fetcher";
import type { Pageable } from "@/types/common";
import type { Subject } from "@/types/subject";

export const SUBJECTS_QUERY_KEY = (params: SearchSubjectParams) =>
  ["subjects", params] as const;

export function useSubjects(params: SearchSubjectParams) {
  return useQuery<Pageable<Subject>, ApiError>({
    queryKey: SUBJECTS_QUERY_KEY(params),
    queryFn: () => searchSubjectsApi(params),
    enabled: (params.title?.length ?? 0) >= 1,
  });
}
