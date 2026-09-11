import { RecordDetail } from "@/components/record/record-detail";

interface RecordDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function RecordDetailPage({ params }: RecordDetailPageProps) {
  const { id } = await params;

  return <RecordDetail id={Number(id)} />;
}
