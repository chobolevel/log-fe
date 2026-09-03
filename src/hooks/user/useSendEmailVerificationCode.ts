"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  sendEmailVerificationCodeApi,
  type SendEmailVerificationCodeRequest,
} from "@/api/user";
import { ApiError } from "@/lib/fetcher";

export function useSendEmailVerificationCode() {
  return useMutation<boolean, ApiError, SendEmailVerificationCodeRequest>({
    mutationFn: sendEmailVerificationCodeApi,
    onSuccess: () => {
      toast.success("인증 코드가 발송되었습니다. 이메일을 확인해주세요.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
