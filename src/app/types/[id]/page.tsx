import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KOMS, KOM_BY_ID, type KomId } from "@/data/koms";
import { komImage } from "@/lib/images";
import { AdSlot } from "@/components/AdSlot";
import { KomVisual } from "@/components/KomVisual";
import { TypesViewTracker } from "./TypesViewTracker";

export const dynamicParams = false;

export function generateStaticParams() {
  return KOMS.map((k) => ({ id: k.id }));
}

export async function generateMetadata({ params }: PageProps<"/types/[id]">): Promise<Metadata> {
  const { id } = await params;
  const k = KOM_BY_ID[id as KomId];
  return k ? { title: k.name, description: k.tagline } : {};
}

export default async function KomPage({ params }: PageProps<"/types/[id]">) {
  const { id } = await params;
  const k = KOM_BY_ID[id as KomId];
  if (!k) notFound();
  const friend = KOM_BY_ID[k.friend];
  const enemy = KOM_BY_ID[k.enemy];

  return (
    <main className="flex flex-1 flex-col pt-8">
      <TypesViewTracker kom={k.id} />
      <Link href="/types" className="text-sm text-muted">
        ← 콤 도감
      </Link>
      <div className="panel mt-4 p-2">
        <KomVisual image={komImage(k.id)} color={k.color} emoji={k.emoji} alt={k.name} />
      </div>
      <h1 className="lettering mt-6 text-center text-5xl">{k.name}</h1>
      <p className="mt-2 text-center text-sm text-muted">{k.keywords}</p>
      <p className="mt-3 text-center font-bold">{k.tagline}</p>

      <section className="panel mt-6 px-5 py-6 leading-[1.85]">
        {k.body.map((para, i) => (
          <p key={i} className={i ? "mt-4" : ""}>
            {para}
          </p>
        ))}
        {k.warning && (
          <p className="mt-4 text-xs text-muted">※ 현실 연애에선 이건 위험 신호입니다. 픽션에서만 즐기세요.</p>
        )}
      </section>

      <p className="mt-6 text-center text-sm">
        취향 친구{" "}
        <Link href={`/types/${friend.id}`} className="font-bold text-accent">
          {friend.emoji} {friend.name}
        </Link>
        {" · "}취향 원수{" "}
        <Link href={`/types/${enemy.id}`} className="font-bold text-accent">
          {enemy.emoji} {enemy.name}
        </Link>
      </p>

      <Link href="/test" className="btn-rose mt-8 py-4">
        ♡ 나도 {k.name}인지 확인하기
      </Link>
      <AdSlot id="type-bottom" />
    </main>
  );
}
