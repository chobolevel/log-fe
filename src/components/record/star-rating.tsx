"use client";

import { useState } from "react";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

export function StarRating({ value, onChange }: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;

  const activeScore = hover ?? value;

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="relative h-8 w-8"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const isLeftHalf = e.clientX < rect.left + rect.width / 2;
            setHover(isLeftHalf ? star - 0.5 : star);
          }}
          onMouseLeave={() => setHover(null)}
          onClick={() => onChange(hover ?? star)}
        >
          <StarIcon
            className="absolute inset-0 h-8 w-8 text-muted-foreground/30"
            filled={false}
          />
          {display >= star && (
            <StarIcon
              className="absolute inset-0 h-8 w-8 text-yellow-400"
              filled
            />
          )}
          {display >= star - 0.5 && display < star && (
            <div className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
              <StarIcon className="h-8 w-8 text-yellow-400" filled />
            </div>
          )}
        </button>
      ))}
      </div>
      {activeScore > 0 && (
        <span className="text-sm font-bold tabular-nums text-yellow-500">
          {activeScore.toFixed(1)}
        </span>
      )}
    </div>
  );
}

function StarIcon({
  className,
  filled,
}: {
  className?: string;
  filled: boolean;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}
