import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
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
        <Button variant="outline" className="h-9 w-full gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-4"
            fill="currentColor"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub으로 계속하기
        </Button>
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
