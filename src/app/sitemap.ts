import type { MetadataRoute } from "next";
import { KOMS } from "@/data/koms";
import { SITE } from "@/lib/site";

// 검색에 올릴 페이지. 결과 조합(/r/*)은 noindex라 넣지 않는다.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/types", ...KOMS.map((k) => `/types/${k.id}`), "/about", "/privacy"];
  return paths.map((path) => ({ url: `${SITE.url}${path}` }));
}
