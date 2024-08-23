import { Api, useInvalidate, UserLoginType } from "@/apis";
import { useMutation } from "@tanstack/react-query";
import { toUrl } from "@/utils";
import { ApiRoutes } from "@/constants";

export interface LoginRequestType {
  email: string;
  password: string;
  login_type: UserLoginType;
}

export interface LoginResponseType {
  data: {
    access_token: string;
    refresh_token: string;
  };
}

export interface ReissueRequest {
  refresh_token: string;
}

const login = async (params: LoginRequestType) => {
  return Api.request<LoginResponseType>(
    toUrl(ApiRoutes.AuthLogin),
    "POST",
    params,
  ).then((res) => {
    return {
      access: res.data.data.access_token,
      refresh: res.data.data.refresh_token,
    };
  });
};

const handleSuccess = (
  data: { access: string; refresh: string },
  invalidate: () => void,
) => {
  Api.addToken(data.access);
  localStorage.setItem("refresh", data.refresh);
  invalidate();
};

export const useLogin = () => {
  const invalidate = useInvalidate(toUrl(ApiRoutes.Me));

  return useMutation({
    mutationFn: (params: LoginRequestType) => login(params),
    onSuccess: (data) => {
      handleSuccess(data, invalidate);
    },
    meta: {
      ignoreSuccess: true,
    },
  });
};
