"use client";

import { useState } from "react";
import Link from "next/link";
import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  RecordCard,
  RecordCardSkeleton,
} from "@/components/record/record-card";
import { RecordContributionGraph } from "@/components/record/record-contribution-graph";
import {
  FollowListModal,
  type FollowListTab,
} from "@/components/user/follow-list-modal";
import { useMe, useUser } from "@/hooks/user/user";
import { useRecords } from "@/hooks/record/record";

const RECENT_RECORDS_SIZE = 6;

interface UserProfileProps {
  userId: number;
}

export function UserProfile({ userId }: UserProfileProps) {
  const { data: me } = useMe();
  const isSelf = me?.id === userId;

  const { data: user, isLoading } = useUser(userId);

  const [followModal, setFollowModal] = useState<{
    open: boolean;
    tab: FollowListTab;
  }>({ open: false, tab: "followers" });

  const { data: recentRecords, isLoading: isRecordsLoading } = useRecords(
    {
      userId: user?.id,
      size: RECENT_RECORDS_SIZE,
      order_types: ["CREATED_AT_DESC"],
    },
    { enabled: !!user?.id }
  );

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-4xl px-6 py-12">
        <Skeleton className="h-44 w-full rounded-2xl" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto w-full max-w-4xl px-6 py-12">
        <div className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
          회원을 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  const initials = user.nickname.slice(0, 2).toUpperCase();

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-5">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.profile_image?.url} alt={user.nickname} />
            <AvatarFallback className="text-lg font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-black tracking-tight">
              {user.nickname}
            </h1>
            {isSelf && (
              <Link
                href="/settings"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "gap-1.5 rounded-full"
                )}
              >
                <Settings className="h-3.5 w-3.5" />
                설정
              </Link>
            )}
          </div>
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

      <div className="mt-6">
        <RecordContributionGraph userId={user.id} />
      </div>

      <section className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
          최근 기록
        </h2>
        {isRecordsLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <RecordCardSkeleton key={i} />
            ))}
          </div>
        ) : recentRecords && recentRecords.data.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentRecords.data.map((record) => (
              <RecordCard key={record.id} record={record} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
            작성한 기록이 없습니다.
          </p>
        )}
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
