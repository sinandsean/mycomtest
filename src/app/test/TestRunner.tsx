"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ANSWER_LABELS, CHEERS, QUESTIONS } from "@/data/questions";
import { computeResult, resultSlug, shuffleQuestions } from "@/lib/scoring";
import { loadProgress, saveProgress, saveResult, type Progress } from "@/lib/storage";
import { track } from "@/lib/analytics";
import { AdSlot } from "@/components/AdSlot";

const BY_N = Object.fromEntries(QUESTIONS.map((q) => [q.n, q]));
const TOTAL = QUESTIONS.length;
const ANALYZING_MS = 2200;

const secondsSince = (t: number) => Math.round((Date.now() - t) / 1000);

function newProgress(): Progress {
  return { order: shuffleQuestions().map((q) => q.n), answers: {}, index: 0, startedAt: Date.now() };
}

export function TestRunner() {
  const router = useRouter();
  const [p, setP] = useState<Progress | null>(null);
  const [cheer, setCheer] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const locked = useRef(false);
  const progressRef = useRef<Progress | null>(null);
  useEffect(() => {
    progressRef.current = p;
  }, [p]);

  // 이어하기 또는 새로 시작
  useEffect(() => {
    const saved = loadProgress();
    const valid = saved && saved.order.length === TOTAL && saved.index < TOTAL;
    const start = valid ? saved : newProgress();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 브라우저 저장소는 마운트 후에만 읽을 수 있음
    setP(start);
    track("test_started", { resumed: Boolean(valid) });
  }, []);

  // 중간에 나가면 이탈 지점 기록
  useEffect(() => {
    const onHide = () => {
      const cur = progressRef.current;
      if (cur && !locked.current && cur.index > 0 && cur.index < TOTAL) {
        track("test_abandoned", { answered: cur.index }, true);
      }
    };
    window.addEventListener("pagehide", onHide);
    return () => window.removeEventListener("pagehide", onHide);
  }, []);

  if (!p) return <main className="flex-1" />;

  if (analyzing) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center py-16 text-center">
        <div className="animate-beat text-7xl text-accent">♡</div>
        <p className="lettering mt-6 text-4xl">취향 분석 중…</p>
        <p className="font-script mt-2 text-2xl text-sky">Your secret is almost out</p>
        <p className="mt-2 text-sm text-muted">숨기고 싶었던 걸 찾고 있어요</p>
        <div className="w-full">
          <AdSlot id="analyzing" />
        </div>
      </main>
    );
  }

  const q = BY_N[p.order[p.index]];
  const current = p.answers[q.n];

  function answer(value: number) {
    if (locked.current || !p) return;
    locked.current = true;
    const answers = { ...p.answers, [q.n]: value };
    const answered = p.index + 1;

    if (answered === TOTAL) {
      const result = computeResult(answers);
      const slug = resultSlug(result);
      saveResult({ slug, scores: result.scores });
      saveProgress(null);
      track("test_completed", {
        result: slug,
        main: result.kind === "kom" ? result.main : null,
        sub: result.kind === "kom" ? result.sub : null,
        duration_sec: secondsSince(p.startedAt),
        scores: result.scores,
      });
      setAnalyzing(true);
      setTimeout(() => router.push(`/r/${slug}`), ANALYZING_MS);
      return;
    }

    if (answered % 8 === 0) track("test_progress", { answered });
    const next = { ...p, answers, index: answered };
    setTimeout(() => {
      setP(next);
      saveProgress(next);
      setCheer(CHEERS[answered] ?? null);
      locked.current = false;
    }, 160);
  }

  function back() {
    if (!p || p.index === 0) return;
    const prev = { ...p, index: p.index - 1 };
    setP(prev);
    saveProgress(prev);
    setCheer(null);
  }

  return (
    <main className="flex flex-1 flex-col pt-6">
      <div className="flex items-center gap-3">
        <button
          onClick={back}
          disabled={p.index === 0}
          className="h-9 w-9 shrink-0 rounded-full text-lg disabled:opacity-20"
          aria-label="이전 문항"
        >
          ←
        </button>
        <div className="relative h-2.5 flex-1 rounded-full bg-line">
          <div
            className="h-full rounded-full bg-gradient-to-r from-pink to-accent transition-all duration-300"
            style={{ width: `${(p.index / TOTAL) * 100}%` }}
          />
          <span
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-base leading-none text-accent transition-all duration-300"
            style={{ left: `${(p.index / TOTAL) * 100}%` }}
            aria-hidden
          >
            ♥
          </span>
        </div>
        <span className="w-14 shrink-0 text-right text-sm tabular-nums text-muted">
          {p.index + 1} / {TOTAL}
        </span>
      </div>

      <p className="mt-4 text-center text-xs text-muted">현실이든 픽션이든 상관없이, 끌리는 대로 답해주세요.</p>

      <div className="mt-3 min-h-6 text-center font-display text-base text-accent">
        {cheer && (
          <>
            <span className="sparkle mr-1">✦</span>
            {cheer}
          </>
        )}
      </div>

      {/* 말풍선 */}
      <div key={q.n} className="animate-pop relative mt-5">
        <h2 style={{ borderRadius: 28 }} className="panel flex min-h-[8.5rem] items-center justify-center px-5 py-6 text-center text-xl font-bold leading-relaxed">
          {q.text}
        </h2>
        <span
          className="absolute -bottom-[11px] left-12 h-5 w-5 rotate-45 border-b-2 border-r-2 border-ink bg-card"
          aria-hidden
        />
      </div>

      <div className="mt-8 flex flex-col gap-2.5 pb-8">
        {ANSWER_LABELS.map((label, value) => {
          const selected = current === value;
          return (
            <button
              key={label}
              onClick={() => answer(value)}
              className={`rounded-full border-2 py-3.5 text-base font-semibold transition active:scale-[0.98] ${
                selected ? "border-accent bg-accent text-white" : "border-pink bg-card"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </main>
  );
}
