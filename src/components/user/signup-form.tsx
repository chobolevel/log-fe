"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { nicknameField, passwordField } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useSendEmailVerificationCode,
  useVerifyEmailVerificationCode,
  useSignup,
} from "@/hooks/user/user";

const schema = z
  .object({
    email: z.string().email("올바른 이메일을 입력해주세요."),
    nickname: nicknameField,
    password: passwordField,
    password_confirm: z.string(),
  })
  .refine((d) => d.password === d.password_confirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["password_confirm"],
  });

type FormValues = z.infer<typeof schema>;

export function SignupForm() {
  const [verificationCode, setVerificationCode] = useState("");

  const {
    mutate: sendCode,
    isPending: isSending,
    isSuccess: codeSent,
  } = useSendEmailVerificationCode();

  const {
    mutate: verifyCode,
    isPending: isVerifying,
    isSuccess: verified,
  } = useVerifyEmailVerificationCode();

  const { mutate: signup, isPending: isSigningUp } = useSignup();

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSendCode = async () => {
    const valid = await trigger("email");
    if (!valid) return;
    sendCode({ email: getValues("email") });
  };

  const onVerifyCode = () => {
    verifyCode({
      email: getValues("email"),
      verification_code: verificationCode,
    });
  };

  const onSubmit = (values: FormValues) => {
    signup({
      email: values.email,
      password: values.password,
      nickname: values.nickname,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">이메일</Label>
        <div className="flex gap-2">
          <Input
            id="email"
            type="email"
            placeholder="hello@example.com"
            autoComplete="email"
            readOnly={verified}
            className="flex-1"
            {...register("email")}
          />
          <Button
            type="button"
            variant="outline"
            className="shrink-0"
            disabled={isSending || verified}
            onClick={onSendCode}
          >
            {isSending ? "발송 중..." : codeSent ? "재발송" : "코드 발송"}
          </Button>
        </div>
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      {codeSent && (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="verification_code">인증 코드</Label>
          <div className="flex gap-2">
            <Input
              id="verification_code"
              type="text"
              placeholder="인증 코드를 입력해주세요."
              readOnly={verified}
              className="flex-1"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              className="shrink-0"
              disabled={isVerifying || verified}
              onClick={onVerifyCode}
            >
              {isVerifying ? "확인 중..." : verified ? "인증 완료" : "확인"}
            </Button>
          </div>
          {verified && (
            <p className="text-xs text-green">이메일이 인증되었습니다.</p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          id="nickname"
          type="text"
          placeholder="홍길동"
          {...register("nickname")}
        />
        {errors.nickname && (
          <p className="text-xs text-destructive">{errors.nickname.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">비밀번호</Label>
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
        <Label htmlFor="password_confirm">비밀번호 확인</Label>
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
        disabled={isSigningUp || !verified}
        className="mt-1 h-9 w-full bg-green text-green-foreground hover:bg-green/85"
      >
        {isSigningUp ? "가입 중..." : "회원가입"}
      </Button>
    </form>
  );
}
