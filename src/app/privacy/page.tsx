import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "개인정보처리방침" };

// 초안. 광고 네트워크가 정해지면 해당 업체 고지 문구를 추가해야 한다.
export default function PrivacyPage() {
  return (
    <main className="flex-1 pt-10 text-[15px] leading-[1.85]">
      <h1 className="lettering text-center text-4xl">개인정보처리방침</h1>
      <section className="panel mt-6 flex flex-col gap-4 px-5 py-6">
        <p>「{SITE.name}」(이하 &lsquo;사이트&rsquo;)는 이용자의 개인정보를 중요하게 생각합니다.</p>
        <div>
          <h2 className="font-bold">1. 수집하는 정보</h2>
          <p>
            사이트는 이름, 연락처 등 개인을 식별할 수 있는 정보를 수집하지 않습니다. 테스트 답변은 이용자의 기기(브라우저
            저장소)에서만 처리되며 서버에 저장되지 않습니다.
          </p>
        </div>
        <div>
          <h2 className="font-bold">2. 이용 통계</h2>
          <p>
            서비스 개선을 위해 PostHog를 사용해 방문 페이지, 테스트 진행·완료 여부, 결과 유형, 공유 버튼 사용 여부 등
            익명 이용 기록을 수집합니다. 이 과정에서 쿠키 또는 유사 기술이 사용될 수 있습니다.
          </p>
        </div>
        <div>
          <h2 className="font-bold">3. 광고</h2>
          <p>
            사이트에는 제3자 광고가 게재될 수 있으며, 광고 사업자는 쿠키를 사용해 이용자의 방문 기록에 기반한 광고를
            제공할 수 있습니다. 이용자는 브라우저 설정에서 쿠키를 거부할 수 있습니다.
          </p>
        </div>
        <div>
          <h2 className="font-bold">4. 문의</h2>
          <p>{SITE.contactEmail ? SITE.contactEmail : "사이트 소개 페이지의 연락처로 문의해 주세요."}</p>
        </div>
        <p className="text-xs text-muted">시행일: 2026년 10월</p>
      </section>
    </main>
  );
}
