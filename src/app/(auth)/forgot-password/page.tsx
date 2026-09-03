import Link from "next/link";
import { ForgotPasswordForm } from "@/components/user/forgot-password-form";

export default function ForgotPasswordPage() {
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
          가입한 이메일로 초기화 링크를 발송합니다.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <ForgotPasswordForm />
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
