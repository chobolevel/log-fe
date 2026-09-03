"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  sendResetPasswordEmailApi,
  type SendResetPasswordEmailRequest,
} from "@/api/user";
import { ApiError } from "@/lib/fetcher";

export function useSendResetPasswordEmail() {
  return useMutation<boolean, ApiError, SendResetPasswordEmailRequest>({
    mutationFn: sendResetPasswordEmailApi,
    onSuccess: () => {
      toast.success(
        "비밀번호 초기화 이메일이 발송되었습니다. 이메일을 확인해주세요."
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
