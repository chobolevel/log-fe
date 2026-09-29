"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface UserNicknameLinkProps {
  userId: number;
  nickname: string;
  className?: string;
  onNavigate?: () => void;
}

// 기록 카드처럼 전체가 <Link>로 감싸인 영역 안에서도 써야 해서
// 중첩 <a> 문제를 피하려고 <Link> 대신 클릭 핸들러로 이동을 직접 처리한다.
export function UserNicknameLink({
  userId,
  nickname,
  className,
  onNavigate,
}: UserNicknameLinkProps) {
  const router = useRouter();

  const navigate = () => {
    onNavigate?.();
    router.push(`/users/${userId}`);
  };

  return (
    <span
      role="link"
      tabIndex={0}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate();
      }}
      onKeyDown={(e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        e.stopPropagation();
        navigate();
      }}
      className={cn("cursor-pointer hover:underline", className)}
    >
      {nickname}
    </span>
  );
}
