import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    resolveAlias: {
      // pnpm이 @tanstack/react-query를 두 개의 물리적 인스턴스로 설치해
      // QueryClientContext가 달라지는 문제 방지 — 단일 경로로 강제
      "@tanstack/react-query": "./node_modules/@tanstack/react-query",
    },
  },
};

export default nextConfig;
