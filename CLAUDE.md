# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev            # 개발 서버 실행
pnpm build          # 프로덕션 빌드
pnpm lint           # ESLint 검사
pnpm format         # Prettier 포맷 적용
pnpm format:check   # Prettier 포맷 검사 (CI용)
```

## Architecture

**Next.js 16 App Router** 기반 블로그 서비스 프론트엔드. React 19 + TypeScript strict mode.

- `src/app/` — App Router 라우트. `layout.tsx`는 전역 폰트(Noto Sans KR)·메타데이터 설정, `globals.css`는 Tailwind v4 테마 변수 정의.
- `src/components/ui/` — shadcn/ui 컴포넌트. 직접 수정 가능하며 `shadcn add <component>`로 추가.
- `src/lib/utils.ts` — `cn()` 유틸리티 (clsx + tailwind-merge).

## Styling

Tailwind v4 + shadcn/ui (style: `base-nova`). CSS 변수는 `globals.css`의 `:root`에 정의하고 `@theme inline`에 등록해 Tailwind 유틸리티로 사용한다.

**포인트 컬러 변수 (그린 계열)**

| CSS 변수 | Tailwind 클래스 예시 | 용도 |
|---|---|---|
| `--green` | `bg-green`, `text-green`, `border-green` | 메인 그린 |
| `--green-foreground` | `text-green-foreground` | 그린 배경 위 텍스트 |
| `--green-subtle` | `bg-green-subtle` | 연한 그린 배경 |
| `--green-subtle-foreground` | `text-green-subtle-foreground` | 연한 그린 위 텍스트 |

새 색상 추가 시 `:root`에 변수 선언 → `@theme inline`에 `--color-*` 매핑 순서로 작업한다.

## Git 규칙

- **커밋 전 반드시 사용자에게 확인 후 진행한다.** 작업 완료 후 커밋 내용을 보여주고 승인받은 뒤 커밋할 것.
- **커밋 메시지에 `Co-Authored-By: Claude` 라인을 포함하지 않는다.**

## Key Conventions

- **경로 alias**: `@/` → `src/`
- **컴포넌트 추가**: `pnpm dlx shadcn add <component>` (components.json 기준으로 자동 설치)
- **React Compiler** 활성화(`reactCompiler: true`) — 불필요한 `useMemo`/`useCallback` 수동 추가 금지
- Tailwind 클래스 순서는 Prettier가 자동 정렬(`prettier-plugin-tailwindcss`)
