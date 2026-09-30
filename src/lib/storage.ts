import type { KomId } from "@/data/koms";

// 브라우저 저장은 사생활 보호 모드 등에서 실패할 수 있어서 전부 try/catch

const PROGRESS_KEY = "kom-progress-v1";
const RESULT_KEY = "kom-result-v1";

export type Progress = {
  order: number[]; // 섞인 문항 번호 순서
  answers: Record<number, number>;
  index: number;
  startedAt: number;
};

export type SavedResult = {
  slug: string;
  scores: Record<KomId, number>;
};

function read<T>(store: () => Storage, key: string): T | null {
  try {
    const raw = store().getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(store: () => Storage, key: string, value: unknown) {
  try {
    if (value === null) store().removeItem(key);
    else store().setItem(key, JSON.stringify(value));
  } catch {}
}

const local = () => window.localStorage;

export const loadProgress = () => read<Progress>(local, PROGRESS_KEY);
export const saveProgress = (p: Progress | null) => write(local, PROGRESS_KEY, p);
// 결과는 새로고침·공유 후 돌아와도 내 점수 막대가 보이게 localStorage에 둔다
export const loadResult = () => read<SavedResult>(local, RESULT_KEY);
export const saveResult = (r: SavedResult) => write(local, RESULT_KEY, r);
