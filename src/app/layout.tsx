import "../../public/css/globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "みんなの記事v3 学内の記事が簡単に見られます",
  description:
    "進化した「みんなの記事v3」は、学内メンバーの課題を簡単に見ることができます。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
