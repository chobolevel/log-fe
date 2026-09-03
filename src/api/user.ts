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

export const loginApi = (request: LoginRequest) =>
  api.post<boolean>("/api/v1/users/login", request);

export const socialLoginApi = (request: SocialLoginRequest) =>
  api.post<boolean>("/api/v1/users/social-login", request);
