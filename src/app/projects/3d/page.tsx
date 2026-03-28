import type { Metadata } from "next";
import CategoryVideoPage from "@/components/CategoryVideoPage";

export const metadata: Metadata = {
  title: "3D Animation",
};

export default function ThreeDPage() {
  return <CategoryVideoPage title="3D Animation" slug="3d" />;
}
