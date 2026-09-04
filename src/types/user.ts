export type UserLoginType = "GENERAL" | "GITHUB";
export type UserRoleType = "ROLE_USER" | "ROLE_ADMIN";
export type UserImageType = "PROFILE";

export interface UserImage {
  id: number;
  type: UserImageType;
  url: string;
  name: string;
  created_at: number;
  updated_at: number;
}

export interface User {
  id: number;
  email: string;
  login_type: UserLoginType;
  nickname: string;
  role: UserRoleType;
  profile_image?: UserImage;
  created_at: number;
  updated_at: number;
}
