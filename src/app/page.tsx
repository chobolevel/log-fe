import Link from "next/link";
import { Code2, PenLine, BookOpen } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PostCard from "@/components/post/post-card";
import { Post } from "@/types/post";

const MOCK_POSTS: Post[] = [
  {
    id: "1",
    title: "Next.js 15 App Router 완전 정복 — 서버 컴포넌트부터 스트리밍까지",
    excerpt:
      "React Server Component가 바꿔놓은 Next.js의 데이터 패칭 방식과 스트리밍 렌더링을 실전 예제로 살펴봅니다.",
    category: "tech",
    author: { id: "1", name: "초로" },
    createdAt: "2025.08.10",
    readTime: 12,
    tags: ["Next.js", "React", "SSR"],
  },
  {
    id: "2",
    title: "개발자로 살아가는 것에 대하여",
    excerpt:
      "코드를 짜다 문득 이 직업을 선택한 이유를 되돌아보게 됐습니다. 번아웃과 회복, 그리고 다시 시작하는 이야기.",
    category: "blog",
    author: { id: "1", name: "초로" },
    createdAt: "2025.08.08",
    readTime: 6,
    tags: ["회고", "커리어"],
  },
  {
    id: "3",
    title: "비 오는 날의 카페에서",
    excerpt:
      "오늘은 오랜만에 단골 카페에 왔다. 빗소리를 들으며 아무 생각 없이 커피를 마셨다. 그것만으로 충분했다.",
    category: "diary",
    author: { id: "1", name: "초로" },
    createdAt: "2025.08.06",
    readTime: 3,
    tags: ["일상", "카페"],
  },
  {
    id: "4",
    title: "TypeScript 5.5 satisfies 연산자 제대로 쓰기",
    excerpt:
      "satisfies 연산자가 as와 어떻게 다른지, 타입 안전성을 유지하면서 유연하게 타입을 좁히는 방법을 정리합니다.",
    category: "tech",
    author: { id: "1", name: "초로" },
    createdAt: "2025.08.04",
    readTime: 8,
    tags: ["TypeScript"],
  },
  {
    id: "5",
    title: "사이드 프로젝트를 오래 유지하는 법",
    excerpt:
      "세 번의 중도 포기 후 깨달은 것들. 완성보다 지속이 중요한 이유, 그리고 작게 시작하는 것의 힘.",
    category: "blog",
    author: { id: "1", name: "초로" },
    createdAt: "2025.08.01",
    readTime: 5,
    tags: ["사이드프로젝트", "동기부여"],
  },
  {
    id: "6",
    title: "30일 챌린지 — 매일 한 줄씩 쓰기",
    excerpt:
      "글을 잘 못 써도 괜찮다고 생각하며 시작했다. 30일이 지나고 나서야 글쓰기가 생각 정리라는 걸 알았다.",
    category: "diary",
    author: { id: "1", name: "초로" },
    createdAt: "2025.07.30",
    readTime: 4,
    tags: ["챌린지", "글쓰기"],
  },
];

const CONTENT_TYPES = [
  {
    icon: Code2,
    label: "기술블로그",
    description: "개발 경험과 기술적 인사이트를 깊이 있게 기록하세요.",
    href: "/posts?category=tech",
    color: "text-green",
    bg: "bg-green-subtle",
  },
  {
    icon: PenLine,
    label: "블로그",
    description: "생각, 경험, 관점을 자유롭게 풀어내는 공간입니다.",
    href: "/posts?category=blog",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: BookOpen,
    label: "일기",
    description: "소소한 하루와 감정을 솔직하게 담아두세요.",
    href: "/posts?category=diary",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 히어로 */}
      <section className="relative overflow-hidden border-b border-border py-24 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-green opacity-[0.06] blur-3xl"
        />
        <div className="mx-auto max-w-6xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green/30 bg-green-subtle px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
            </span>
            <span className="text-xs font-semibold text-green-subtle-foreground">
              지금 베타 서비스 중
            </span>
          </div>
          <h1 className="text-5xl font-black leading-[1.15] tracking-tight md:text-7xl">
            기술부터 일상까지,
            <br />
            <span className="text-green">초로에서 기록하세요.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg font-light leading-relaxed text-muted-foreground">
            기술블로그, 블로그, 일기 — 모든 종류의 글을 하나의 공간에서.
            <br />
            당신의 생각을 세상과 나눠보세요.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/write"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 rounded-full bg-green px-8 text-green-foreground hover:bg-green/90"
              )}
            >
              <PenLine className="h-4 w-4" />
              지금 바로 쓰기
            </Link>
            <Link
              href="/posts"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full px-8"
              )}
            >
              글 둘러보기
            </Link>
          </div>
        </div>
      </section>

      {/* 콘텐츠 타입 */}
      <section className="border-b border-border py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-2 text-2xl font-black tracking-tight md:text-3xl">
            무엇이든 쓸 수 있어요
          </h2>
          <p className="mb-10 text-muted-foreground">
            글의 종류에 맞게 골라서 작성하세요.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {CONTENT_TYPES.map((type) => (
              <Link
                key={type.label}
                href={type.href}
                className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div className={cn("mb-4 inline-flex rounded-xl p-3", type.bg)}>
                  <type.icon className={cn("h-6 w-6", type.color)} />
                </div>
                <h3 className="mb-1.5 font-bold tracking-tight">{type.label}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {type.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 최근 글 */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-2xl font-black tracking-tight md:text-3xl">
                최근 글
              </h2>
              <p className="text-muted-foreground">초로에 새로 올라온 글들</p>
            </div>
            <Link
              href="/posts"
              className="text-sm font-medium text-green hover:underline"
            >
              전체 보기 →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_POSTS.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
