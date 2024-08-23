import { ApiRoutes } from "@/constants";
import { toUrl } from "@/utils";
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiError, QueryKey, UrlBuilder } from "./types";
import { ReissueRequest, ReissueResponse } from "@/apis/domains";

const protoc = process.env.NODE_ENV === "development" ? "http" : "https";

const getDomain = () => {
  return process.env.NEXT_PUBLIC_SERVER_DOMAIN;
};

export const buildUrl = <T>(url: UrlBuilder<T>, data: T) => {
  return typeof url === "function" ? url(data) : url;
};

export const buildQueryKey = <T>(queryKey: QueryKey<T>, data: T) => {
  const [url, params] = queryKey;
  return [buildUrl(url, data), params];
};

export class Api {
  static instance: AxiosInstance = axios.create({
    baseURL: `${protoc}://${getDomain()}`,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  static addToken = (token: string) => {
    Api.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  static removeTokens = () => {
    delete Api.instance.defaults.headers.common["Authorization"];
  };

  static get = async <T>(url: string, params?: object) => {
    return Api.instance
      .get<T>(url, {
        params,
        paramsSerializer: (params) => {
          const serializedParams = new URLSearchParams();
          for (let key in params) {
            if (Array.isArray(params[key])) {
              const serializedArrayValue = params[key].join(",");
              serializedParams.append(key, serializedArrayValue);
            } else if (params[key] !== undefined) {
              serializedParams.append(key, params[key]);
            }
          }
          return serializedParams.toString();
        },
      })
      .then((res) => res.data);
  };

  static post = async <T>(url: string, body?: object) => {
    return Api.instance.post<T>(url, body).then((res) => res.data);
  };

  static put = async <T>(url: string, body?: object) => {
    return Api.instance.put<T>(url, body).then((res) => res.data);
  };

  static patch = async <T>(url: string, body?: object) => {
    return Api.instance.patch<T>(url, body).then((res) => res.data);
  };

  static delete = async <T>(url: string) => {
    return Api.instance.delete<T>(url).then((res) => res.data);
  };

  static postForm = async <T>(url: string, body?: FormData) => {
    return Api.instance.postForm<T>(url, body).then((res) => res.data);
  };

  static request = async <T>(url: string, method: string, body?: object) => {
    return Api.instance.request<T>({
      url,
      method,
      data: body,
    });
  };
}

Api.instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig<any> & {
      _retry?: boolean;
    };
    const { request, response } = error;

    // 이전 요청이 Reissiue 요청이라면 에러를 반환합니다.
    // 저장된 모든 토큰을 삭제합니다.
    if (request?.responseURL?.includes(toUrl(ApiRoutes.AuthReissue))) {
      localStorage.removeItem("refresh");
      Api.removeTokens();
      return Promise.reject(error);
    }

    if (response?.status === 401 && !originalRequest._retry) {
      // 재시도 플래그를 설정하여 무한 루프를 방지합니다.
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");
      if (!refresh) {
        console.error("refresh token is not exist");
        return Promise.reject(error);
      }

      try {
        const req = {
          refresh_token: refresh,
        } as ReissueRequest;

        // 리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급합니다.
        const result = await Api.request<ReissueResponse>(
          toUrl(ApiRoutes.AuthReissue),
          "POST",
          req,
        );
        const reissuedResponse = result.data.data;

        // 새로운 액세스 토큰을 저장합니다.
        Api.addToken(reissuedResponse.access_token);
        localStorage.setItem("refresh", reissuedResponse.refresh_token);

        // 새로운 액세스 토큰을 사용하여 요청을 재시도합니다.
        originalRequest.headers["Authorization"] =
          `Bearer ${reissuedResponse.access_token}`;
        return Api.instance(originalRequest);
      } catch {
        console.error("refresh token is invalid");
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
