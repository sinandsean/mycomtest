import { existsSync } from "node:fs";
import { join } from "node:path";

// 혜민 이미지가 public/koms/kom-{id}.png 로 들어오면 자동으로 쓰고, 없으면 null (색+이모지 카드로 대체)
export function komImage(id: string): string | null {
  const file = `kom-${id}.png`;
  return existsSync(join(process.cwd(), "public", "koms", file)) ? `/koms/${file}` : null;
}
