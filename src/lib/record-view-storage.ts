const STORAGE_KEY = "record-views";
const VIEW_TTL_MS = 24 * 60 * 60 * 1000;

type RecordViewMap = Record<string, number>;

function readMap(): RecordViewMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RecordViewMap) : {};
  } catch {
    return {};
  }
}

function writeMap(map: RecordViewMap): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // localStorage 사용 불가(시크릿 모드 저장 공간 제한 등) 시 무시 — 매 방문마다 요청되는 정도로 저하됨
  }
}

function pruneExpired(map: RecordViewMap, now: number): RecordViewMap {
  const next: RecordViewMap = {};
  for (const [id, viewedAt] of Object.entries(map)) {
    if (now - viewedAt < VIEW_TTL_MS) next[id] = viewedAt;
  }
  return next;
}

export function hasRecentlyViewed(recordId: number): boolean {
  const map = pruneExpired(readMap(), Date.now());
  return recordId in map;
}

export function markViewed(recordId: number): void {
  const now = Date.now();
  const map = pruneExpired(readMap(), now);
  map[recordId] = now;
  writeMap(map);
}

export function unmarkViewed(recordId: number): void {
  const map = pruneExpired(readMap(), Date.now());
  delete map[recordId];
  writeMap(map);
}
