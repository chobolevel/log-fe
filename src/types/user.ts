export type UserLoginType = "GENERAL" | "GITHUB";

export type UserRoleType = "ROLE_ADMIN" | "ROLE_ADMIN";

export interface User {
  id: number;
  email: string;
  login_type: UserLoginType;
  nickname: string;
  role: UserRoleType;
  profile_image?: UserImageType;
  created_at: number;
  updated_at: number;
}

export type UserImageType = "PROFILE";

export interface UserImage {
  id: number;
  type: UserImageType;
  url: string;
  name: string;
  created_at: number;
  updated_at: number;
}
