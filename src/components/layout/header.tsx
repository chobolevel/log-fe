"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { PenLine } from "lucide-react";

const NAV_ITEMS = [
  { label: "기술", href: "/posts?category=tech" },
  { label: "블로그", href: "/posts?category=blog" },
  { label: "일기", href: "/posts?category=diary" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="select-none text-lg font-black tracking-tight"
        >
          초로
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:text-foreground",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            로그인
          </Link>
          <Link
            href="/write"
            className={cn(
              buttonVariants({ size: "sm" }),
              "gap-1.5 bg-green text-green-foreground hover:bg-green/90"
            )}
          >
            <PenLine className="h-3.5 w-3.5" />
            글쓰기
          </Link>
        </div>
      </div>
    </header>
  );
}
