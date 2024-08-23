import { ID, ImageScheme, Scheme, useFetch, usePost } from "@/apis";
import { toUrl } from "@/utils";
import { ApiRoutes } from "@/constants";

export type UserLoginType = "GENERAL" | "KAKAO" | "NAVER" | "GOOGLE";
export type UserRoleType = "ROLE_USER" | "ROLE_ADMIN";

export interface User extends Scheme {
  email: string;
  login_type: UserLoginType;
  nickname: string;
  phone: string;
  role: UserRoleType;
  profile_image: ImageScheme;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  check_password: string;
  login_type: UserLoginType;
  nickname: string;
  phone: string;
}

export const useGetMe = () => {
  return useFetch<User>(toUrl(ApiRoutes.Me));
};

export const useCreateUser = () => {
  return usePost<User, CreateUserRequest, ID>(toUrl(ApiRoutes.CreateUser));
};
