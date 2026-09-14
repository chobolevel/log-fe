import { RecordEditForm } from "@/components/record/record-edit-form";

interface RecordEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function RecordEditPage({ params }: RecordEditPageProps) {
  const { id } = await params;

  return <RecordEditForm id={Number(id)} />;
}
