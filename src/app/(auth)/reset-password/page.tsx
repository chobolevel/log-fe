import { Suspense } from "react";
import Link from "next/link";
import { ResetPasswordForm } from "@/components/user/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <Link
          href="/"
          className="inline-block text-2xl font-black tracking-tight select-none"
        >
          초로
        </Link>
        <p className="mt-2 text-sm text-muted-foreground">
          새 비밀번호를 설정해주세요.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <Suspense>
          <ResetPasswordForm />
        </Suspense>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link
          href="/login"
          className="font-semibold text-green underline-offset-4 hover:underline"
        >
          로그인으로 돌아가기
        </Link>
      </p>
    </div>
  );
}
