import { Api, useInvalidate, UserLoginType } from "@/apis";
import { useMutation } from "@tanstack/react-query";
import { toUrl } from "@/utils";
import { ApiRoutes, PageRoutes } from "@/constants";
import { useSafePush } from "@/hooks";
import { useModalStore } from "@/stores";

export interface LoginRequestType {
  email: string;
  password: string;
  login_type: UserLoginType;
}

export interface LoginResponseType {
  data: {
    access_token: string;
  };
}

export interface ReissueRequest {
  refresh_token: string;
}

export interface ReissueResponse {
  data: {
    access_token: string;
    refresh_token: string;
  };
}

const login = async (params: LoginRequestType) => {
  return Api.request<LoginResponseType>(
    toUrl(ApiRoutes.AuthLogin),
    "POST",
    params,
  ).then((res) => {
    return {
      access: res.headers.authorization,
    };
  });
};

const handleSuccess = (data: { access: string }, invalidate: () => void) => {
  Api.addToken(data.access);
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

export const useLogout = () => {
  const { push } = useSafePush();
  const invalidate = useInvalidate(toUrl(ApiRoutes.Me));
  const { openAlert } = useModalStore(["openAlert"]);

  return () => {
    Api.request(toUrl(ApiRoutes.AuthLogout), "POST").then(() => {
      push(toUrl(PageRoutes.Home))?.then(() => {
        openAlert({ content: "로그아웃 되었습니다." });
        Api.removeTokens();
        invalidate();
      });
    });
  };
};
