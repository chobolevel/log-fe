import {
  ID,
  PageQueryParams,
  Scheme,
  Tag,
  useDelete,
  useFetch,
  useGetPage,
  useInvalidate,
  usePost,
  User,
  useUpdate,
} from "@/apis";
import { toUrl } from "@/utils";
import { ApiRoutes } from "@/constants";

export type PostOrderType =
  | "CREATED_AT_ASC"
  | "CREATED_AT_DESC"
  | "UPDATED_AT_ASC"
  | "UPDATED_AT_DESC";
export type PostUpdateMask = "TAGS" | "TITLE" | "SUB_TITLE" | "CONTENT";

export interface Post extends Scheme {
  writer: User;
  tags: Tag[];
  title: string;
  sub_title: string;
  content: string;
}

export interface GetPostsParams extends PageQueryParams {
  tagId?: ID;
  title?: string;
  content?: string;
  orderTypes?: PostOrderType[];
}

export interface GetPostParams {
  id: ID;
}

export interface CreatePostRequest {
  tag_ids: ID[];
  title: string;
  sub_title: string;
  content: string;
}

export interface UpdatePostRequest {
  id: ID;
  tag_ids?: ID[];
  title?: string;
  sub_title?: string;
  content?: string;
  update_mask: PostUpdateMask[];
}

export const useGetPosts = (params?: GetPostsParams) => {
  return useGetPage<Post[]>(toUrl(ApiRoutes.Posts), params);
};

export const useGetPost = (params: GetPostParams) => {
  return useFetch<Post>(toUrl(ApiRoutes.Posts, { id: params.id }), undefined, {
    enabled: params.id !== 0,
  });
};

export const useCreatePost = () => {
  return usePost<Post, CreatePostRequest, ID>(
    toUrl(ApiRoutes.CreatePost),
    undefined,
    { onSettled: useInvalidate(ApiRoutes.Posts) },
  );
};

export const useUpdatePost = () => {
  return useUpdate<Post, UpdatePostRequest>((data) =>
    toUrl(ApiRoutes.UpdatePost, { id: data.id }),
  );
};

export const useDeletePost = () => {
  return useDelete(toUrl(ApiRoutes.DeletePost));
};
