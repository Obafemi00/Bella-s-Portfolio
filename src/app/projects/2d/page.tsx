import type { Metadata } from "next";
import CategoryVideoPage from "@/components/CategoryVideoPage";

export const metadata: Metadata = {
  title: "2D Animation",
};

export default function TwoDPage() {
  return <CategoryVideoPage title="2D Animation" slug="2d" />;
}
