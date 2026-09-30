import { CHEOLBYEOK, KOMS, KOM_BY_ID, comboTitle, type Kom, type KomId } from "@/data/koms";

export type ParsedCombo =
  | { kind: "kom"; main: Kom; sub: Kom; title: string; slug: string }
  | { kind: "cheolbyeok"; slug: "cheolbyeok" };

export function parseCombo(slug: string): ParsedCombo | null {
  if (slug === "cheolbyeok") return { kind: "cheolbyeok", slug };
  const [a, b, ...rest] = slug.split("-");
  if (rest.length || !(a in KOM_BY_ID) || !(b in KOM_BY_ID) || a === b) return null;
  const main = KOM_BY_ID[a as KomId];
  const sub = KOM_BY_ID[b as KomId];
  return { kind: "kom", main, sub, title: comboTitle(main.id, sub.id), slug };
}

// 240조합 + 철벽형
export function allComboSlugs(): string[] {
  const out = ["cheolbyeok"];
  for (const a of KOMS) for (const b of KOMS) if (a.id !== b.id) out.push(`${a.id}-${b.id}`);
  return out;
}

export function comboHeadline(c: ParsedCombo) {
  return c.kind === "kom" ? c.title : CHEOLBYEOK.title;
}
