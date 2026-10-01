// 카카오 애드핏 광고단위. 애드핏 심사가 끝나면 대시보드에서 발급한 광고단위 ID(DAN-...)를 unit에 넣는다.
// unit이 비어 있는 자리는 실제 사이트에서 아무것도 그리지 않는다.
// 모바일에서 쓸 수 있는 크기: 320×50, 320×100, 300×250, 250×250.
export type AdUnit = { unit: string; width: number; height: number };

export const AD_UNITS: Record<string, AdUnit> = {
  "home-bottom": { unit: "", width: 320, height: 100 },
  analyzing: { unit: "", width: 320, height: 100 },
  "result-top": { unit: "", width: 320, height: 100 },
  "result-mid": { unit: "", width: 300, height: 250 },
  "result-bottom": { unit: "", width: 320, height: 100 },
  "types-bottom": { unit: "", width: 320, height: 100 },
  "type-bottom": { unit: "", width: 320, height: 100 },
};
