import { api } from "@/lib/fetcher";

export interface PresignedUrlRequest {
  prefix: string;
  filename: string;
  extension: string;
}

export interface PresignedUrlResponse {
  presigned_url: string;
  host: string;
  path: string;
  filename_with_extension: string;
}

export const getPresignedUrlApi = (request: PresignedUrlRequest) =>
  api.post<PresignedUrlResponse>("/api/v1/upload/presigned-url", request);
