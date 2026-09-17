"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const MAX_INTENSITY = 10;

interface IntensityDotsProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function IntensityDots({
  value,
  onChange,
  readOnly = false,
  size = "md",
  className,
}: IntensityDotsProps) {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;
  const dotSize = size === "sm" ? "h-1.5 w-1.5" : "h-3 w-3";
  const gap = size === "sm" ? "gap-0.5" : "gap-1.5";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("flex", gap)}>
        {Array.from({ length: MAX_INTENSITY }, (_, i) => i + 1).map((dot) =>
          readOnly ? (
            <span
              key={dot}
              className={cn(
                "rounded-full",
                dotSize,
                display >= dot ? "bg-green" : "bg-muted"
              )}
            />
          ) : (
            <button
              key={dot}
              type="button"
              onMouseEnter={() => setHover(dot)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onChange?.(dot)}
              className={cn(
                "rounded-full transition-colors",
                dotSize,
                display >= dot ? "bg-green" : "bg-muted hover:bg-green/40"
              )}
            />
          )
        )}
      </div>
      {size === "md" && value > 0 && (
        <span className="text-sm font-bold text-green tabular-nums">
          {value}
        </span>
      )}
    </div>
  );
}
