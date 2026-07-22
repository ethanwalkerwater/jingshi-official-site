"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { BookingButton } from "./booking";
import { IconMenu, IconX } from "./icons";

const navLinks = [
  { label: "名师团队", href: "/faculty" },
  { label: "教育理念", href: "/#pillars" },
  { label: "课程体系", href: "/#courses" },
  { label: "校区联系", href: "/#contact" },
];

/** 浅色常驻顶栏：KA 图形 + 菁仕教育字标（单张 logo-blue.svg，只设高度不变形） */
export default function Header() {
  const [drawer, setDrawer] = useState(false);
  const pathname = usePathname();
  const isTeacherDetail = pathname.startsWith("/faculty/");

  // 路由切换时收起抽屉
  useEffect(() => {
    setDrawer(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  return (
    <>
      <header className={`header${isTeacherDetail ? " teacher-detail-header" : ""}`}>
        <div className="wrap header-inner">
          <Link href="/" className="brand" aria-label={site.name}>
            <span className="brand-mark">
              <img src="/logo-blue.svg" alt={`${site.name} ${site.nameEn}`} />
            </span>
            <span className="brand-word">
              <span className="zh">{site.name}</span>
              <span className="en">{site.nameEn}</span>
            </span>
          </Link>

          <nav className="nav">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <BookingButton className="btn btn-gold header-cta">
              预约咨询
            </BookingButton>
            <button
              className="menu-toggle"
              onClick={() => setDrawer(true)}
              aria-label="打开菜单"
            >
              <IconMenu width={20} height={20} />
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer${drawer ? " open" : ""}`} aria-hidden={!drawer}>
        <div className="drawer-mask" onClick={() => setDrawer(false)} />
        <div className="drawer-panel">
          <button
            className="drawer-close"
            onClick={() => setDrawer(false)}
            aria-label="关闭菜单"
          >
            <IconX width={20} height={20} />
          </button>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="navlink"
              onClick={() => setDrawer(false)}
            >
              {l.label}
            </Link>
          ))}
          <BookingButton className="btn btn-gold" withIcon>
            预约免费咨询
          </BookingButton>
        </div>
      </div>
    </>
  );
}
