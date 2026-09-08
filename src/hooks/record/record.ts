"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createRecordApi,
  type CreateRecordRequest,
} from "@/api/record";
import { ApiError } from "@/lib/fetcher";

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
