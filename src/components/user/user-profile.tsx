"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FollowListModal,
  type FollowListTab,
} from "@/components/user/follow-list-modal";
import { useMe, useUser } from "@/hooks/user/user";

interface UserProfileProps {
  userId: number;
}

export function UserProfile({ userId }: UserProfileProps) {
  const router = useRouter();
  const { data: me } = useMe();
  const isSelf = me?.id === userId;

  const {
    data: user,
    isLoading,
    error,
  } = useUser(userId, {
    enabled: !isSelf,
  });
  const [followModal, setFollowModal] = useState<{
    open: boolean;
    tab: FollowListTab;
  }>({ open: false, tab: "followers" });

  useEffect(() => {
    if (isSelf) router.replace("/profile");
  }, [isSelf, router]);

  if (isSelf) return null;

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-2xl px-6 py-12">
        <Skeleton className="h-44 w-full rounded-2xl" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="mx-auto w-full max-w-2xl px-6 py-12">
        <div className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
          회원을 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  const initials = user.nickname.slice(0, 2).toUpperCase();

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12">
      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-5">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.profile_image?.url} alt={user.nickname} />
            <AvatarFallback className="text-lg font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-black tracking-tight">{user.nickname}</h1>
        </div>

        <div className="mt-5 flex items-center gap-6 border-t border-border pt-5">
          <button
            type="button"
            className="text-center"
            onClick={() => setFollowModal({ open: true, tab: "followers" })}
          >
            <p className="text-lg font-bold">{user.follower_count}</p>
            <p className="text-xs text-muted-foreground">팔로워</p>
          </button>
          <button
            type="button"
            className="text-center"
            onClick={() => setFollowModal({ open: true, tab: "followings" })}
          >
            <p className="text-lg font-bold">{user.following_count}</p>
            <p className="text-xs text-muted-foreground">팔로잉</p>
          </button>
        </div>
      </section>

      <FollowListModal
        userId={user.id}
        open={followModal.open}
        tab={followModal.tab}
        onTabChange={(tab) => setFollowModal((s) => ({ ...s, tab }))}
        onOpenChange={(open) => setFollowModal((s) => ({ ...s, open }))}
      />
    </div>
  );
}
