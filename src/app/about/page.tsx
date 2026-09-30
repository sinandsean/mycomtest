import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "소개" };

export default function AboutPage() {
  return (
    <main className="flex-1 pt-10 leading-[1.85]">
      <h1 className="lettering text-center text-4xl">소개</h1>
      <section className="panel mt-6 px-5 py-6">
        <p>
          「{SITE.name}」는 64개의 질문으로 연애 캐릭터 취향을 16가지 &lsquo;콤&rsquo;으로 나눠 보여주는 오락용
          테스트입니다.
        </p>
        <p className="mt-4">
          결과는 재미를 위한 것이며 심리 진단이나 성격 검사가 아닙니다. 답변은 이 기기 안에서만 계산되고, 서버에
          저장되지 않습니다.
        </p>
        {SITE.contactEmail && (
          <p className="mt-4">
            문의: <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
          </p>
        )}
      </section>
    </main>
  );
}
