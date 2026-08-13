export default function Home() {
  return (
    <main className="relative flex min-h-svh flex-1 flex-col overflow-hidden">
      {/* 배경 장식 — 그린 원형 블러 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-green opacity-[0.07] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-60 -left-40 h-[500px] w-[500px] rounded-full bg-green opacity-[0.05] blur-3xl"
      />

      {/* 헤더 */}
      <header className="flex items-center justify-between px-8 pt-8 md:px-16">
        <span className="select-none text-xl font-black tracking-tight">
          초로
        </span>
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Cholo
        </span>
      </header>

      {/* 본문 — 세로 중앙 */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        {/* 상태 뱃지 */}
        <div className="mb-12 inline-flex items-center gap-2 rounded-full border border-green/30 bg-green-subtle px-4 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
          </span>
          <span className="text-xs font-semibold tracking-wide text-green-subtle-foreground">
            리뉴얼 진행 중
          </span>
        </div>

        {/* 메인 헤드라인 */}
        <h1 className="text-5xl font-black leading-[1.15] tracking-tight md:text-7xl lg:text-8xl">
          더 나은 초로,
          <br />
          <span className="text-green">곧 만나요.</span>
        </h1>

        {/* 서브텍스트 */}
        <p className="mt-8 max-w-md text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
          초로 블로그가 새로운 모습으로
          <br />
          돌아오기 위해 열심히 준비 중입니다.
        </p>

        {/* 구분선 */}
        <div className="mt-16 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="h-px w-10 bg-border" />
          <span className="font-medium">cholo.dev</span>
          <div className="h-px w-10 bg-border" />
        </div>
      </section>

      {/* 푸터 */}
      <footer className="flex items-center justify-between px-8 pb-8 md:px-16">
        <p className="text-xs text-muted-foreground">
          © 2025 초로. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">곧 돌아올게요 👋</p>
      </footer>
    </main>
  );
}
