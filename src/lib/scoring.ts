import { KOMS, RARITY_ORDER, type KomId } from "@/data/koms";
import { QUESTIONS, type Question } from "@/data/questions";

// 주콤이 이 점수 이하면 철벽형 (4문항 평균 1.5 미만)
export const CHEOLBYEOK_MAX = 6;

export type Answers = Record<number, number>; // 문항 번호 → 0~4

export type Result =
  | { kind: "kom"; main: KomId; sub: KomId; scores: Record<KomId, number> }
  | { kind: "cheolbyeok"; scores: Record<KomId, number> };

export function scoreAll(answers: Answers) {
  const scores = Object.fromEntries(KOMS.map((k) => [k.id, 0])) as Record<KomId, number>;
  const maxes = Object.fromEntries(KOMS.map((k) => [k.id, 0])) as Record<KomId, number>;
  for (const q of QUESTIONS) {
    const a = answers[q.n] ?? 0;
    scores[q.kom] += a;
    if (a === 4) maxes[q.kom] += 1;
  }
  return { scores, maxes };
}

// 원점수 → "매우 그렇다" 개수 → 희귀도 순으로 정렬
export function rankKoms(answers: Answers): KomId[] {
  const { scores, maxes } = scoreAll(answers);
  return [...RARITY_ORDER].sort(
    (a, b) =>
      scores[b] - scores[a] ||
      maxes[b] - maxes[a] ||
      RARITY_ORDER.indexOf(a) - RARITY_ORDER.indexOf(b),
  );
}

export function computeResult(answers: Answers): Result {
  const { scores } = scoreAll(answers);
  const [main, sub] = rankKoms(answers);
  if (scores[main] <= CHEOLBYEOK_MAX) return { kind: "cheolbyeok", scores };
  return { kind: "kom", main, sub, scores };
}

export function resultSlug(r: Result) {
  return r.kind === "cheolbyeok" ? "cheolbyeok" : `${r.main}-${r.sub}`;
}

// 같은 콤 문항이 연달아 나오지 않게 섞는다. 조건을 못 맞추면 다시 섞기.
export function shuffleQuestions(random: () => number = Math.random): Question[] {
  for (;;) {
    const arr = [...QUESTIONS];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    if (arr.every((q, i) => i === 0 || arr[i - 1].kom !== q.kom)) return arr;
  }
}
