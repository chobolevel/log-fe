"use client";

import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMe } from "@/hooks/user/user";
import {
  useNotifications,
  useNotificationSubscription,
  useReadNotification,
  useUnreadNotificationCount,
} from "@/hooks/notification/notification";
import type { Notification } from "@/types/notification";

function formatNotificationDate(timestamp: number): string {
  const d = new Date(timestamp);
  return `${d.getMonth() + 1}.${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function NotificationBell() {
  const { data: me } = useMe();
  const { data } = useNotifications();
  const unreadCount = useUnreadNotificationCount();
  const { mutate: readNotification } = useReadNotification();
  const router = useRouter();
  useNotificationSubscription();

  if (!me) return null;

  const notifications = data?.data ?? [];

  const handleSelect = (notification: Notification) => {
    if (!notification.is_read) readNotification(notification.id);
    if (notification.link) router.push(notification.link);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative cursor-pointer rounded-full border-0 bg-transparent p-1.5 text-muted-foreground outline-none transition-colors hover:text-foreground">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="px-1.5 py-1 text-xs font-medium text-muted-foreground">
          알림
        </div>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="px-2 py-6 text-center text-sm text-muted-foreground">
            알림이 없습니다.
          </div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={cn(
                "flex-col items-start gap-0.5 whitespace-normal",
                !notification.is_read && "bg-green-subtle/40"
              )}
              onClick={() => handleSelect(notification)}
            >
              <span className="text-sm">{notification.content}</span>
              <span className="text-xs text-muted-foreground">
                {formatNotificationDate(notification.created_at)}
              </span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
