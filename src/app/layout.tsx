import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import { BookingProvider } from "@/components/booking";
import { site } from "@/data/site";

export const metadata: Metadata = {
  // 所有 og:image 等相对地址都基于线上域名解析为绝对地址，微信/QQ 爬虫才能取到图
  metadataBase: new URL("https://jsjy.asia"),
  title: `${site.name} · ${site.nameEn}｜国际教育与留学规划`,
  description:
    "菁仕教育（KING'S ACADEMY）——上海高端国际教育机构。20+ 名校师资，覆盖 IGCSE、A-Level、IB、AP 国际课程，雅思托福 SAT/ACT 标化，国际学术竞赛与一站式留学规划。精品小班 1v1，精英式陪伴成长。",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: `${site.name} · ${site.nameEn}`,
    // 微信卡片字数规则：标题 ≤16 字，描述 ≤36 字且为完整句子
    title: `${site.name}｜国际课程与留学规划`,
    description: "让最优秀的老师，带学生走向优秀。",
    images: [{ url: "/og/cover.png", width: 800, height: 800, alt: site.name }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <BookingProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <StickyCta />
        </BookingProvider>
      </body>
    </html>
  );
}
