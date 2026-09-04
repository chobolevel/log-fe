import { Suspense } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { LoginForm } from "@/components/user/login-form";
import { GithubLoginButton } from "@/components/user/github-login-button";
import { RedirectMessage } from "@/components/auth/redirect-message";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <Suspense>
        <RedirectMessage />
      </Suspense>
      {/* 로고 */}
      <div className="mb-8 text-center">
        <Link
          href="/"
          className="inline-block text-2xl font-black tracking-tight select-none"
        >
          초로
        </Link>
        <p className="mt-2 text-sm text-muted-foreground">
          계속하려면 로그인하세요.
        </p>
      </div>

      {/* 카드 */}
      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <LoginForm />

        <div className="my-6 flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="shrink-0 text-xs text-muted-foreground">또는</span>
          <Separator className="flex-1" />
        </div>

        {/* GitHub OAuth */}
        <GithubLoginButton />
      </div>

      {/* 회원가입 링크 */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        아직 계정이 없으신가요?{" "}
        <Link
          href="/signup"
          className="font-semibold text-green underline-offset-4 hover:underline"
        >
          회원가입
        </Link>
      </p>
    </div>
  );
}
