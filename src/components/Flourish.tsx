// 표지 장식 줄: 하늘색 꽃 + 반짝이 (만화책 표지의 꽃 레이스 느낌)
export function Flourish({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 text-sky ${className}`} aria-hidden>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-sky" />
      <span className="text-lg">✿</span>
      <span className="sparkle pink text-sm">✦</span>
      <span className="text-2xl">❀</span>
      <span className="sparkle pink text-sm">✦</span>
      <span className="text-lg">✿</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-sky" />
    </div>
  );
}
