"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, PenLine, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMe } from "@/hooks/user/user";

const TABS = [
  { href: "/", icon: Home, label: "홈" },
  { href: "/records", icon: BookOpen, label: "기록" },
  { href: "/records/write", icon: PenLine, label: "작성" },
  { href: "/profile", icon: User, label: "프로필" },
];

export default function BottomTabBar() {
  const pathname = usePathname();
  const { data: user } = useMe();

  if (!user) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 backdrop-blur-md md:hidden">
      <div className="flex h-16 items-center justify-around px-2 pb-safe">
        {TABS.map(({ href, icon: Icon, label }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl px-4 py-2 text-xs font-medium transition-colors",
                isActive
                  ? "text-green"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon
                className={cn("h-5 w-5", isActive && "stroke-[2.5px]")}
              />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
