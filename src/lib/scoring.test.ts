import { describe, expect, it } from "vitest";
import { KOMS, RARITY_ORDER } from "@/data/koms";
import { QUESTIONS } from "@/data/questions";
import { computeResult, rankKoms, shuffleQuestions, type Answers } from "./scoring";

const allAnswers = (v: number): Answers => Object.fromEntries(QUESTIONS.map((q) => [q.n, v]));

describe("문항 데이터", () => {
  it("64문항, 번호 1~64", () => {
    expect(QUESTIONS.map((q) => q.n)).toEqual(Array.from({ length: 64 }, (_, i) => i + 1));
  });
  it("콤마다 정확히 4문항", () => {
    for (const k of KOMS) expect(QUESTIONS.filter((q) => q.kom === k.id)).toHaveLength(4);
  });
  it("희귀도 순서에 16콤이 한 번씩", () => {
    expect([...RARITY_ORDER].sort()).toEqual(KOMS.map((k) => k.id).sort());
  });
  it("취향 친구·원수는 자기 자신이 아님", () => {
    for (const k of KOMS) {
      expect(k.friend).not.toBe(k.id);
      expect(k.enemy).not.toBe(k.id);
    }
  });
});

describe("채점", () => {
  it("전부 낮으면 철벽형", () => {
    expect(computeResult(allAnswers(1)).kind).toBe("cheolbyeok");
  });
  it("전부 같은 점수면 희귀도 순서대로 퍼리 > 인외", () => {
    const r = computeResult(allAnswers(3));
    expect(r).toMatchObject({ kind: "kom", main: "furry", sub: "inoe" });
  });
  it("원점수가 우선", () => {
    const a = allAnswers(2);
    for (const q of QUESTIONS) if (q.kom === "dajeong") a[q.n] = 4;
    for (const q of QUESTIONS) if (q.kom === "eumchim") a[q.n] = 3;
    expect(computeResult(a)).toMatchObject({ main: "dajeong", sub: "eumchim" });
  });
  it("동점이면 '매우 그렇다' 개수가 많은 쪽", () => {
    const a = allAnswers(0);
    // 다정: 4,4,0,0 = 8 / 퍼리: 2,2,2,2 = 8 → 희귀도는 퍼리가 높지만 다정이 이김
    QUESTIONS.filter((q) => q.kom === "dajeong").slice(0, 2).forEach((q) => (a[q.n] = 4));
    QUESTIONS.filter((q) => q.kom === "furry").forEach((q) => (a[q.n] = 2));
    expect(rankKoms(a)[0]).toBe("dajeong");
  });
});

describe("문항 섞기", () => {
  it("1,000번 섞어도 같은 콤이 연달아 나오지 않고 64문항 그대로", () => {
    for (let t = 0; t < 1000; t++) {
      const s = shuffleQuestions();
      expect(new Set(s.map((q) => q.n)).size).toBe(64);
      for (let i = 1; i < s.length; i++) expect(s[i].kom).not.toBe(s[i - 1].kom);
    }
  });
});
