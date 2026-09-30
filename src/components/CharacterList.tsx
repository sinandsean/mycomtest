import type { Character } from "@/data/characters";

function Row({ c, badge }: { c: Character; badge?: string }) {
  return (
    <li className="flex flex-col gap-1 border-b border-dashed border-line py-3 last:border-0">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="font-display text-lg">{c.name}</span>
        <span className="text-xs text-muted">{c.work}</span>
        {badge && <span className="rounded-full border border-accent px-2 py-0.5 text-[10px] text-accent">{badge}</span>}
      </div>
      <p className="text-[15px] leading-relaxed">{c.note}</p>
    </li>
  );
}

// "이 콤의 대표 남자들"
export function CharacterList({
  main,
  extra,
  extraLabel,
}: {
  main: Character[];
  extra?: Character;
  extraLabel?: string;
}) {
  return (
    <section className="mt-8">
      <h2 className="lettering text-center text-3xl">당신의 최애 후보</h2>
      <p className="font-script text-center text-xl text-sky">Your type, on screen</p>
      <ul className="panel mt-4 px-5 py-2">
        {main.map((c) => (
          <Row key={c.name + c.work} c={c} />
        ))}
        {extra && <Row c={extra} badge={extraLabel} />}
      </ul>
      <p className="mt-2 text-center text-xs text-muted">모든 캐릭터는 각 작품 속 인물이며, 취향 설명을 위한 예시입니다.</p>
    </section>
  );
}
