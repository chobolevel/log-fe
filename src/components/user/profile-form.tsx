"use client";

import { useRef, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { nicknameField, passwordField } from "@/lib/validators";
import { Camera, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useMe,
  useUpdateUser,
  useChangePassword,
  useResign,
} from "@/hooks/user/user";
import {
  useUploadProfileImage,
  useDeleteUserImage,
} from "@/hooks/user/userImage";

const nicknameSchema = z.object({
  nickname: nicknameField,
});

const passwordSchema = z
  .object({
    cur_password: z.string().min(1, "현재 비밀번호를 입력해주세요."),
    new_password: passwordField,
    confirm_password: z.string().min(1, "비밀번호 확인을 입력해주세요."),
  })
  .refine((v) => v.new_password === v.confirm_password, {
    message: "새 비밀번호가 일치하지 않습니다.",
    path: ["confirm_password"],
  });

type NicknameValues = z.infer<typeof nicknameSchema>;
type PasswordValues = z.infer<typeof passwordSchema>;

export function ProfileForm() {
  const { data: user, isLoading } = useMe();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const { mutate: uploadImage, isPending: isUploading } =
    useUploadProfileImage();
  const { mutate: deleteImage, isPending: isDeleting } = useDeleteUserImage();
  const { mutate: changePassword, isPending: isChangingPw } =
    useChangePassword();
  const { mutate: resign, isPending: isResigning } = useResign();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resignDialogOpen, setResignDialogOpen] = useState(false);

  const nicknameForm = useForm<NicknameValues>({
    resolver: zodResolver(nicknameSchema),
    values: { nickname: user?.nickname ?? "" },
  });

  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { cur_password: "", new_password: "", confirm_password: "" },
  });
  const { errors: pwErrors } = useFormState({ control: passwordForm.control });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadImage(file);
    e.target.value = "";
  };

  const handleNicknameSubmit = (values: NicknameValues) => {
    updateUser({ nickname: values.nickname, update_mask: ["NICKNAME"] });
  };

  const handlePasswordSubmit = (values: PasswordValues) => {
    changePassword(
      { cur_password: values.cur_password, new_password: values.new_password },
      { onSuccess: () => passwordForm.reset() }
    );
  };

  const handleResign = () => {
    resign(undefined, { onSuccess: () => setResignDialogOpen(false) });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (!user) return null;

  const initials = user.nickname.slice(0, 2).toUpperCase();
  const profileImage = user.profile_image;
  const imageLoading = isUploading || isDeleting;

  return (
    <div className="space-y-6">
      {/* 프로필 사진 */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-5 text-base font-bold">프로필 사진</h2>
        <div className="flex items-center gap-6">
          <div className="relative">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profileImage?.url} alt={user.nickname} />
              <AvatarFallback className="text-lg font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5"
              disabled={imageLoading}
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="h-3.5 w-3.5" />
              {profileImage ? "변경" : "업로드"}
            </Button>

            {profileImage && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5 text-destructive hover:text-destructive"
                disabled={imageLoading}
                onClick={() => deleteImage(profileImage.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
                삭제
              </Button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </section>

      {/* 기본 정보 */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-5 text-base font-bold">기본 정보</h2>
        <div className="mb-5 space-y-1.5">
          <Label htmlFor="email" className="text-sm text-muted-foreground">
            이메일
          </Label>
          <Input id="email" value={user.email} disabled className="bg-muted" />
        </div>

        <form onSubmit={nicknameForm.handleSubmit(handleNicknameSubmit)}>
          <div className="mb-4 space-y-1.5">
            <Label htmlFor="nickname">닉네임</Label>
            <Input
              id="nickname"
              placeholder="닉네임을 입력하세요"
              {...nicknameForm.register("nickname")}
            />
            {nicknameForm.formState.errors.nickname && (
              <p className="text-xs text-destructive">
                {nicknameForm.formState.errors.nickname.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            size="sm"
            disabled={isUpdating}
            className="bg-green text-green-foreground hover:bg-green/85"
          >
            {isUpdating ? "저장 중..." : "저장"}
          </Button>
        </form>
      </section>

      {/* 비밀번호 변경 (일반 로그인만) */}
      {user.login_type === "GENERAL" && (
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-5 text-base font-bold">비밀번호 변경</h2>
          <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="curPassword">현재 비밀번호</Label>
                <Input
                  id="curPassword"
                  type="password"
                  placeholder="••••••••"
                  {...passwordForm.register("cur_password")}
                />
                {pwErrors.cur_password && (
                  <p className="text-xs text-destructive">
                    {pwErrors.cur_password.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="newPassword">새 비밀번호</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="••••••••"
                  {...passwordForm.register("new_password")}
                />
                {pwErrors.new_password && (
                  <p className="text-xs text-destructive">
                    {pwErrors.new_password.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  {...passwordForm.register("confirm_password")}
                />
                {pwErrors.confirm_password && (
                  <p className="text-xs text-destructive">
                    {pwErrors.confirm_password.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              size="sm"
              disabled={isChangingPw}
              className="mt-5 bg-green text-green-foreground hover:bg-green/85"
            >
              {isChangingPw ? "변경 중..." : "비밀번호 변경"}
            </Button>
          </form>
        </section>
      )}

      {/* 계정 관리 */}
      <section className="rounded-2xl border border-destructive/30 bg-card p-6">
        <h2 className="mb-1 text-base font-bold text-destructive">위험 구역</h2>
        <p className="mb-5 text-sm text-muted-foreground">
          탈퇴 후 계정 및 모든 데이터는 복구할 수 없습니다.
        </p>
        <Separator className="mb-5" />

        <Dialog open={resignDialogOpen} onOpenChange={setResignDialogOpen}>
          <DialogTrigger render={<Button variant="destructive" size="sm" />}>
            회원 탈퇴
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>정말 탈퇴하시겠습니까?</DialogTitle>
              <DialogDescription>
                탈퇴하면 계정과 모든 데이터가 영구적으로 삭제됩니다. 이 작업은
                되돌릴 수 없습니다.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setResignDialogOpen(false)}
              >
                취소
              </Button>
              <Button
                variant="destructive"
                disabled={isResigning}
                onClick={handleResign}
              >
                {isResigning ? "처리 중..." : "탈퇴하기"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
}
