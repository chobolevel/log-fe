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

const login = async (params: LoginRequestType) => {
  return Api.post<LoginResponseType>(toUrl(ApiRoutes.AuthLogin), params).then(
    (res) => {
      return res;
    },
  );
};

export const useLogin = () => {
  const invalidate = useInvalidate(toUrl(ApiRoutes.Me));

  return useMutation({
    mutationFn: (params: LoginRequestType) => login(params),
    onSuccess: () => {
      invalidate();
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
    Api.post(toUrl(ApiRoutes.AuthLogout)).then(() => {
      push(toUrl(PageRoutes.Home))?.then(() => {
        openAlert({ content: "로그아웃 되었습니다." });
        invalidate();
      });
    });
  };
};
