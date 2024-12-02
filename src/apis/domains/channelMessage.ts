import { ID, PageQueryParams, Scheme, useGetPage, usePost, User } from "@/apis";
import { toUrl } from "@/utils";
import { ApiRoutes } from "@/constants";

export type ChannelMessageType = "ENTER" | "TALK" | "EXIT";
export type ChannelMessageOrderType = "CREATED_AT_ASC" | "CREATED_AT_DESC";

export interface ChannelMessage extends Scheme {
  writer: User;
  type: ChannelMessageType;
  content: string;
}

export interface CreateChannelMessageRequest {
  channel_id: ID;
  type: ChannelMessageType;
  content: string;
}

export interface GetChannelMessagesParams extends PageQueryParams {
  channel_id: ID;
  orderTypes?: ChannelMessageOrderType[];
}

export const useCreateChannelMessage = () => {
  return usePost<ChannelMessage, CreateChannelMessageRequest, ID>((data) =>
    toUrl(ApiRoutes.ChannelMessages, { channelId: data.channel_id }),
  );
};

export const useGetChannelMessages = (
  params: GetChannelMessagesParams,
  enabled = true,
) => {
  return useGetPage<ChannelMessage[]>(
    toUrl(ApiRoutes.ChannelMessages, { channelId: params.channel_id }),
    params,
    { enabled },
  );
};
