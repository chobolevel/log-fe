import Link from "next/link";
import { SignupForm } from "@/components/user/signup-form";

export default function SignupPage() {
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
          새 계정을 만들어보세요.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <SignupForm />
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        이미 계정이 있으신가요?{" "}
        <Link
          href="/login"
          className="font-semibold text-green underline-offset-4 hover:underline"
        >
          로그인
        </Link>
      </p>
    </div>
  );
}
