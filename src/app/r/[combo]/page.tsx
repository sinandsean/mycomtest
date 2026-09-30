import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CHEOLBYEOK, KOM_BY_ID } from "@/data/koms";
import { allComboSlugs, comboHeadline, parseCombo } from "@/lib/combos";
import { komImage } from "@/lib/images";
import { ANALYSIS } from "@/data/analysis";
import { CHARACTERS } from "@/data/characters";
import { CharacterList } from "@/components/CharacterList";
import { AdSlot } from "@/components/AdSlot";
import { AnalysisSection } from "@/components/AnalysisSection";
import { Flourish } from "@/components/Flourish";
import { KomVisual } from "@/components/KomVisual";
import { RetakeLink, ScoreProfile, VisitorCta } from "@/components/result/ResultIslands";
import { ShareButtons } from "@/components/result/ShareButtons";

export const dynamicParams = false;

export function generateStaticParams() {
  return allComboSlugs().map((combo) => ({ combo }));
}

export async function generateMetadata({ params }: PageProps<"/r/[combo]">): Promise<Metadata> {
  const { combo } = await params;
  const c = parseCombo(combo);
  if (!c) return {};
  const headline = comboHeadline(c);
  const tagline = c.kind === "kom" ? c.main.tagline : CHEOLBYEOK.tagline;
  return {
    title: `나의 콤 유형은 「${headline}」`,
    description: `${tagline}. 너는 무슨 콤이야?`,
    openGraph: { title: `나의 콤 유형은 「${headline}」`, description: tagline },
  };
}

export default async function ResultPage({ params }: PageProps<"/r/[combo]">) {
  const { combo } = await params;
  const c = parseCombo(combo);
  if (!c) notFound();

  const main = c.kind === "kom" ? c.main : null;
  const sub = c.kind === "kom" ? c.sub : null;
  const headline = comboHeadline(c);
  const look = main ?? CHEOLBYEOK;
  const image = komImage(look.id);
  const body = main ? main.body : CHEOLBYEOK.body;
  const warning = Boolean(main?.warning || sub?.warning);

  return (
    <main className="flex flex-1 flex-col pt-6 pb-4">
      <VisitorCta slug={c.slug} />

      <p className="text-center text-[11px] font-semibold tracking-[0.2em] text-muted">나의 콤 유형은</p>

      {/* 표지 */}
      <div className="relative mt-3">
        <div className="panel overflow-hidden p-2">
          <KomVisual image={image} color={look.color} emoji={look.emoji} alt={look.name} />
        </div>
      </div>

      <h1 className="lettering mt-6 text-center text-[44px] leading-tight">
        <span className="sparkle mr-1 align-top text-2xl">✦</span>「{headline}」
      </h1>
      <p className="font-script mt-1 text-center text-2xl text-sky">Your secret type is out</p>
      <p className="mt-3 text-center text-base font-bold">{look.tagline}</p>

      {main && sub && (
        <div className="mt-4 flex justify-center gap-2 text-sm">
          <Link href={`/types/${main.id}`} className="rounded-full px-3 py-1 text-white" style={{ background: main.color }}>
            핵심 콤 · {main.name}
          </Link>
          <Link href={`/types/${sub.id}`} className="rounded-full border-2 px-3 py-1" style={{ borderColor: sub.color }}>
            보조 콤 · {sub.name}
          </Link>
        </div>
      )}

      {/* 공유는 결과 보자마자 누를 수 있게 위에 */}
      <div className="mt-6">
        <ShareButtons
          slug={c.slug}
          headline={headline}
          tagline={look.tagline}
          color={look.color}
          emoji={look.emoji}
          image={image}
        />
      </div>

      <AdSlot id="result-top" />

      <section className="panel px-5 py-6 leading-[1.85]">
        {body.map((para, i) => (
          <p key={i} className={i ? "mt-4" : ""}>
            {para}
          </p>
        ))}
        {sub && (
          <p className="mt-5 rounded-lg bg-blush px-4 py-3 text-[15px]">
            <strong className="text-accent">+ {sub.name}</strong>
            <br />
            {sub.sub}
          </p>
        )}
        {warning && (
          <p className="mt-4 text-xs text-muted">※ 현실 연애에선 이건 위험 신호입니다. 픽션에서만 즐기세요.</p>
        )}
      </section>

      {main && sub && (
        <CharacterList
          main={CHARACTERS[main.id].slice(0, 3)}
          extra={CHARACTERS[sub.id][0]}
          extraLabel={`+ ${sub.name}`}
        />
      )}

      <AnalysisSection a={ANALYSIS[look.id]} />

      <AdSlot id="result-mid" />

      <ScoreProfile slug={c.slug} />

      {main && (
        <section className="mt-10 grid grid-cols-2 gap-3 text-center">
          {[
            { label: "취향 친구", sub: "같이 덕질하기 좋은 콤", k: KOM_BY_ID[main.friend] },
            { label: "취향 원수", sub: "절대 이해 못 하는 콤", k: KOM_BY_ID[main.enemy] },
          ].map(({ label, sub: desc, k }) => (
            <Link key={label} href={`/types/${k.id}`} className="panel px-3 py-4">
              <p className="font-display text-accent">{label}</p>
              <p className="mt-2 text-3xl">{k.emoji}</p>
              <p className="mt-1 font-bold">{k.name}</p>
              <p className="mt-1 text-xs text-muted">{desc}</p>
            </Link>
          ))}
        </section>
      )}

      <Flourish className="mt-10" />

      <p className="mt-6 text-center font-display text-lg text-accent">다 읽었다면, 친구도 털어볼 차례</p>
      <div className="mt-3">
        <ShareButtons
          slug={c.slug}
          headline={headline}
          tagline={look.tagline}
          color={look.color}
          emoji={look.emoji}
          image={image}
        />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        <RetakeLink slug={c.slug} />
        <Link href="/types" className="btn-line py-3.5">
          콤 도감 보기
        </Link>
      </div>

      <AdSlot id="result-bottom" />
    </main>
  );
}
