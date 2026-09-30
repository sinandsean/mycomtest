import posthog from "posthog-js";

// PostHog 이벤트 목록. 이름을 바꾸면 PostHog 대시보드도 같이 바꿔야 한다.
export type EventMap = {
  test_started: { resumed: boolean };
  test_progress: { answered: number }; // 8문항마다
  test_abandoned: { answered: number }; // 중간에 페이지를 떠남
  test_completed: {
    result: string; // 예: eumchim-jipchak, cheolbyeok
    main: string | null;
    sub: string | null;
    duration_sec: number;
    // 콤별 점수 (0~16). 보편 취향 쏠림 보정(v1.1)에 쓴다
    scores: Record<string, number>;
  };
  result_viewed: { result: string; own: boolean };
  share_clicked: { result: string; method: "story_image" | "link_copy" | "native_share" };
  retake_clicked: { result: string };
  try_cta_clicked: { result: string }; // 공유 링크로 들어온 사람이 "나도 해보기"
  types_viewed: { kom: string | null };
};

// beacon: 페이지를 떠나는 순간에도 전송되게 (test_abandoned)
export function track<E extends keyof EventMap>(event: E, props: EventMap[E], beacon = false) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    if (process.env.NODE_ENV === "development") console.debug("[track]", event, props);
    return;
  }
  try {
    posthog.capture(event, props, beacon ? { transport: "sendBeacon" } : undefined);
  } catch {}
}
