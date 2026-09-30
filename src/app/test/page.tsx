import type { Metadata } from "next";
import { TestRunner } from "./TestRunner";

export const metadata: Metadata = {
  title: "테스트",
  robots: { index: false },
};

export default function TestPage() {
  return <TestRunner />;
}
