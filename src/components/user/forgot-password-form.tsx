"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSendResetPasswordEmail } from "@/hooks/user/user";

const schema = z.object({
  email: z.string().email("올바른 이메일을 입력해주세요."),
});

type FormValues = z.infer<typeof schema>;

export function ForgotPasswordForm() {
  const {
    mutate: sendEmail,
    isPending,
    isSuccess,
  } = useSendResetPasswordEmail();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: FormValues) => {
    sendEmail({ email: values.email });
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
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      {isSuccess && (
        <p className="text-sm text-green">
          이메일이 발송되었습니다. 메일함을 확인해주세요.
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="mt-1 h-9 w-full bg-green text-green-foreground hover:bg-green/85"
      >
        {isPending ? "발송 중..." : "초기화 이메일 발송"}
      </Button>
    </form>
  );
}
