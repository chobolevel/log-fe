"use client";

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
  type CreateRecordRequest,
  type SearchRecordParams,
} from "@/api/record";
import { ApiError } from "@/lib/fetcher";
import { useMe } from "@/hooks/user/user";
import type { Pageable } from "@/types/common";
import type { RecordItem } from "@/types/record";

export const RECORD_QUERY_KEY = (id: number) => ["records", id] as const;

export const RECORDS_QUERY_KEY = (params: SearchRecordParams) =>
  ["records", params] as const;

export function useRecord(id: number) {
  return useQuery<RecordItem, ApiError>({
    queryKey: RECORD_QUERY_KEY(id),
    queryFn: () => getRecordApi(id),
  });
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
