// 상호작용 가능한 pill/chip 요소의 3단계 사이즈 정의
// 버튼 사이즈(sm=h-8, default=h-9, lg=h-10)와 연속적으로 이어지도록 설계
export const PILL_SIZE = {
  sm: "h-7 px-3 text-xs",    // 모달 내부 필터 등 밀도 높은 공간
  md: "h-8 px-3.5 text-xs",  // 기록 타입 칩, 일반 태그
  lg: "h-9 px-4 text-sm",    // 넓은 영역의 주요 선택 칩
} as const;
