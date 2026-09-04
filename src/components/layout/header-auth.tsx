"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useMe, useLogout } from "@/hooks/user/user";

export function HeaderAuth() {
  const { data: user, isLoading } = useMe();
  const { mutate: logout, isPending } = useLogout();

  if (isLoading) {
    return <Skeleton className="h-7 w-24 rounded-lg" />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-1.5">
        <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          로그인
        </Link>
        <Link
          href="/signup"
          className={cn(buttonVariants({ size: "sm" }), "bg-green text-green-foreground hover:bg-green/85")}
        >
          회원가입
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link href="/profile">
        <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent transition-all hover:ring-green">
          <AvatarImage src={user.profile_image?.url} alt={user.nickname} />
          <AvatarFallback className="text-xs font-bold">
            {user.nickname.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Link>
      <Button
        variant="ghost"
        size="sm"
        disabled={isPending}
        onClick={() => logout()}
      >
        {isPending ? "로그아웃 중..." : "로그아웃"}
      </Button>
    </div>
  );
}
