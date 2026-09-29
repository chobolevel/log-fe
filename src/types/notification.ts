export type NotificationType = "FOLLOW" | "RECORD_LIKE";

export interface Notification {
  id: number;
  type: NotificationType;
  content: string;
  link?: string;
  is_read: boolean;
  created_at: number;
}
