"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginApi, type LoginRequest } from "@/api/auth";
import { ApiError } from "@/lib/fetcher";

export function useLogin() {
  const router = useRouter();

  return useMutation<boolean, ApiError, LoginRequest>({
    mutationFn: loginApi,
    onSuccess: () => {
      toast.success("로그인되었습니다.");
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
