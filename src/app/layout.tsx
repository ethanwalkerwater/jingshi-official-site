import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookingProvider } from "@/components/booking";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${site.name} · ${site.nameEn}｜国际教育与留学规划`,
  description:
    "菁仕教育（KING'S ACADEMY）——上海高端国际教育机构。20+ 名校师资，覆盖 IGCSE、A-Level、IB、AP 国际课程，雅思托福 SAT/ACT 标化，国际学术竞赛与一站式留学规划。精品小班 1v1，精英式陪伴成长。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.34.0/dist/tabler-icons.min.css"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500;600;700&display=swap"
        />
      </head>
      <body>
        <BookingProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </BookingProvider>
      </body>
    </html>
  );
}
