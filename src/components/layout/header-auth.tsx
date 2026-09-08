"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PenLine, User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useMe, useLogout } from "@/hooks/user/user";

export function HeaderAuth() {
  const router = useRouter();
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
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer rounded-full border-0 bg-transparent p-0 outline-none">
        <Avatar className="h-8 w-8 ring-2 ring-transparent transition-all hover:ring-green">
          <AvatarImage src={user.profile_image?.url} alt={user.nickname} />
          <AvatarFallback className="text-xs font-bold">
            {user.nickname.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={() => router.push("/records/write")}>
          <PenLine />
          기록 작성
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <User />
          프로필
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          disabled={isPending}
          onClick={() => logout()}
        >
          <LogOut />
          {isPending ? "로그아웃 중..." : "로그아웃"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
