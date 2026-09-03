import { api } from "@/lib/fetcher";
import type { UserLoginType } from "@/types/user";

export interface LoginRequest {
  email: string;
  password: string;
  login_type: UserLoginType;
}

export interface SocialLoginRequest {
  email: string;
  social_id: string;
  login_type: UserLoginType;
  nickname: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface SendEmailVerificationCodeRequest {
  email: string;
}

export interface CheckEmailVerificationCodeRequest {
  email: string;
  verification_code: string;
}

export const loginApi = (request: LoginRequest) =>
  api.post<boolean>("/api/v1/users/login", request);

export const socialLoginApi = (request: SocialLoginRequest) =>
  api.post<boolean>("/api/v1/users/social-login", request);

export const createUserApi = (request: CreateUserRequest) =>
  api.post<number>("/api/v1/users", request);

export const sendEmailVerificationCodeApi = (
  request: SendEmailVerificationCodeRequest
) => api.post<boolean>("/api/v1/users/email-verifications/send-code", request);

export const checkEmailVerificationCodeApi = (
  request: CheckEmailVerificationCodeRequest
) => api.post<string>("/api/v1/users/email-verifications/verify-code", request);

export interface SendResetPasswordEmailRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  password: string;
}

export const sendResetPasswordEmailApi = (
  request: SendResetPasswordEmailRequest
) => api.post<boolean>("/api/v1/user/reset-password/send-code", request);

export const resetPasswordApi = (request: ResetPasswordRequest) =>
  api.post<boolean>("/api/v1/user/reset-password", request);
