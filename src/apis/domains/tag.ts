import { PageQueryParams, Scheme, useGetPage } from "@/apis";
import { toUrl } from "@/utils";
import { ApiRoutes } from "@/constants";

export type TagOrderType = "ORDER_ASC" | "ORDER_DESC";

export interface Tag extends Scheme {
  name: string;
  posts_count: number;
}

export interface GetTagsParams extends PageQueryParams {
  name?: string;
  orderTypes?: TagOrderType[];
}

export const useGetTags = (params?: GetTagsParams) => {
  return useGetPage<Tag[]>(toUrl(ApiRoutes.Tags), params);
};
