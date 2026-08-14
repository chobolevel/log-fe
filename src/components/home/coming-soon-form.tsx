"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ComingSoonForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    toast.success("오픈 알림을 신청했습니다!", {
      description: `${email}로 오픈 소식을 알려드릴게요.`,
    });
    setEmail("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col items-center gap-2 sm:flex-row"
    >
      <Input
        type="email"
        placeholder="이메일 주소를 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="h-11 rounded-full px-5"
      />
      <button
        type="submit"
        className={cn(
          buttonVariants({ size: "lg" }),
          "shrink-0 gap-2 rounded-full bg-green px-6 text-green-foreground hover:bg-green/90"
        )}
      >
        <Bell className="h-4 w-4" />
        알림 받기
      </button>
    </form>
  );
}
