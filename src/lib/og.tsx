import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };

const fonts = Promise.all([
  readFile(join(process.cwd(), "src/assets/PyeongChangPeace-Bold.ttf")),
  readFile(join(process.cwd(), "src/assets/GreatVibes-Regular.ttf")),
]);

// 링크 미리보기 이미지 (카톡·인스타 DM 등). 만화책 표지 톤.
export async function renderOg(opts: { kicker: string; headline: string; tagline: string }) {
  const [point, vibes] = await fonts;
  const stroke = (w: number) => {
    const s: string[] = [];
    for (let a = 0; a < 360; a += 30) {
      const r = (a * Math.PI) / 180;
      s.push(`${(Math.cos(r) * w).toFixed(1)}px ${(Math.sin(r) * w).toFixed(1)}px 0 #fff`);
    }
    return s.join(",");
  };
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#fffafc",
          backgroundImage: "radial-gradient(circle, rgba(236,61,107,0.18) 3px, transparent 3.5px)",
          backgroundSize: "24px 24px",
          fontFamily: "Point",
          padding: 40,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#fffafc",
            border: "5px solid #2b2440",
            borderRadius: 16,
            boxShadow: "14px 14px 0 #f7a1bd",
            position: "relative",
          }}
        >
          <div style={{ fontSize: 40, color: "#2b2440" }}>{opts.kicker}</div>
          <div style={{ fontSize: 104, color: "#ec3d6b", textShadow: stroke(7), marginTop: 10, lineHeight: 1.1 }}>
            {opts.headline}
          </div>
          <div style={{ fontFamily: "Great Vibes", fontSize: 48, color: "#9fcbea", marginTop: 6 }}>
            Your secret type is out
          </div>
          <div style={{ fontSize: 36, color: "#2b2440", marginTop: 18 }}>{opts.tagline}</div>
          <div style={{ position: "absolute", bottom: 26, fontSize: 30, color: "#ec3d6b" }}>
            {SITE.name}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Point", data: point, style: "normal", weight: 400 },
        { name: "Great Vibes", data: vibes, style: "normal", weight: 400 },
      ],
    },
  );
}
