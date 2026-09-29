import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecordDetail } from "@/components/record/record-detail";
import { getServerRecord } from "@/lib/server-record";
import { htmlToExcerpt } from "@/lib/utils";

interface RecordDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: RecordDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const record = await getServerRecord(Number(id));

  if (!record) return {};

  const description = htmlToExcerpt(record.content);

  return {
    title: record.title,
    description,
    robots: record.is_private ? { index: false, follow: false } : undefined,
    openGraph: {
      title: record.title,
      description,
      type: "article",
      publishedTime: new Date(record.created_at).toISOString(),
      authors: [record.writer.nickname],
    },
  };
}

export default async function RecordDetailPage({
  params,
}: RecordDetailPageProps) {
  const { id } = await params;
  const record = await getServerRecord(Number(id));

  if (!record) notFound();

  return <RecordDetail id={Number(id)} initialRecord={record} />;
}
