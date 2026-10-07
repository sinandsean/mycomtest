// 구글 애드센스 광고단위. 애드센스 심사가 끝나면 [광고 > 광고 단위 기준]에서 디스플레이 광고 단위를 만들어
// 발급된 슬롯 ID(숫자 10자리)를 slot에 넣는다. slot이 비어 있는 자리는 실제 사이트에서 아무것도 그리지 않는다.
// 게시자 ID(ca-pub-...)는 Vercel 환경변수 NEXT_PUBLIC_ADSENSE_CLIENT에 넣는다.
// 화면이 밀리지 않게 자리마다 크기를 고정한다. 모바일 기준 320×100, 300×250을 쓴다.
export type AdUnit = { slot: string; width: number; height: number };

export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";

export const AD_UNITS: Record<string, AdUnit> = {
  "home-bottom": { slot: "3113955285", width: 320, height: 100 },
  analyzing: { slot: "7283019178", width: 320, height: 100 },
  "result-top": { slot: "5014194460", width: 320, height: 100 },
  "result-mid": { slot: "5740118622", width: 300, height: 250 },
  "result-bottom": { slot: "1074949452", width: 320, height: 100 },
  "types-bottom": { slot: "8174710276", width: 320, height: 100 },
  "type-bottom": { slot: "6861628607", width: 320, height: 100 },
};
