import { api } from "@/lib/fetcher";
import { buildPageQuery } from "@/lib/query";
import type { Pageable } from "@/types/common";
import type { Notification } from "@/types/notification";

export interface SearchNotificationParams {
  page?: number;
  size?: number;
  order_types?: ("CREATED_AT_ASC" | "CREATED_AT_DESC")[];
}

export const searchNotificationsApi = (params: SearchNotificationParams) =>
  api.get<Pageable<Notification>>(
    `/api/v1/notifications?${buildPageQuery(params).toString()}`
  );

export const readNotificationApi = (id: number) =>
  api.put<boolean>(`/api/v1/notifications/${id}/read`, {});

export const NOTIFICATION_SUBSCRIBE_URL = `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/v1/notifications/subscribe`;
