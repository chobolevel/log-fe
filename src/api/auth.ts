import { api } from "@/lib/fetcher";
import type { UserLoginType } from "@/types/user";

export interface LoginRequest {
  email: string;
  password: string;
  login_type: UserLoginType;
}

export const loginApi = (request: LoginRequest) =>
  api.post<boolean>("/api/v1/auth/login", request);
