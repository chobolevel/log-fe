import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    resolveAlias: {
      // pnpm이 @tanstack/react-query를 두 개의 물리적 인스턴스로 설치해
      // QueryClientContext가 달라지는 문제 방지 — 단일 경로로 강제
      "@tanstack/react-query": "./node_modules/@tanstack/react-query",
      // pnpm peer-dep 컨텍스트별 복수 인스턴스 문제 방지:
      // @tiptap/core·pm이 두 버전 공존 시 prosemirror-model이 중복 로드돼
      // "Adding different instances of a keyed plugin" RangeError 발생
      "@tiptap/core": "./node_modules/@tiptap/core",
      "@tiptap/pm": "./node_modules/@tiptap/pm",
    },
  },
};

export default nextConfig;
