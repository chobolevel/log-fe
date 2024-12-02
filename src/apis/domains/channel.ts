import {
  ID,
  PageQueryParams,
  Scheme,
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

export type ChannelOrderType = "CREATED_AT_ASC" | "CREATED_AT_DESC";
export type ChannelUpdateMask = "NAME" | "USERS";

export interface Channel extends Scheme {
  name: string;
  participants: User[];
}

export interface CreateChannelRequest {
  name: string;
  user_ids: number[];
}

export interface GetChannelsParams extends PageQueryParams {
  orderTypes?: ChannelOrderType[];
}

export interface GetChannelParams {
  id: ID;
}

export interface UpdateChannelRequest {
  id: ID;
  name?: string;
  user_ids: number[];
  update_mask: ChannelUpdateMask[];
}

export interface InviteChannelRequest {
  channel_id: ID;
  user_ids: ID[];
}

export interface ExitChannelRequest {
  channel_id: ID;
}

export const useCreateChannel = () => {
  return usePost<Channel, CreateChannelRequest, ID>(
    toUrl(ApiRoutes.Channels),
    undefined,
    { onSettled: useInvalidate(toUrl(ApiRoutes.Channels)) },
  );
};

export const useGetChannels = (params?: GetChannelsParams, enabled = true) => {
  return useGetPage<Channel[]>(toUrl(ApiRoutes.Channels), params, { enabled });
};

export const useGetChannel = (params: GetChannelParams, enabled = true) => {
  return useFetch<Channel>(
    toUrl(ApiRoutes.Channels, { id: params.id }),
    undefined,
    { enabled },
  );
};

export const useUpdateChannel = () => {
  return useUpdate<Channel, UpdateChannelRequest, ID>(
    toUrl(ApiRoutes.Channels),
    undefined,
    { onSettled: useInvalidate(toUrl(ApiRoutes.Channels)) },
  );
};

export const useInviteChannel = () => {
  return useUpdate<Channel, InviteChannelRequest, ID>((data) =>
    toUrl(ApiRoutes.InviteChannel, { id: data.channel_id }),
  );
};

export const useExitChannel = () => {
  return useUpdate<Channel, ExitChannelRequest, ID>((data) =>
    toUrl(ApiRoutes.ExitChannel, { id: data.channel_id }),
  );
};

export const useDeleteChannel = () => {
  return useDelete(toUrl(ApiRoutes.Channels));
};
