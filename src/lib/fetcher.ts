import type { ApiErrorResponse } from "@/types/common";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly errorCode: string,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type ApiResponse<T> = { data: T };

// 동시에 여러 요청이 401을 받아도 refresh는 한 번만 실행
let refreshing: Promise<boolean> | null = null;

function tryRefresh(): Promise<boolean> {
  if (refreshing) return refreshing;

  refreshing = fetch(`${BASE_URL}/api/v1/users/reissue`, {
    method: "POST",
    credentials: "include",
  })
    .then((res) => res.ok)
    .finally(() => {
      refreshing = null;
    });

  return refreshing;
}

async function parseError(res: Response): Promise<ApiError> {
  const body = (await res.json().catch(() => ({}))) as Partial<ApiErrorResponse>;
  return new ApiError(
    res.status,
    body.error_code ?? "UNKNOWN_ERROR",
    body.error_message ?? `요청에 실패했습니다. (${res.status})`
  );
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });

  if (res.status === 401) {
    const refreshed = await tryRefresh();

    if (refreshed) {
      const retryRes = await fetch(`${BASE_URL}${path}`, {
        credentials: "include",
        headers: { "Content-Type": "application/json", ...init?.headers },
        ...init,
      });

      if (!retryRes.ok) throw await parseError(retryRes);

      const { data } = (await retryRes.json()) as ApiResponse<T>;
      return data;
    }

    throw new ApiError(
      401,
      "UNAUTHORIZED",
      "인증이 만료되었습니다. 다시 로그인해주세요."
    );
  }

  if (!res.ok) throw await parseError(res);

  const { data } = (await res.json()) as ApiResponse<T>;
  return data;
}

export const api = {
  get: <T>(path: string, init?: Omit<RequestInit, "method" | "body">) =>
    request<T>(path, { ...init, method: "GET" }),

  post: <T>(
    path: string,
    body: unknown,
    init?: Omit<RequestInit, "method" | "body">
  ) =>
    request<T>(path, { ...init, method: "POST", body: JSON.stringify(body) }),

  put: <T>(
    path: string,
    body: unknown,
    init?: Omit<RequestInit, "method" | "body">
  ) =>
    request<T>(path, { ...init, method: "PUT", body: JSON.stringify(body) }),

  patch: <T>(
    path: string,
    body: unknown,
    init?: Omit<RequestInit, "method" | "body">
  ) =>
    request<T>(path, { ...init, method: "PATCH", body: JSON.stringify(body) }),

  delete: <T>(path: string, init?: Omit<RequestInit, "method" | "body">) =>
    request<T>(path, { ...init, method: "DELETE" }),
};
