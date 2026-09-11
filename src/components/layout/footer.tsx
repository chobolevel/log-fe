import { cn } from "@/lib/utils";

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("border-t border-border", className)}>
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <span className="text-xs font-black tracking-tight text-muted-foreground">
          초로
        </span>
        <p className="text-xs text-muted-foreground">
          © 2025 초로. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
