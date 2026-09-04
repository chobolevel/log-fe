import { ProfileForm } from "@/components/user/profile-form";

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight">프로필</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          계정 정보를 관리하세요.
        </p>
      </div>
      <ProfileForm />
    </div>
  );
}
