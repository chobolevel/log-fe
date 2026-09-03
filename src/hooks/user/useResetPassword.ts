"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { resetPasswordApi, type ResetPasswordRequest } from "@/api/user";
import { ApiError } from "@/lib/fetcher";

export function useResetPassword() {
  const router = useRouter();

  return useMutation<boolean, ApiError, ResetPasswordRequest>({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success("비밀번호가 초기화되었습니다.");
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
