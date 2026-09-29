"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRecordContributions } from "@/hooks/record/record";

interface RecordContributionGraphProps {
  userId: number;
}

interface Cell {
  date: Date;
  count: number;
}

function toDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

interface Week {
  cells: (Cell | null)[];
  monthLabel: string | null;
}

function buildWeeks(year: number, countByDate: Map<string, number>): Week[] {
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  const cells: (Cell | null)[] = new Array(start.getDay()).fill(null);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const date = new Date(d);
    cells.push({ date, count: countByDate.get(toDateKey(date)) ?? 0 });
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: Week[] = [];
  let lastMonth = -1;
  for (let i = 0; i < cells.length; i += 7) {
    const weekCells = cells.slice(i, i + 7);
    const firstDay = weekCells.find((c): c is Cell => c !== null);
    let monthLabel: string | null = null;
    if (firstDay && firstDay.date.getDate() <= 7 && firstDay.date.getMonth() !== lastMonth) {
      monthLabel = `${firstDay.date.getMonth() + 1}월`;
      lastMonth = firstDay.date.getMonth();
    }
    weeks.push({ cells: weekCells, monthLabel });
  }
  return weeks;
}

function levelClass(count: number): string {
  if (count <= 0) return "bg-muted";
  if (count === 1) return "bg-green/30";
  if (count <= 3) return "bg-green/60";
  return "bg-green";
}

export function RecordContributionGraph({ userId }: RecordContributionGraphProps) {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const { data, isLoading } = useRecordContributions(year, userId);

  const countByDate = useMemo(() => {
    const map = new Map<string, number>();
    data?.forEach((c) => map.set(c.date, c.count));
    return map;
  }, [data]);

  const weeks = useMemo(() => buildWeeks(year, countByDate), [year, countByDate]);
  const total = data?.reduce((sum, c) => sum + c.count, 0) ?? 0;

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold">
          {year}년 {total}개의 기록
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setYear((y) => y - 1)}
            className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setYear((y) => y + 1)}
            disabled={year >= currentYear}
            className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="h-28 animate-pulse rounded-xl bg-muted" />
      ) : (
        <div className="overflow-x-auto">
          <div className="flex w-fit gap-[3px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                <div className="h-3 text-[10px] whitespace-nowrap text-muted-foreground">
                  {week.monthLabel}
                </div>
                {week.cells.map((cell, di) => (
                  <div
                    key={di}
                    title={
                      cell ? `${toDateKey(cell.date)} · ${cell.count}개` : undefined
                    }
                    className={cn(
                      "h-3 w-3 rounded-[2px]",
                      cell ? levelClass(cell.count) : "bg-transparent"
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
