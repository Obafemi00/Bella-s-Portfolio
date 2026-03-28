import type { Metadata } from "next";
import CategoryVideoPage from "@/components/CategoryVideoPage";

export const metadata: Metadata = {
  title: "AI Videos",
};

export default function AiVideoPage() {
  return <CategoryVideoPage title="AI Videos" slug="ai-video" />;
}
