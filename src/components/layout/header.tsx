import Link from "next/link";
import { HeaderAuth } from "@/components/layout/header-auth";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-lg font-black tracking-tight select-none"
        >
          초로
        </Link>
        <HeaderAuth />
      </div>
    </header>
  );
}
