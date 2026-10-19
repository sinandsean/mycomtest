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

      <section className="panel mt-10 px-5 py-6 leading-[1.85]">
        <h2 className="font-display text-xl text-accent">콤이 뭔가요?</h2>
        <p className="mt-2">
          &lsquo;콤&rsquo;은 콤플렉스에서 온 말로, 남들에게 굳이 말하지 않는 캐릭터 취향을 가리킵니다. 나이 많은 어른
          남자에게 끌리면 오지콤, 나에게만 다정한 무뚝뚝한 남자에게 약하면 츤데레콤이라고 부르는 식입니다.
        </p>
        <p className="mt-3">
          이 테스트는 드라마, 애니, 웹툰을 보면서 유독 마음이 가는 캐릭터에 공통점이 있다는 데서 출발했습니다. 현실의
          연애 상대가 아니라 픽션 속 캐릭터를 떠올리며 답해도 됩니다.
        </p>
      </section>

      <section className="panel mt-6 px-5 py-6 leading-[1.85]">
        <h2 className="font-display text-xl text-accent">테스트는 이렇게 진행돼요</h2>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5">
          <li>64개 문장을 하나씩 읽고 &lsquo;매우 그렇다&rsquo;부터 &lsquo;전혀 아니다&rsquo;까지 고릅니다.</li>
          <li>문장은 16가지 콤에 4개씩 나뉘어 있고, 같은 콤 문장이 연달아 나오지 않게 섞여 나옵니다.</li>
          <li>점수가 가장 높은 콤이 핵심 콤, 두 번째 콤이 보조 콤이 되어 &lsquo;음침한 집착남&rsquo; 같은 결과 이름이 만들어집니다.</li>
          <li>어느 콤에도 마음이 크게 움직이지 않았다면 철벽형이 나옵니다.</li>
        </ol>
      </section>

      <section className="panel mt-6 px-5 py-6">
        <h2 className="font-display text-xl text-accent">16가지 콤</h2>
        <ul className="mt-3 flex flex-col">
          {KOMS.map((k) => (
            <li key={k.id} className="border-b border-dashed border-line py-2.5 last:border-0">
              <Link href={`/types/${k.id}`} className="flex flex-col gap-0.5">
                <span className="font-bold">
                  {k.emoji} {k.name}
                  <span className="ml-2 text-xs font-normal text-muted">{k.keywords}</span>
                </span>
                <span className="text-sm leading-relaxed">{k.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel mt-6 px-5 py-6 leading-[1.85]">
        <h2 className="font-display text-xl text-accent">자주 묻는 질문</h2>
        <h3 className="mt-3 font-bold">심리 검사인가요?</h3>
        <p>
          아닙니다. 재미로 보는 취향 테스트입니다. 결과가 성격이나 연애 능력을 말해주지는 않습니다.
        </p>
        <h3 className="mt-3 font-bold">답변이 어딘가에 저장되나요?</h3>
        <p>
          답변은 지금 쓰는 기기 안에서만 계산되고 서버로 보내지 않습니다. 중간에 창을 닫아도 같은 기기에서는 이어서 할
          수 있습니다.
        </p>
        <h3 className="mt-3 font-bold">할 때마다 결과가 바뀌어요.</h3>
        <p>
          보통이다 근처에서 고민한 문장이 많으면 순위가 쉽게 바뀝니다. 끌리는 쪽으로 조금 더 솔직하게 고르면 결과가
          선명해집니다.
        </p>
        <h3 className="mt-3 font-bold">집착콤, 광기콤이 나왔는데 괜찮을까요?</h3>
        <p>
          픽션 속 취향일 뿐입니다. 다만 현실 연애에서 집착이나 통제는 사랑이 아니라 위험 신호라는 점은 기억해 주세요.
        </p>
      </section>

      <AdSlot id="home-bottom" />
    </main>
  );
}
