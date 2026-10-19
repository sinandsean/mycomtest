import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개",
  description: "나는 무슨 콤일까? 테스트를 만든 이유와 채점 방식, 결과를 읽는 법.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 pt-10 leading-[1.85]">
      <h1 className="lettering text-center text-4xl">소개</h1>
      <section className="panel mt-6 px-5 py-6">
        <p>
          「{SITE.name}」는 64개의 질문으로 연애 캐릭터 취향을 16가지 &lsquo;콤&rsquo;으로 나눠 보여주는 오락용
          테스트입니다.
        </p>

        <h2 className="mt-6 font-display text-xl text-accent">왜 만들었나요</h2>
        <p className="mt-2">
          친구들과 드라마나 애니 이야기를 하다 보면 &ldquo;너는 꼭 그런 캐릭터만 좋아하더라&rdquo;는 말이 나옵니다.
          본인은 몰랐는데 좋아했던 캐릭터를 늘어놓고 보면 나이, 성격, 분위기 어딘가에 공통점이 있습니다. 이 테스트는 그
          공통점에 이름을 붙여 보자는 생각에서 시작했습니다.
        </p>
        <p className="mt-3">
          콤은 콤플렉스에서 온 말이지만 여기서는 부끄러운 결점이라는 뜻이 아닙니다. 남에게 굳이 말하지 않았을 뿐인
          취향을 가볍게 꺼내 보는 놀이로 봐 주세요.
        </p>

        <h2 className="mt-6 font-display text-xl text-accent">어떻게 채점하나요</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>16가지 콤마다 그 취향을 묻는 문장이 4개씩 있어 모두 64문항입니다.</li>
          <li>
            &lsquo;전혀 아니다&rsquo;는 0점, &lsquo;매우 그렇다&rsquo;는 4점으로 계산해 콤마다 0~16점이 나옵니다.
          </li>
          <li>
            가장 높은 콤이 핵심 콤, 두 번째가 보조 콤입니다. 점수가 같으면 &lsquo;매우 그렇다&rsquo;를 더 많이 고른 콤을
            앞에 둡니다.
          </li>
          <li>핵심 콤 점수가 6점 이하, 즉 문장 평균이 &lsquo;아니다&rsquo;와 &lsquo;보통이다&rsquo; 사이면 철벽형입니다.</li>
        </ul>

        <h2 className="mt-6 font-display text-xl text-accent">결과는 이렇게 읽어 주세요</h2>
        <p className="mt-2">
          결과 이름은 핵심 콤의 수식어와 보조 콤의 명사를 붙여 만듭니다. 예를 들어 음침콤이 핵심이고 집착콤이 보조면
          &lsquo;음침한 집착남&rsquo;이 됩니다. 16가지 콤이 서로 짝을 이뤄 240가지 조합이 나오고, 여기에 철벽형이 더해집니다.
        </p>
        <p className="mt-3">
          결과 페이지에는 핵심 콤 설명, 보조 콤이 섞였을 때의 특징, 비슷한 취향의 애니 캐릭터, 그리고 &lsquo;이 취향이
          말해주는 당신&rsquo; 분석이 나옵니다. 각 콤의 자세한 설명은{" "}
          <Link href="/types" className="underline underline-offset-4">
            콤 도감
          </Link>
          에서 볼 수 있습니다.
        </p>

        <h2 className="mt-6 font-display text-xl text-accent">꼭 알아 주세요</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>재미를 위한 테스트이며 심리 진단이나 성격 검사가 아닙니다.</li>
          <li>답변은 이 기기 안에서만 계산되고 서버에 저장되지 않습니다.</li>
          <li>
            집착, 광기 같은 취향은 픽션 안에서만 즐겨 주세요. 현실 연애에서 집착과 통제는 사랑이 아니라 위험 신호입니다.
          </li>
          <li>소개하는 캐릭터의 이름과 작품명은 취향을 설명하기 위한 예시이며, 각 권리는 원작자에게 있습니다.</li>
        </ul>

        {SITE.contactEmail && (
          <p className="mt-6">
            문의: <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
          </p>
        )}
      </section>
    </main>
  );
}
