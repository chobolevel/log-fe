import {
  ID,
  PageQueryParams,
  Scheme,
  useGetPage,
  useInvalidate,
  usePost,
  useUpdate,
} from "@/apis";
import { toUrl } from "@/utils";
import { ApiRoutes } from "@/constants";

export type PostCommentOrderType = "CREATED_AT_ASC" | "CREATED_AT_DESC";
export type PostCommentUpdateMask = "CONTENT";

export interface PostComment extends Scheme {
  writer_name: string;
  content: string;
}

export interface CreatePostCommentRequest {
  post_id: ID;
  writer_name: string;
  password: string;
  content: string;
}

export interface GetPostCommentsParams extends PageQueryParams {
  postId?: ID;
  orderTypes?: PostCommentOrderType[];
}

export interface UpdatePostCommentRequest {
  id: ID;
  password: string;
  content?: string;
  update_mask: PostCommentUpdateMask[];
}

export const useCreatePostComment = () => {
  return usePost<PostComment, CreatePostCommentRequest, ID>(
    toUrl(ApiRoutes.PostComments),
    undefined,
    { onSettled: useInvalidate(toUrl(ApiRoutes.PostComments)) },
  );
};

export const useGetPostComments = (params?: GetPostCommentsParams) => {
  return useGetPage<PostComment[]>(toUrl(ApiRoutes.PostComments), params);
};

export const useUpdatePostComment = () => {
  return useUpdate<PostComment, UpdatePostCommentRequest, ID>(
    (data) => toUrl(ApiRoutes.PostComments, { id: data.id }),
    undefined,
    { onSettled: useInvalidate(toUrl(ApiRoutes.PostComments)) },
  );
};
