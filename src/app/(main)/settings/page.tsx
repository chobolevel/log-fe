import { ProfileForm } from "@/components/user/profile-form";

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight">설정</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          계정 정보를 관리하세요.
        </p>
      </div>
      <ProfileForm />
    </div>
  );
}
