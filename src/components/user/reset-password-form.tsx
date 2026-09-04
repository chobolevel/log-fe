"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { passwordField } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPassword } from "@/hooks/user/user";

const schema = z
  .object({
    email: z.string().email("올바른 이메일을 입력해주세요."),
    code: z.string().min(1, "인증 코드를 입력해주세요."),
    password: passwordField,
    password_confirm: z.string(),
  })
  .refine((d) => d.password === d.password_confirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["password_confirm"],
  });

type FormValues = z.infer<typeof schema>;

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") ?? "";
  const codeFromQuery = searchParams.get("code") ?? "";

  const { mutate: resetPassword, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: emailFromQuery, code: codeFromQuery },
  });

  const onSubmit = (values: FormValues) => {
    resetPassword({
      email: values.email,
      code: values.code,
      password: values.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="email"
          placeholder="hello@example.com"
          autoComplete="email"
          readOnly={!!emailFromQuery}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="code">인증 코드</Label>
        <Input
          id="code"
          type="text"
          placeholder="인증 코드를 입력해주세요."
          readOnly={!!codeFromQuery}
          {...register("code")}
        />
        {errors.code && (
          <p className="text-xs text-destructive">{errors.code.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">새 비밀번호</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password_confirm">새 비밀번호 확인</Label>
        <Input
          id="password_confirm"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          {...register("password_confirm")}
        />
        {errors.password_confirm && (
          <p className="text-xs text-destructive">
            {errors.password_confirm.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="mt-1 h-9 w-full bg-green text-green-foreground hover:bg-green/85"
      >
        {isPending ? "초기화 중..." : "비밀번호 초기화"}
      </Button>
    </form>
  );
}
