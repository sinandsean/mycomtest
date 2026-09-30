import Link from "next/link";
import { KOMS } from "@/data/koms";
import { AdSlot } from "@/components/AdSlot";
import { Flourish } from "@/components/Flourish";
import { SITE } from "@/lib/site";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col pt-8">
      {/* 만화책 표지 */}
      <section className="relative px-2 pt-6 pb-4">
        <p className="text-center text-[11px] font-semibold tracking-[0.2em] text-muted">
          숨겨진 취향 폭로 테스트
        </p>

        <h1 className="lettering mt-6 text-center text-[64px] leading-[1.05]">
          <span className="block -rotate-3">
            나는<span className="sparkle ml-1 align-top text-3xl">✦</span>
          </span>
          <span className="block text-[80px]">무슨 콤</span>
          <span className="block rotate-2">
            <span className="sparkle pink mr-1 align-top text-2xl">✦</span>일까?
          </span>
        </h1>

        <p className="font-script mt-3 text-center text-[28px] text-sky">Which one do you secretly love?</p>
        <p className="mt-2 text-center font-display text-lg text-accent">~{SITE.subtitle}~</p>
      </section>

      <Flourish />

      <p className="mt-6 text-center text-[17px] font-bold leading-relaxed">
        당신이 절대 인정하고 싶지 않았던
        <br />
        취향은?
      </p>

      <ul className="mt-5 flex flex-wrap justify-center gap-1.5" aria-label="16가지 콤">
        {KOMS.map((k) => (
          <li
            key={k.id}
            className="flex items-center gap-1 rounded-full border border-line bg-white/90 px-2.5 py-1 text-xs"
          >
            <span className="h-2 w-2 rounded-full" style={{ background: k.color }} />
            {k.name}
          </li>
        ))}
      </ul>

      <Link href="/test" className="btn-rose mt-8 py-5 text-lg">
        <span className="animate-beat mr-1 inline-block">♡</span> 내 콤 확인하기
      </Link>
      <p className="mt-3 text-center text-sm text-muted">64문항 · 약 4분 · 16가지 콤</p>
      <Link href="/types" className="mt-2 block py-2 text-center text-sm text-muted underline underline-offset-4">
        16가지 콤 도감 먼저 보기
      </Link>

      <AdSlot id="home-bottom" />
    </main>
  );
}
