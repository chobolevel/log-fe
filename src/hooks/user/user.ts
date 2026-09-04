"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  loginApi,
  type LoginRequest,
  createUserApi,
  type CreateUserRequest,
  sendEmailVerificationCodeApi,
  type SendEmailVerificationCodeRequest,
  checkEmailVerificationCodeApi,
  type CheckEmailVerificationCodeRequest,
  sendResetPasswordEmailApi,
  type SendResetPasswordEmailRequest,
  resetPasswordApi,
  type ResetPasswordRequest,
  getMyUserApi,
  updateUserApi,
  type UpdateUserRequest,
  changePasswordApi,
  type ChangePasswordRequest,
  logoutApi,
  resignApi,
} from "@/api/user";
import { ApiError } from "@/lib/fetcher";
import type { User } from "@/types/user";

export const MY_USER_QUERY_KEY = ["user", "me"] as const;

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

export function useMe() {
  return useQuery<User, ApiError>({
    queryKey: MY_USER_QUERY_KEY,
    queryFn: getMyUserApi,
    retry: false,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation<number, ApiError, UpdateUserRequest>({
    mutationFn: updateUserApi,
    onSuccess: () => {
      toast.success("프로필이 업데이트되었습니다.");
      queryClient.invalidateQueries({ queryKey: MY_USER_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useChangePassword() {
  return useMutation<number, ApiError, ChangePasswordRequest>({
    mutationFn: changePasswordApi,
    onSuccess: () => {
      toast.success("비밀번호가 변경되었습니다.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<boolean, ApiError, void>({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      toast.success("로그아웃되었습니다.");
      queryClient.removeQueries({ queryKey: MY_USER_QUERY_KEY });
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useResign() {
  const router = useRouter();

  return useMutation<boolean, ApiError, void>({
    mutationFn: async () => {
      await resignApi();
      await logoutApi();
      return true;
    },
    onSuccess: () => {
      toast.success("탈퇴가 완료되었습니다.");
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
