// 광고 자리. 네트워크(애드센스/애드핏 등)가 정해지면 이 파일 한 곳만 바꾸면 된다.
// 개발 중에는 자리 표시만, 실제 사이트에서는 아무것도 안 보인다.
export function AdSlot({ id }: { id: string }) {
  if (process.env.NODE_ENV !== "development") return null;
  return (
    <div
      data-ad-slot={id}
      className="my-6 flex h-[100px] items-center justify-center rounded-xl border border-dashed border-line text-xs text-muted"
    >
      광고 자리 · {id}
    </div>
  );
}
