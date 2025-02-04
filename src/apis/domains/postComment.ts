import {
  ID,
  PageQueryParams,
  Scheme,
  useDelete,
  useGetPage,
  useInvalidate,
  usePost,
  User,
  useUpdate,
} from "@/apis";
import { toUrl } from "@/utils";
import { ApiRoutes } from "@/constants";

export type PostCommentOrderType = "CREATED_AT_ASC" | "CREATED_AT_DESC";
export type PostCommentUpdateMask = "CONTENT";

export interface PostComment extends Scheme {
  writer: User;
  content: string;
}

export interface CreatePostCommentRequest {
  post_id: ID;
  content: string;
}

export interface GetPostCommentsParams extends PageQueryParams {
  postId?: ID;
  writerId?: ID;
  orderTypes?: PostCommentOrderType[];
}

export interface UpdatePostCommentRequest {
  id: ID;
  content?: string;
  update_mask: PostCommentUpdateMask[];
}

export interface DeletePostCommentRequest {
  id: ID;
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

export const useDeletePostComment = () => {
  return useDelete(toUrl(ApiRoutes.PostComments));
};
