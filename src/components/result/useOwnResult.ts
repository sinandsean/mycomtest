"use client";

import { useEffect, useState } from "react";
import { loadResult, type SavedResult } from "@/lib/storage";

// 이 결과 페이지가 "내가 방금 받은 결과"인지. 공유 링크로 들어온 사람이면 null.
export function useOwnResult(slug: string) {
  const [state, setState] = useState<{ ready: boolean; own: SavedResult | null }>({
    ready: false,
    own: null,
  });
  useEffect(() => {
    const saved = loadResult();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 브라우저 저장소는 마운트 후에만 읽을 수 있음
    setState({ ready: true, own: saved?.slug === slug ? saved : null });
  }, [slug]);
  return state;
}
