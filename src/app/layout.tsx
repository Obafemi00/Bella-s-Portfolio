import type { Metadata } from "next";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "Dollhouse Studios",
    template: "%s · Dollhouse Studios",
  },
  description:
    "Dollhouse Studios — branding meets the fluid motion of 2D and 3D storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/logos/11.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logos/11.png" />
      </head>
      <body>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
