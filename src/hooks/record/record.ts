"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createRecordApi,
  searchRecordsApi,
  type CreateRecordRequest,
  type SearchRecordParams,
} from "@/api/record";
import { ApiError } from "@/lib/fetcher";
import type { Pageable } from "@/types/common";
import type { RecordItem } from "@/types/record";

export const RECORDS_QUERY_KEY = (params: SearchRecordParams) =>
  ["records", params] as const;

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
