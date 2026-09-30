import { OG_SIZE, renderOg } from "@/lib/og";
import { SITE } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = SITE.name;

export default async function Image() {
  return renderOg({
    kicker: `~${SITE.subtitle}~`,
    headline: SITE.name,
    tagline: "당신이 절대 인정하고 싶지 않았던 취향은?",
  });
}
