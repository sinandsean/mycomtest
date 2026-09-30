"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { KOMS, RARITY_ORDER, type KomId } from "@/data/koms";
import { track } from "@/lib/analytics";
import { useOwnResult } from "./useOwnResult";

// 공유 링크로 들어온 사람에게만 맨 위에 보이는 버튼
export function VisitorCta({ slug }: { slug: string }) {
  const { ready, own } = useOwnResult(slug);
  const tracked = useRef(false);
  useEffect(() => {
    if (!ready || tracked.current) return;
    tracked.current = true;
    track("result_viewed", { result: slug, own: Boolean(own) });
  }, [ready, own, slug]);

  if (!ready || own) return null;
  return (
    <Link
      href="/test"
      onClick={() => track("try_cta_clicked", { result: slug })}
      className="btn-rose animate-pop mb-5 py-4"
    >
      ♡ 친구 결과 구경 중 · 나도 해보기
    </Link>
  );
}

// 내 16콤 점수 막대 (본인에게만)
export function ScoreProfile({ slug }: { slug: string }) {
  const { own } = useOwnResult(slug);
  if (!own) return null;
  const rows = [...KOMS].sort(
    (a, b) =>
      own.scores[b.id] - own.scores[a.id] ||
      RARITY_ORDER.indexOf(a.id) - RARITY_ORDER.indexOf(b.id),
  );
  return (
    <section className="panel mt-8 px-5 py-6">
      <h3 className="font-display text-xl text-accent">나의 16콤 프로필</h3>
      <p className="mt-1 text-xs text-muted">콤당 16점 만점</p>
      <ul className="mt-4 flex flex-col gap-2">
        {rows.map((k) => (
          <li key={k.id} className="flex items-center gap-2 text-sm">
            <span className="w-20 shrink-0">
              {k.emoji} {k.name}
            </span>
            <span className="h-3 flex-1 overflow-hidden rounded-full bg-line">
              <span
                className="block h-full rounded-full"
                style={{ width: `${(own.scores[k.id as KomId] / 16) * 100}%`, background: k.color }}
              />
            </span>
            <span className="w-6 text-right tabular-nums text-muted">{own.scores[k.id as KomId]}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RetakeLink({ slug }: { slug: string }) {
  return (
    <Link
      href="/test"
      onClick={() => track("retake_clicked", { result: slug })}
      className="btn-line py-3.5"
    >
      다시 하기
    </Link>
  );
}
