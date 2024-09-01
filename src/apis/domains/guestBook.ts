import {
  ID,
  PageQueryParams,
  Scheme,
  useFetch,
  useGetPage,
  useInvalidate,
  usePost,
  useUpdate,
} from "@/apis";
import { toUrl } from "@/utils";
import { ApiRoutes } from "@/constants";

export type GuestBookOrderType = "CREATED_AT_ASC" | "CREATED_AT_DESC";
export type GuestBookUpdateMask = "CONTENT";

export interface GuestBook extends Scheme {
  guestName: string;
  content: string;
}

export interface CreateGuestBookRequest {
  guest_name: string;
  password: string;
  content: string;
}

export interface GetGuestBooksParams extends PageQueryParams {
  guestName?: string;
  orderTypes?: GuestBookOrderType[];
}

export interface GetGuestBookParams {
  id: ID;
}

export interface UpdateGuestBookRequest {
  id: ID;
  password: string;
  content?: string;
  update_mask: GuestBookUpdateMask[];
}

export const useCreateGuestBook = () => {
  return usePost<GuestBook, CreateGuestBookRequest, ID>(
    ApiRoutes.CreateGuestBook,
    undefined,
    { onSettled: useInvalidate(toUrl(ApiRoutes.GuestBooks)) },
  );
};

export const useGetGuestBooks = (params?: GetGuestBooksParams) => {
  return useGetPage<GuestBook[]>(toUrl(ApiRoutes.GuestBooks), params);
};

export const useGetGuestBook = (params: GetGuestBookParams) => {
  return useFetch<GuestBook>(
    toUrl(ApiRoutes.GuestBooks, { id: params.id }),
    undefined,
    { enabled: params.id !== 0 },
  );
};

export const useUpdateGuestBook = () => {
  return useUpdate<GuestBook, UpdateGuestBookRequest, ID>(
    (data) => toUrl(ApiRoutes.UpdateGuestBook, { id: data.id }),
    undefined,
    { onSettled: useInvalidate(toUrl(ApiRoutes.GuestBooks)) },
  );
};
