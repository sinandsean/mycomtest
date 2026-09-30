import type { Metadata } from "next";
import Link from "next/link";
import { KOMS } from "@/data/koms";
import { AdSlot } from "@/components/AdSlot";
import { Flourish } from "@/components/Flourish";

export const metadata: Metadata = {
  title: "콤 도감",
  description: "오지콤부터 퍼리콤까지, 16가지 콤을 한눈에.",
};

export default function TypesPage() {
  return (
    <main className="flex flex-1 flex-col pt-10">
      <h1 className="lettering text-center text-5xl">
        콤 도감<span className="sparkle ml-1 align-top text-2xl">✦</span>
      </h1>
      <p className="font-script mt-1 text-center text-2xl text-sky">Sixteen secret tastes</p>
      <Flourish className="mt-5" />

      <ul className="mt-6 grid grid-cols-2 gap-3">
        {KOMS.map((k) => (
          <li key={k.id}>
            <Link href={`/types/${k.id}`} className="panel flex h-full flex-col p-3">
              <span
                className="flex aspect-square items-center justify-center rounded text-5xl"
                style={{ background: k.color }}
              >
                {k.emoji}
              </span>
              <span className="mt-2 font-display text-lg">{k.name}</span>
              <span className="mt-1 text-xs leading-snug text-muted">{k.tagline}</span>
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/test" className="btn-rose mt-8 py-4">
        ♡ 나는 무슨 콤인지 확인하기
      </Link>
      <AdSlot id="types-bottom" />
    </main>
  );
}
