"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function TypesViewTracker({ kom }: { kom: string }) {
  useEffect(() => {
    track("types_viewed", { kom });
  }, [kom]);
  return null;
}
