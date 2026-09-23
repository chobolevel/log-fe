"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserFollowersApi, getUserFollowingsApi } from "@/api/user";
import { ApiError } from "@/lib/fetcher";
import type { Pageable } from "@/types/common";
import type { UserFollow } from "@/types/user";

const FOLLOW_PAGE_SIZE = 20;

function hasNextFollowPage(lastPage: Pageable<UserFollow>): boolean {
  return lastPage.page * lastPage.size < lastPage.total_count;
}

interface UseUserFollowListOptions {
  nickname?: string;
  enabled?: boolean;
}

export function useUserFollowers(
  userId: number,
  { nickname, enabled = true }: UseUserFollowListOptions = {}
) {
  return useInfiniteQuery<Pageable<UserFollow>, ApiError>({
    queryKey: ["users", userId, "followers", nickname] as const,
    queryFn: ({ pageParam }) =>
      getUserFollowersApi(userId, {
        page: pageParam as number,
        size: FOLLOW_PAGE_SIZE,
        nickname,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      hasNextFollowPage(lastPage) ? lastPage.page + 1 : undefined,
    enabled,
  });
}

export function useUserFollowings(
  userId: number,
  { nickname, enabled = true }: UseUserFollowListOptions = {}
) {
  return useInfiniteQuery<Pageable<UserFollow>, ApiError>({
    queryKey: ["users", userId, "followings", nickname] as const,
    queryFn: ({ pageParam }) =>
      getUserFollowingsApi(userId, {
        page: pageParam as number,
        size: FOLLOW_PAGE_SIZE,
        nickname,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      hasNextFollowPage(lastPage) ? lastPage.page + 1 : undefined,
    enabled,
  });
}
