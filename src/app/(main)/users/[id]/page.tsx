import { UserProfile } from "@/components/user/user-profile";

interface UserProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  const { id } = await params;

  return <UserProfile userId={Number(id)} />;
}
