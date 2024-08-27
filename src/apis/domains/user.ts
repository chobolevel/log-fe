import {
  Api,
  ApiResponse,
  ID,
  ImageScheme,
  Scheme,
  useDelete,
  useInvalidate,
  usePost,
  useUpdate,
} from "@/apis";
import { toUrl } from "@/utils";
import { ApiRoutes } from "@/constants";
import { Nullable } from "@/types";
import { useQuery } from "@tanstack/react-query";

export type UserLoginType = "GENERAL" | "KAKAO" | "NAVER" | "GOOGLE";
export type UserRoleType = "ROLE_USER" | "ROLE_ADMIN";
export type UserUpdateMask = "NICKNAME" | "PHONE";
export type UserImageType = "PROFILE";

export interface User extends Scheme {
  email: string;
  login_type: UserLoginType;
  nickname: string;
  phone: string;
  role: UserRoleType;
  profile_image: Nullable<ImageScheme>;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  check_password: string;
  login_type: UserLoginType;
  nickname: string;
  phone: string;
}

export interface UpdateUserRequest {
  id: ID;
  nickname?: string;
  phone?: string;
  update_mask: UserUpdateMask[];
}

export interface ChangeUserPasswordRequest {
  cur_password: string;
  new_password: string;
  check_new_password: string;
}

export interface UpdateUserImageRequest {
  type: UserImageType;
  origin_url: string;
  name: string;
}

export const useGetMe = () => {
  return useQuery({
    queryKey: [toUrl(ApiRoutes.Me), null],
    queryFn: () => {
      return Api.get<ApiResponse<User>>(toUrl(ApiRoutes.Me))
        .then((res) => res.data)
        .catch(() => null);
    },
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60,
  });
};

export const useCreateUser = () => {
  return usePost<User, CreateUserRequest, ID>(toUrl(ApiRoutes.CreateUser));
};

export const useUpdateUser = () => {
  return useUpdate<User, UpdateUserRequest>(
    (data) => toUrl(ApiRoutes.UpdateUser, { id: data.id }),
    undefined,
    { onSettled: useInvalidate(toUrl(ApiRoutes.Me)) },
  );
};

export const useChangeUserPassword = () => {
  return useUpdate<User, ChangeUserPasswordRequest>(
    toUrl(ApiRoutes.UpdateUser),
  );
};

export const useCreateUserImage = () => {
  return usePost<User, UpdateUserImageRequest>(
    toUrl(ApiRoutes.UpdateUserImage),
    undefined,
    { onSettled: useInvalidate(toUrl(ApiRoutes.Me)) },
  );
};

export const useDeleteUserImage = () => {
  return useDelete(toUrl(ApiRoutes.DeleteUserImage), undefined, {
    onSettled: useInvalidate(toUrl(ApiRoutes.Me)),
  });
};
