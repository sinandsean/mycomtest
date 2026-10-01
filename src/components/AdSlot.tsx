"use client";

import { useEffect, useRef, useState } from "react";
import { AD_UNITS } from "@/data/ads";

const ADFIT_SDK = "https://t1.kakaocdn.net/kas/static/ba.min.js";

// 카카오 애드핏 광고 자리. 광고단위 ID는 src/data/ads.ts에서 관리한다.
// ID가 없으면 개발 중에는 자리 표시만, 실제 사이트에서는 아무것도 안 보인다.
// 광고가 늦게 떠도 화면이 밀리지 않게 높이를 미리 잡고, 화면 가까이 왔을 때만 불러온다.
export function AdSlot({ id }: { id: string }) {
  const ad = AD_UNITS[id];
  const boxRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box || !ad?.unit) return;
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
  }, [ad?.unit]);

  // SPA라 페이지를 옮길 때마다 <ins>와 SDK를 새로 넣는다. SDK는 로드될 때 아직 안 채운 kakao_ad_area를 찾아 채운다.
  useEffect(() => {
    const box = boxRef.current;
    if (!near || !box || !ad?.unit) return;
    const ins = document.createElement("ins");
    ins.className = "kakao_ad_area";
    ins.style.display = "none";
    ins.setAttribute("data-ad-unit", ad.unit);
    ins.setAttribute("data-ad-width", String(ad.width));
    ins.setAttribute("data-ad-height", String(ad.height));
    const script = document.createElement("script");
    script.async = true;
    script.charset = "utf-8";
    script.src = ADFIT_SDK;
    box.append(ins, script);
    return () => box.replaceChildren();
  }, [near, ad]);

  if (!ad?.unit) {
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
