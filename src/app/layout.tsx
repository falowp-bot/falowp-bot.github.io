import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://falowp-bot.github.io"),
  title: { default: "小花落", template: "%s · 小花落" },
  description: "面向 Kotlin 开发者的多平台机器人框架与插件生态。",
  openGraph: {
    title: "小花落",
    description: "一个轻盈、现代、可扩展的 Kotlin 多平台机器人框架。",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" suppressHydrationWarning data-scroll-behavior="smooth">
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
