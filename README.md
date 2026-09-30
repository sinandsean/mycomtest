# 나는 무슨 콤일까?

64문항 콤 취향 테스트. 기획 문서는 `docs/`.

## 자주 고칠 곳
- 결과 문구·콤 이름·색: `src/data/koms.ts`
- 문항: `src/data/questions.ts` (채점 원칙은 `docs/문항_채점표.md`)
- 캐릭터 이미지: `public/koms/kom-{id}.png` 로 넣으면 자동 반영 (없으면 이모지 카드)
- 광고: `src/components/AdSlot.tsx` 한 곳
- 이벤트: `src/lib/analytics.ts`

## 명령
- `npm run dev` 로컬 실행
- `npm test` 채점 테스트
- `npm run build` 배포용 빌드

환경변수는 `.env.example` 참고.
