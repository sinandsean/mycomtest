/* eslint-disable @next/next/no-img-element */
// 캐릭터 이미지. 이미지가 아직 없으면 콤 색 + 이모지 카드.
export function KomVisual({
  image,
  color,
  emoji,
  alt,
}: {
  image: string | null;
  color: string;
  emoji: string;
  alt: string;
}) {
  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl"
      style={{ background: color }}
    >
      {image ? (
        <img src={image} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[140px]" aria-label={alt}>
          {emoji}
        </div>
      )}
    </div>
  );
}
