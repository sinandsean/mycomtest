# 인수인계: 나는 무슨 콤일까?

신우(션)에게. 란경이 기획하고 Claude Code가 하루 만에 만든 v1입니다. 기능은 다 돌아가고 테스트·빌드도 통과하지만, **사람이 코드 리뷰를 한 적은 없어요.** 구조가 마음에 안 들면 바꿔도 됩니다. 아래 "확정된 결정"만 지켜주세요.

## 한 줄 요약
64문항으로 16가지 '콤'(연애 캐릭터 취향) 중 핵심 콤 + 보조 콤을 뽑아 「음침한 집착남」 같은 결과를 보여주는 모바일 웹 테스트. 인스타 스토리 공유로 퍼지고 광고로 수익을 냅니다.

## 실행
```bash
npm install
npm run dev      # http://localhost:3000
npm test         # 채점 로직 테스트 (vitest)
npm run build    # 결과 페이지 241개 + 미리보기 이미지 241개를 빌드 때 전부 생성
```
환경변수는 `.env.example` 참고. 전부 선택 사항이라 없어도 돌아갑니다.

## 스택
Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript · PostHog · Vitest. 서버·DB 없이 전부 정적 생성이고, 채점은 브라우저에서 합니다.
> Next 16은 API가 꽤 바뀌었습니다. `AGENTS.md` 안내대로 `node_modules/next/dist/docs/`를 참고하세요.

## 파일 지도
| 뭘 바꾸려면 | 파일 |
|---|---|
| 결과 문구·콤 이름·색·수식어/명사 | `src/data/koms.ts` |
| 어색한 조합 제목 개별 지정 | `src/data/koms.ts`의 `TITLE_OVERRIDES` |
| 문항·응원 멘트 | `src/data/questions.ts` |
| 채점·동점·철벽형·문항 섞기 | `src/lib/scoring.ts` (+ `scoring.test.ts`) |
| 이벤트 | `src/lib/analytics.ts`, 초기화는 `src/instrumentation-client.ts` |
| 광고 | `src/components/AdSlot.tsx` 한 곳 |
| 캐릭터 이미지 | `public/koms/kom-{id}.png`에 넣으면 자동 반영 (`src/lib/images.ts`), 없으면 색+이모지 카드 |
| 인스타 스토리 이미지 (1080×1920, 캔버스) | `src/components/result/ShareButtons.tsx` |
| 링크 미리보기 이미지 (1200×630) | `src/lib/og.tsx` |
| 사이트명·주소 | `src/lib/site.ts` |
| 디자인 토큰 (색·폰트·버튼·패널) | `src/app/globals.css` |

화면: `/` 랜딩 · `/test` 문항 · `/r/[주콤]-[보조콤]` 결과(240개 + `/r/cheolbyeok`) · `/types` 도감 · `/about` · `/privacy`

## 확정된 결정 (바꾸기 전에 란경과 상의)
- **채점:** 답 점수 0~4점, 콤마다 4문항씩(0~16점). 1등이 핵심 콤, 2등이 보조 콤. 문항↔콤 매핑과 수정 이력은 `docs/문항_채점표.md`
- **동점:** 원점수 → "매우 그렇다" 개수 → 희귀도(`RARITY_ORDER`, 마이너한 콤이 이김)
- **철벽형:** 1등 점수 6점 이하
- **결과 제목:** `{주콤 수식어} {보조콤 명사}`. 240개 검수 완료, 어색한 4개만 개별 지정
- **문항 순서:** 사람마다 섞되 같은 콤이 연달아 나오지 않게
- **답 버튼:** 위에서부터 매우 그렇다 → 전혀 아니다
- **"찐따콤" 명칭 유지** (광고 심사 리스크는 알고 감수)
- **김단란/일편단란(란경의 소설 명의)과 완전 별개.** 사이트 어디에도 그 이름을 넣지 않기
- **디자인:** 로맨스 만화책 표지 톤, 캐릭터 없이 분위기만. 동그란 배지(딱지)는 쓰지 않음
- **성적인 표현 금지:** 광고 심사 + 인스타 유입엔 미성년자도 섞임
- **배포:** `main` = 실제 사이트, `dev` = 작업용. `main` 머지는 PR로

## PostHog 이벤트 (요청하신 것)
`NEXT_PUBLIC_POSTHOG_KEY`가 있을 때만 전송합니다. 페이지뷰·페이지이탈은 자동 수집이에요.

| 이벤트 | 언제 | 속성 |
|---|---|---|
| `test_started` | 테스트 진입 | `resumed` |
| `test_progress` | 8문항마다 | `answered` |
| `test_abandoned` | 중간 이탈 (pagehide, sendBeacon) | `answered` |
| `test_completed` | 완료 | `result`, `main`, `sub`, `duration_sec`, `scores`(16콤 점수) |
| `result_viewed` | 결과 페이지 | `result`, `own` (본인 결과 / 공유 링크 방문) |
| `share_clicked` | 공유 버튼 | `result`, `method` |
| `retake_clicked` | 다시 하기 | `result` |
| `try_cta_clicked` | 공유 링크 방문자가 "나도 해보기" | `result` |
| `types_viewed` | 도감 상세 | `kom` |

`test_completed.scores`는 v1.1 보정용입니다. 다정·미남·능력처럼 누구나 "그렇다"를 누르는 콤이 1등을 과점할 것 같아서, 1,000건쯤 쌓이면 콤별 평균·표준편차로 z점수 순위를 매길 계획이에요.

## 남은 일
- [ ] 코드 리뷰 (특히 `TestRunner.tsx` 상태 흐름, `ShareButtons.tsx` 캔버스)
- [ ] PostHog 프로젝트 키 넣기
- [ ] Vercel 연결, `dev` 미리보기를 혜민에게 공유 (미리보기 보호 끄기)
- [ ] 혜민 캐릭터 이미지 16+1장 → `public/koms/` (요청서: `docs/이미지요청서.md`)
- [ ] 결과 문구 최종 검토 (란경)
- [ ] 도메인 구매 → `NEXT_PUBLIC_SITE_URL` 설정 (스토리 이미지 하단·공유 링크에 찍힘)
- [ ] 광고 네트워크 결정 → `AdSlot.tsx` 연결, `/privacy`에 업체 고지 추가
- [ ] 카카오톡 공유 (지금은 Web Share API + 링크 복사만 있음)
- [ ] 쿠키 동의 배너가 필요한지 검토 (지금은 없음)
- [ ] v1.1: 점수 보정, 이탈률 보고 32문항 라이트판 검토

## 알아둘 것
- **폰트:** 포인트 글씨체는 평창평화체 Bold(`src/assets/`, 란경이 받아온 파일). **상업적 이용 라이선스를 한 번 확인해 주세요.** 필기체 영문 Great Vibes는 OFL, 본문 Pretendard는 CDN으로 불러옵니다.
- **본인 결과 판별:** 완료 시 `localStorage`에 결과를 저장하고, 결과 페이지에서 슬러그가 같으면 "본인"으로 봅니다. 본인에게만 16콤 막대가 보이고, 공유 링크로 온 사람에게는 "나도 해보기"가 보여요.
- **진행 저장:** 새로고침해도 이어서 풀 수 있게 `localStorage`에 저장합니다. 사생활 보호 모드면 조용히 저장을 건너뜁니다.
- **광고 자리:** 개발 모드에서만 점선 박스로 보이고, 실제 사이트에선 아무것도 안 그립니다.
- **기획 문서:** `docs/PRD.md`, `docs/문항_채점표.md`, `docs/이미지요청서.md`
