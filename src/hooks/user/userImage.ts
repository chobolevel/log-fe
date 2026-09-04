"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getPresignedUrlApi } from "@/api/upload";
import { createUserImageApi, deleteUserImageApi } from "@/api/user";
import { ApiError } from "@/lib/fetcher";
import { MY_USER_QUERY_KEY } from "./user";

export function useUploadProfileImage() {
  const queryClient = useQueryClient();

  return useMutation<number, ApiError | Error, File>({
    mutationFn: async (file: File) => {
      const dotIndex = file.name.lastIndexOf(".");
      const ext = dotIndex !== -1 ? file.name.slice(dotIndex + 1) : "jpg";
      const filename =
        dotIndex !== -1 ? file.name.slice(0, dotIndex) : file.name;

      const uploadRes = await getPresignedUrlApi({
        prefix: "image",
        filename,
        extension: ext,
      });

      const s3Res = await fetch(uploadRes.presigned_url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!s3Res.ok) {
        throw new Error("이미지 업로드에 실패했습니다.");
      }

      return createUserImageApi({
        type: "PROFILE",
        path: uploadRes.path,
        name: uploadRes.filename_with_extension,
      });
    },
    onSuccess: () => {
      toast.success("프로필 이미지가 변경되었습니다.");
      queryClient.invalidateQueries({ queryKey: MY_USER_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteUserImage() {
  const queryClient = useQueryClient();

  return useMutation<boolean, ApiError, number>({
    mutationFn: deleteUserImageApi,
    onSuccess: () => {
      toast.success("프로필 이미지가 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: MY_USER_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
