import { CHEOLBYEOK } from "@/data/koms";
import { allComboSlugs, comboHeadline, parseCombo } from "@/lib/combos";
import { OG_SIZE, renderOg } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "나의 콤 유형 결과";

export function generateStaticParams() {
  return allComboSlugs().map((combo) => ({ combo }));
}

export default async function Image({ params }: { params: Promise<{ combo: string }> }) {
  const { combo } = await params;
  const c = parseCombo(combo) ?? parseCombo("cheolbyeok")!;
  const look = c.kind === "kom" ? c.main : CHEOLBYEOK;
  return renderOg({
    kicker: "나의 콤 유형은",
    headline: `「${comboHeadline(c)}」`,
    tagline: look.tagline,
  });
}
