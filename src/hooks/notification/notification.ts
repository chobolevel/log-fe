"use client";

import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  NOTIFICATION_SUBSCRIBE_URL,
  readNotificationApi,
  searchNotificationsApi,
} from "@/api/notification";
import { ApiError } from "@/lib/fetcher";
import { useMe } from "@/hooks/user/user";
import type { Pageable } from "@/types/common";
import type { Notification } from "@/types/notification";

export const NOTIFICATIONS_QUERY_KEY = ["notifications"] as const;

export function useNotifications() {
  const { data: me } = useMe();

  return useQuery<Pageable<Notification>, ApiError>({
    queryKey: NOTIFICATIONS_QUERY_KEY,
    queryFn: () => searchNotificationsApi({ page: 1, size: 20 }),
    enabled: !!me,
  });
}

export function useReadNotification() {
  const queryClient = useQueryClient();

  return useMutation<boolean, ApiError, number>({
    mutationFn: readNotificationApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
  });
}

// 알림 목록 API에 읽지 않은 개수만 따로 조회하는 엔드포인트가 없어, 최근 목록(20건) 중
// is_read=false 개수로 배지를 근사한다. 안 읽은 알림이 20건을 넘으면 실제보다 적게 보일 수 있음.
export function useUnreadNotificationCount() {
  const { data } = useNotifications();
  return data?.data.filter((n) => !n.is_read).length ?? 0;
}

const RECONNECT_BASE_DELAY_MS = 3000;
const RECONNECT_MAX_DELAY_MS = 60000;

export function useNotificationSubscription() {
  const { data: me } = useMe();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!me) return;

    let source: EventSource | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let reconnectDelay = RECONNECT_BASE_DELAY_MS;
    let cancelled = false;

    const handleEvent = (event: MessageEvent<string>) => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
      try {
        const payload = JSON.parse(event.data) as Partial<Notification>;
        if (payload.content) toast(payload.content);
      } catch {
        // 최초 연결 확인용 등 JSON이 아닌 페이로드는 무시
      }
    };

    // 브라우저 기본 EventSource 재연결은 백오프 없이 고정 간격(~3초)으로 무한 재시도해
    // 연결이 계속 실패하는 상황(서버 재시작, 인증 만료 등)에서 서버 부하를 키울 수 있다.
    // 그래서 자동 재연결을 쓰지 않고 명시적으로 닫은 뒤 지수 백오프로 직접 재연결한다.
    const connect = () => {
      source = new EventSource(NOTIFICATION_SUBSCRIBE_URL, {
        withCredentials: true,
      });

      source.onopen = () => {
        reconnectDelay = RECONNECT_BASE_DELAY_MS;
      };

      source.onmessage = handleEvent;
      source.addEventListener("notification", handleEvent);

      source.onerror = () => {
        source?.close();
        if (cancelled) return;
        reconnectTimer = setTimeout(connect, reconnectDelay);
        reconnectDelay = Math.min(reconnectDelay * 2, RECONNECT_MAX_DELAY_MS);
      };
    };

    connect();

    return () => {
      cancelled = true;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      source?.close();
    };
  }, [me, queryClient]);
}
