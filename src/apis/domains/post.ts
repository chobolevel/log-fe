import { ID, PageQueryParams, Scheme, Tag, useGetPage, User } from "@/apis";
import { toUrl } from "@/utils";
import { ApiRoutes } from "@/constants";

export type PostOrderType =
  | "CREATED_AT_ASC"
  | "CREATED_AT_DESC"
  | "UPDATED_AT_ASC"
  | "UPDATED_AT_DESC";

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

export const useGetPosts = (params?: GetPostsParams) => {
  return useGetPage<Post[]>(toUrl(ApiRoutes.Posts), params);
};
