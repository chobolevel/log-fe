import HomeFeed from "@/components/home/home-feed";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight md:text-3xl">홈</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          초로에 기록된 이야기들
        </p>
      </div>
      <HomeFeed />
    </div>
  );
}
