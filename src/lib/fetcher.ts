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

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });

  if (!res.ok) {
    const body = (await res
      .json()
      .catch(() => ({}))) as Partial<ApiErrorResponse>;
    throw new ApiError(
      res.status,
      body.error_code ?? "UNKNOWN_ERROR",
      body.error_message ?? `요청에 실패했습니다. (${res.status})`
    );
  }

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
  ) => request<T>(path, { ...init, method: "PUT", body: JSON.stringify(body) }),

  patch: <T>(
    path: string,
    body: unknown,
    init?: Omit<RequestInit, "method" | "body">
  ) =>
    request<T>(path, { ...init, method: "PATCH", body: JSON.stringify(body) }),

  delete: <T>(path: string, init?: Omit<RequestInit, "method" | "body">) =>
    request<T>(path, { ...init, method: "DELETE" }),
};
