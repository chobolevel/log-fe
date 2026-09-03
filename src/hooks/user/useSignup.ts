"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createUserApi, type CreateUserRequest } from "@/api/user";
import { ApiError } from "@/lib/fetcher";

export function useSignup() {
  const router = useRouter();

  return useMutation<number, ApiError, CreateUserRequest>({
    mutationFn: createUserApi,
    onSuccess: () => {
      toast.success("회원가입이 완료되었습니다.");
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
