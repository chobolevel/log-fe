"use client";

import { useEffect } from "react";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createRecordApi,
  deleteRecordApi,
  dislikeRecordApi,
  getIsLikedApi,
  getRecordApi,
  likeRecordApi,
  searchRecordsApi,
  updateRecordApi,
  type CreateRecordRequest,
  type SearchRecordParams,
  type UpdateRecordRequest,
} from "@/api/record";
import { ApiError } from "@/lib/fetcher";
import { useMe } from "@/hooks/user/user";
import type { Pageable } from "@/types/common";
import type { RecordItem } from "@/types/record";

export const RECORD_QUERY_KEY = (id: number) => ["records", id] as const;

export const RECORDS_QUERY_KEY = (params: SearchRecordParams) =>
  ["records", params] as const;

export function useRecord(id: number) {
  const queryClient = useQueryClient();
  const query = useQuery<RecordItem, ApiError>({
    queryKey: RECORD_QUERY_KEY(id),
    queryFn: () => getRecordApi(id),
  });

  // 상세 조회 시 서버에서 조회수가 증가하므로, 목록 캐시(조회수 표시)를 stale 처리해 재방문 시 최신화되도록 한다.
  // 목록 조회 쿼리(queryKey: ["records", params])만 대상으로 하고, 이 훅이 구독 중인 단건 조회 쿼리는 제외해
  // 재조회로 인한 조회수 중복 증가를 방지한다.
  useEffect(() => {
    if (!query.data) return;
    queryClient.invalidateQueries({
      predicate: (q) =>
        q.queryKey[0] === "records" && typeof q.queryKey[1] === "object",
    });
  }, [query.data, queryClient]);

  return query;
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

export function useRecords(params: SearchRecordParams) {
  return useQuery<Pageable<RecordItem>, ApiError>({
    queryKey: RECORDS_QUERY_KEY(params),
    queryFn: () => searchRecordsApi(params),
    placeholderData: keepPreviousData,
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
