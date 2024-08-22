import { ImageScheme, Scheme, useFetch } from "@/apis";
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

export const useGetMe = () => {
  return useFetch(toUrl(ApiRoutes.Users));
};
