import { ADSENSE_CLIENT } from "@/data/ads";

export const dynamic = "force-static";

// 애드센스가 판매 권한을 확인하는 ads.txt. 게시자 ID가 없으면 404.
export function GET() {
  if (!ADSENSE_CLIENT) return new Response("Not Found", { status: 404 });
  const publisherId = ADSENSE_CLIENT.replace(/^ca-/, "");
  return new Response(`google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
