"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  checkEmailVerificationCodeApi,
  type CheckEmailVerificationCodeRequest,
} from "@/api/user";
import { ApiError } from "@/lib/fetcher";

export function useVerifyEmailVerificationCode() {
  return useMutation<string, ApiError, CheckEmailVerificationCodeRequest>({
    mutationFn: checkEmailVerificationCodeApi,
    onSuccess: () => {
      toast.success("이메일 인증이 완료되었습니다.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
