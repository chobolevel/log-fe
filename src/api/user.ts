import { api } from "@/lib/fetcher";
import { buildPageQuery } from "@/lib/query";
import type { Pageable } from "@/types/common";
import type { User, UserFollow, UserLoginType } from "@/types/user";

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

export const getMyUserApi = () => api.get<User>("/api/v1/user/me");

export const getUserApi = (id: number) => api.get<User>(`/api/v1/users/${id}`);

export interface UpdateUserRequest {
  nickname?: string;
  update_mask: "NICKNAME"[];
}

export const updateUserApi = (request: UpdateUserRequest) =>
  api.put<number>("/api/v1/user/me", request);

export interface CreateUserImageRequest {
  type: "PROFILE";
  path: string;
  name: string;
}

export const createUserImageApi = (request: CreateUserImageRequest) =>
  api.post<number>("/api/v1/users/images", request);

export const deleteUserImageApi = (userImageId: number) =>
  api.delete<boolean>(`/api/v1/users/images/${userImageId}`);

export interface ChangePasswordRequest {
  cur_password: string;
  new_password: string;
}

export const changePasswordApi = (request: ChangePasswordRequest) =>
  api.post<number>("/api/v1/user/change-password", request);

export const logoutApi = () => api.post<boolean>("/api/v1/users/logout", {});

export const resignApi = () => api.post<boolean>("/api/v1/user/resign", {});

export interface SearchUserFollowParams {
  nickname?: string;
  page?: number;
  size?: number;
  order_types?: ("CREATED_AT_ASC" | "CREATED_AT_DESC")[];
}

function buildUserFollowQuery(params: SearchUserFollowParams): string {
  const qs = buildPageQuery(params);
  if (params.nickname) qs.append("nickname", params.nickname);
  return qs.toString();
}

export const followUserApi = (userId: number) =>
  api.post<boolean>(`/api/v1/users/${userId}/follow`, {});

export const unfollowUserApi = (userId: number) =>
  api.post<boolean>(`/api/v1/users/${userId}/unfollow`, {});

export const getUserFollowersApi = (
  userId: number,
  params: SearchUserFollowParams
) =>
  api.get<Pageable<UserFollow>>(
    `/api/v1/users/${userId}/followers?${buildUserFollowQuery(params)}`
  );

export const getUserFollowingsApi = (
  userId: number,
  params: SearchUserFollowParams
) =>
  api.get<Pageable<UserFollow>>(
    `/api/v1/users/${userId}/followings?${buildUserFollowQuery(params)}`
  );
