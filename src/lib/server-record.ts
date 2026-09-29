import { cookies } from "next/headers";
import type { RecordItem } from "@/types/record";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function getServerRecord(id: number): Promise<RecordItem | null> {
  const cookieStore = await cookies();
  const res = await fetch(`${BASE_URL}/api/v1/records/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });

  if (!res.ok) return null;

  const { data } = (await res.json()) as { data: RecordItem };
  return data;
}
