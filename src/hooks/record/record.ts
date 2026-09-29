"use client";

import { useEffect } from "react";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createRecordApi,
  deleteRecordApi,
  dislikeRecordApi,
  fetchRecordContributionsApi,
  getIsLikedApi,
  getRecordApi,
  likeRecordApi,
  searchRecordsApi,
  updateRecordApi,
  viewRecordApi,
  type CreateRecordRequest,
  type SearchRecordParams,
  type UpdateRecordRequest,
} from "@/api/record";
import { ApiError } from "@/lib/fetcher";
import { useMe } from "@/hooks/user/user";
import {
  hasRecentlyViewed,
  markViewed,
  unmarkViewed,
} from "@/lib/record-view-storage";
import type { Pageable } from "@/types/common";
import type {
  RecordContribution,
  RecordItem,
  RecordListItem,
} from "@/types/record";

export const RECORD_QUERY_KEY = (id: number) => ["records", id] as const;

export const RECORDS_QUERY_KEY = (params: SearchRecordParams) =>
  ["records", params] as const;

export function useRecord(id: number, initialData?: RecordItem) {
  return useQuery<RecordItem, ApiError>({
    queryKey: RECORD_QUERY_KEY(id),
    queryFn: () => getRecordApi(id),
    initialData,
  });
}

// 조회수 적립은 서버가 24시간 내 중복을 걸러주지만, 매 방문마다 요청을 보내지 않도록
// 브라우저 저장소에 마지막 요청 시각을 남겨 24시간 이내면 요청 자체를 생략한다.
export function useRecordView(id: number, { enabled = true } = {}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;
    if (hasRecentlyViewed(id)) return;

    // 요청 전에 먼저 기록해 StrictMode 이중 실행 등으로 인한 중복 요청을 막는다.
    markViewed(id);

    viewRecordApi(id)
      .then(() => {
        queryClient.invalidateQueries({
          predicate: (q) =>
            q.queryKey[0] === "records" && typeof q.queryKey[1] === "object",
        });
      })
      .catch(() => {
        unmarkViewed(id);
      });
  }, [id, enabled, queryClient]);
}

export function useIsLiked(id: number) {
  const { data: me } = useMe();
  return useQuery<boolean, ApiError>({
    queryKey: ["records", id, "liked"],
    queryFn: () => getIsLikedApi(id),
    enabled: !!me,
  });
}

export function useToggleLike(id: number) {
  const queryClient = useQueryClient();

  return useMutation<number, ApiError, boolean>({
    mutationFn: (isLiked) => isLiked ? dislikeRecordApi(id) : likeRecordApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["records", id] });
      queryClient.invalidateQueries({ queryKey: ["records"], exact: false });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteRecord() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<boolean, ApiError, number>({
    mutationFn: deleteRecordApi,
    onSuccess: () => {
      toast.success("기록이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["records"] });
      router.push("/records");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useRecords(
  params: SearchRecordParams,
  { enabled = true }: { enabled?: boolean } = {}
) {
  return useQuery<Pageable<RecordListItem>, ApiError>({
    queryKey: RECORDS_QUERY_KEY(params),
    queryFn: () => searchRecordsApi(params),
    placeholderData: keepPreviousData,
    enabled,
  });
}

export function useRecordContributions(year: number, userId: number) {
  return useQuery<RecordContribution[], ApiError>({
    queryKey: ["records", "contributions", userId, year] as const,
    queryFn: () => fetchRecordContributionsApi({ year, userId }),
  });
}

export function useUpdateRecord(id: number) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<number, ApiError, UpdateRecordRequest>({
    mutationFn: (request) => updateRecordApi(id, request),
    onSuccess: () => {
      toast.success("기록이 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["records"] });
      router.push(`/records/${id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useCreateRecord() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<number, ApiError, CreateRecordRequest>({
    mutationFn: createRecordApi,
    onSuccess: (id) => {
      toast.success("기록이 등록되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["records"] });
      router.push(`/records/${id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
