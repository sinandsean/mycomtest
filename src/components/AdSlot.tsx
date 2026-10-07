"use client";

import { useEffect, useRef, useState } from "react";
import { ADSENSE_CLIENT, AD_UNITS } from "@/data/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

// 구글 애드센스 광고 자리. 광고단위는 src/data/ads.ts에서 관리한다.
// 게시자 ID나 슬롯 ID가 없으면 개발 중에는 자리 표시만, 실제 사이트에서는 아무것도 안 보인다.
// 광고가 늦게 떠도 화면이 밀리지 않게 크기를 고정하고, 화면 가까이 왔을 때만 광고를 요청한다.
export function AdSlot({ id }: { id: string }) {
  const ad = AD_UNITS[id];
  const enabled = Boolean(ADSENSE_CLIENT && ad?.slot);
  const boxRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box || !enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(box);
    return () => observer.disconnect();
  }, [enabled]);

  // SPA라 페이지를 옮기면 이 컴포넌트가 새로 그려지고 새 <ins>가 생긴다. 그 <ins>마다 한 번씩 광고를 요청한다.
  useEffect(() => {
    const box = boxRef.current;
    if (!near || !box || !enabled) return;
    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "inline-block";
    ins.style.width = `${ad.width}px`;
    ins.style.height = `${ad.height}px`;
    ins.setAttribute("data-ad-client", ADSENSE_CLIENT);
    ins.setAttribute("data-ad-slot", ad.slot);
    box.append(ins);
    (window.adsbygoogle = window.adsbygoogle ?? []).push({});
    return () => box.replaceChildren();
  }, [near, enabled, ad]);

  if (!enabled) {
    if (process.env.NODE_ENV !== "development") return null;
    return (
      <div
        data-ad-slot={id}
        className="my-6 flex h-[100px] items-center justify-center rounded-xl border border-dashed border-line text-xs text-muted"
      >
        광고 자리 · {id}
      </div>
    );
  }

  return (
    <aside aria-label="광고" className="my-6 flex flex-col items-center">
      <span className="mb-1 text-[11px] text-muted">광고</span>
      <div ref={boxRef} style={{ width: ad.width, height: ad.height }} className="overflow-hidden" />
    </aside>
  );
}
