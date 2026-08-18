export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* 배경 그린 블러 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-green opacity-[0.05] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -bottom-40 h-[400px] w-[400px] rounded-full bg-green opacity-[0.04] blur-3xl"
      />
      {children}
    </div>
  );
}
