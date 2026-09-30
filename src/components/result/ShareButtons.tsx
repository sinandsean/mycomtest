"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { SITE } from "@/lib/site";

type StoryData = {
  slug: string;
  headline: string; // 조합 제목
  tagline: string;
  color: string;
  emoji: string;
  image: string | null;
};

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// 인스타 스토리용 1080×1920 이미지
async function drawStory(d: StoryData): Promise<Blob> {
  const W = 1080;
  const H = 1920;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  const css = getComputedStyle(document.documentElement);
  const display = css.getPropertyValue("--font-point").trim() || "sans-serif";
  const script = css.getPropertyValue("--font-vibes").trim() || "cursive";
  const body = '"Pretendard Variable", Pretendard, sans-serif';
  await Promise.all([
    document.fonts.load(`100px ${display}`, d.headline),
    document.fonts.load(`700 40px ${body}`, d.tagline),
    document.fonts.load(`44px ${script}`, "Your secret type is out"),
  ]).catch(() => {});

  const ACCENT = "#ec3d6b";
  const INK = "#2b2440";
  const SKY = "#9fcbea";

  // 종이 + 스크린톤 점
  ctx.fillStyle = "#fffafc";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "rgba(236,61,107,0.14)";
  for (let y = 0; y < H; y += 22)
    for (let x = (y / 22) % 2 ? 11 : 0; x < W; x += 22) {
      const edge = Math.min(x, W - x, y, H - y);
      if (edge > 170) continue;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

  ctx.textAlign = "center";
  const lettering = (text: string, x: number, y: number, size: number) => {
    ctx.font = `${size}px ${display}`;
    ctx.lineJoin = "round";
    ctx.lineWidth = size * 0.16;
    ctx.strokeStyle = "#ffffff";
    ctx.strokeText(text, x, y);
    ctx.fillStyle = ACCENT;
    ctx.fillText(text, x, y);
  };

  lettering(SITE.name, W / 2, 200, 84);
  ctx.fillStyle = SKY;
  ctx.font = `44px ${script}`;
  ctx.fillText("Your secret type is out", W / 2, 270);

  // 만화 칸 (4:5)
  const cw = 720;
  const ch = 900;
  const cx = (W - cw) / 2;
  const cy = 330;
  ctx.fillStyle = "#f7a1bd";
  ctx.beginPath();
  ctx.roundRect(cx + 14, cy + 14, cw, ch, 12);
  ctx.fill();
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(cx, cy, cw, ch, 12);
  ctx.fillStyle = d.color;
  ctx.fill();
  ctx.clip();
  if (d.image) {
    try {
      const img = await loadImage(d.image);
      ctx.drawImage(img, cx, cy, cw, ch);
    } catch {}
  } else {
    ctx.font = `340px ${body}`;
    ctx.textBaseline = "middle";
    ctx.fillText(d.emoji, W / 2, cy + ch / 2);
    ctx.textBaseline = "alphabetic";
  }
  ctx.restore();
  ctx.lineWidth = 5;
  ctx.strokeStyle = INK;
  ctx.beginPath();
  ctx.roundRect(cx, cy, cw, ch, 12);
  ctx.stroke();

  ctx.fillStyle = INK;
  ctx.font = `700 42px ${body}`;
  ctx.fillText("나의 콤 유형은", W / 2, 1340);

  ctx.font = `124px ${display}`;
  const titleLines = wrap(ctx, `「${d.headline}」`, 960);
  titleLines.forEach((l, i) => lettering(l, W / 2, 1480 + i * 134, 124));

  ctx.fillStyle = INK;
  ctx.font = `600 40px ${body}`;
  const tagY = 1480 + titleLines.length * 134 + 10;
  wrap(ctx, d.tagline, 880).forEach((l, i) => ctx.fillText(l, W / 2, tagY + i * 56));

  ctx.fillStyle = ACCENT;
  ctx.font = `600 34px ${body}`;
  ctx.fillText(`♡ ${SITE.url.replace(/^https?:\/\//, "")}`, W / 2, H - 80);

  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/png"),
  );
}

export function ShareButtons(props: StoryData) {
  const [toast, setToast] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const url = `${SITE.url}/r/${props.slug}`;

  function flash(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  }

  async function saveStory() {
    if (busy) return;
    setBusy(true);
    track("share_clicked", { result: props.slug, method: "story_image" });
    try {
      const blob = await drawStory(props);
      const file = new File([blob], `kom-${props.slug}.png`, { type: "image/png" });
      // 모바일: 공유 시트 → 인스타 스토리로 바로. 안 되면 다운로드
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file] }).catch(() => {});
      } else {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = file.name;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
        flash("이미지를 저장했어요");
      }
    } catch {
      flash("이미지를 만들지 못했어요");
    } finally {
      setBusy(false);
    }
  }

  async function copyLink() {
    track("share_clicked", { result: props.slug, method: "link_copy" });
    try {
      await navigator.clipboard.writeText(url);
      flash("링크를 복사했어요");
    } catch {
      window.prompt("이 링크를 복사하세요", url);
    }
  }

  async function nativeShare() {
    track("share_clicked", { result: props.slug, method: "native_share" });
    const text = `나의 콤 유형은 「${props.headline}」 너는 무슨 콤이야?`;
    if (navigator.share) {
      await navigator.share({ title: SITE.name, text, url }).catch(() => {});
    } else {
      copyLink();
    }
  }

  return (
    <div className="relative">
      <button
        onClick={saveStory}
        disabled={busy}
        className="btn-rose w-full py-4 disabled:opacity-60"
      >
        {busy ? "만드는 중…" : "📸 인스타 스토리용 이미지 저장"}
      </button>
      <div className="mt-2.5 grid grid-cols-2 gap-2.5">
        <button onClick={nativeShare} className="btn-line py-3.5">
          친구한테 보내기
        </button>
        <button onClick={copyLink} className="btn-line py-3.5">
          링크 복사
        </button>
      </div>
      {toast && (
        <div className="animate-pop fixed bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full bg-accent px-5 py-2.5 text-sm text-white">
          {toast}
        </div>
      )}
    </div>
  );
}
