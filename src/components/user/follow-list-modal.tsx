"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PILL_SIZE } from "@/constants/ui";
import { useDebounce } from "@/hooks/use-debounce";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useUserFollowers, useUserFollowings } from "@/hooks/user/userFollow";

export type FollowListTab = "followers" | "followings";

interface FollowListModalProps {
  userId: number;
  open: boolean;
  tab: FollowListTab;
  onTabChange: (tab: FollowListTab) => void;
  onOpenChange: (open: boolean) => void;
}

export function FollowListModal({
  userId,
  open,
  tab,
  onTabChange,
  onOpenChange,
}: FollowListModalProps) {
  const [nickname, setNickname] = useState("");
  const debouncedNickname = useDebounce(nickname, 300);

  const followers = useUserFollowers(userId, {
    nickname: debouncedNickname || undefined,
    enabled: open && tab === "followers",
  });
  const followings = useUserFollowings(userId, {
    nickname: debouncedNickname || undefined,
    enabled: open && tab === "followings",
  });

  const active = tab === "followers" ? followers : followings;
  const items = active.data?.pages.flatMap((p) => p.data) ?? [];
  const isInitialLoading = active.isLoading;

  const sentinelRef = useIntersectionObserver(
    () => {
      if (active.hasNextPage && !active.isFetchingNextPage) {
        active.fetchNextPage();
      }
    },
    { enabled: open }
  );

  const handleTabChange = (next: FollowListTab) => {
    if (next === tab) return;
    setNickname("");
    onTabChange(next);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) setNickname("");
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex flex-col gap-4 sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>팔로우</DialogTitle>
        </DialogHeader>

        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => handleTabChange("followers")}
            className={cn(
              PILL_SIZE.lg,
              "flex-1 rounded-full font-medium transition-all",
              tab === "followers"
                ? "bg-green text-green-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            팔로워
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("followings")}
            className={cn(
              PILL_SIZE.lg,
              "flex-1 rounded-full font-medium transition-all",
              tab === "followings"
                ? "bg-green text-green-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            팔로잉
          </button>
        </div>

        <input
          type="text"
          placeholder="닉네임으로 검색..."
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full rounded-full bg-muted/70 px-4 py-2 text-sm outline-none placeholder:text-muted-foreground/40 focus:bg-muted"
        />

        <div className="h-[400px] overflow-y-auto">
          {isInitialLoading && (
            <div className="space-y-4 px-1 py-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-muted" />
                  <div className="h-3 w-24 animate-pulse rounded-full bg-muted" />
                </div>
              ))}
            </div>
          )}

          {!isInitialLoading && items.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
              <Users className="mb-3 h-8 w-8 opacity-25" />
              <p className="text-sm">
                {tab === "followers"
                  ? "팔로워가 없습니다."
                  : "팔로잉하는 회원이 없습니다."}
              </p>
            </div>
          )}

          {items.length > 0 && (
            <ul>
              {items.map(({ user }) => {
                const initials = user.nickname.slice(0, 2).toUpperCase();
                return (
                  <li
                    key={user.id}
                    className="flex items-center gap-3 rounded-xl px-1 py-2"
                  >
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarImage
                        src={user.profile_image?.url}
                        alt={user.nickname}
                      />
                      <AvatarFallback className="text-xs font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="truncate text-sm font-medium">
                      {user.nickname}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

          {active.hasNextPage && (
            <div ref={sentinelRef} className="flex justify-center py-4">
              {active.isFetchingNextPage && (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground" />
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
