import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { SITE } from "@/lib/site";
import "./globals.css";

const jua = localFont({
  src: "../assets/Jua-Regular.ttf",
  variable: "--font-jua",
  display: "swap",
});

const vibes = localFont({
  src: "../assets/GreatVibes-Regular.ttf",
  variable: "--font-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} ~${SITE.subtitle}~`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  openGraph: { siteName: SITE.name, type: "website", locale: "ko_KR" },
};

export const viewport: Viewport = {
  themeColor: "#fffafc",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${jua.variable} ${vibes.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <div className="mx-auto w-full max-w-[480px] flex-1 flex flex-col px-4">{children}</div>
        <footer className="mx-auto w-full max-w-[480px] px-4 py-8 text-xs text-muted flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/types">콤 도감</Link>
          <Link href="/about">소개</Link>
          <Link href="/privacy">개인정보처리방침</Link>
          <span className="w-full">오락용 테스트입니다. 심리 진단이 아닙니다.</span>
        </footer>
      </body>
    </html>
  );
}
