import { Suspense } from "react";
import { RecordList } from "@/components/record/record-list";

export default function RecordsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight md:text-3xl">기록</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          모든 기록을 둘러보세요.
        </p>
      </div>
      <Suspense>
        <RecordList />
      </Suspense>
    </div>
  );
}
