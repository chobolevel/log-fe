import { usePost } from "@/apis";
import { toUrl } from "@/utils";
import { ApiRoutes } from "@/constants";

export interface PresignedUrl {
  url: string;
  filename_with_extension: string;
}

export interface CreatePresignedUrlRequest {
  prefix: string;
  filename: string;
  extension: string;
}

export const useCreatePresignedUrl = () => {
  return usePost<PresignedUrl, CreatePresignedUrlRequest, PresignedUrl>(
    toUrl(ApiRoutes.CreatePresignedUrl),
  );
};
