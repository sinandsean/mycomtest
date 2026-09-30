import type { Analysis } from "@/data/analysis";

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-7 font-display text-lg text-accent first:mt-0">
      <span className="sparkle mr-1 text-sm">✦</span>
      {children}
    </h3>
  );
}

// "이 취향이 말해주는 당신"
export function AnalysisSection({ a }: { a: Analysis }) {
  return (
    <section className="mt-8">
      <h2 className="lettering text-center text-3xl leading-snug">
        이 취향이
        <br />
        말해주는 당신
      </h2>
      <p className="font-script text-center text-xl text-sky">All about you</p>

      <div className="panel mt-4 px-5 py-6 leading-[1.85]">
        <Heading>당신이 진짜 원하는 것</Heading>
        {a.want.map((p, i) => (
          <p key={i} className="mt-2">
            {p}
          </p>
        ))}

        <Heading>연애할 때 당신은</Heading>
        <ul className="mt-2 flex flex-col gap-1.5">
          {a.inLove.map((t) => (
            <li key={t} className="flex gap-2">
              <span className="shrink-0 text-accent">♡</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>

        <Heading>흑역사 예고</Heading>
        <ul className="mt-2 flex flex-col gap-1.5">
          {a.blackHistory.map((t) => (
            <li key={t} className="flex gap-2">
              <span className="shrink-0">🙈</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>

        <Heading>당신에게 필요한 사람</Heading>
        <p className="mt-2">{a.need}</p>

        <div className="mt-7 rounded-lg bg-blush px-4 py-5 text-center">
          <p className="text-xs font-semibold tracking-widest text-muted">한 줄 정리</p>
          <p className="mt-2 font-display text-xl leading-snug text-accent">{a.oneLine}</p>
        </div>
      </div>
    </section>
  );
}
