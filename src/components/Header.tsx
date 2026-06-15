"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { BookingButton } from "./booking";

const navLinks = [
  { label: "教育理念", href: "/#philosophy" },
  { label: "课程体系", href: "/#courses" },
  { label: "名师团队", href: "/faculty" },
  { label: "校区联系", href: "/#contact" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  return (
    <>
      <header className={`header ${solid ? "solid" : "over"}`}>
        <div className="wrap header-inner">
          <Link href="/" className="brand" aria-label={site.name}>
            <span className="brand-mark">KA</span>
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
            <BookingButton className="btn btn-gold">预约试听</BookingButton>
            <button
              className="menu-toggle"
              onClick={() => setDrawer(true)}
              aria-label="打开菜单"
            >
              <i className="ti ti-menu-2" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer ${drawer ? "open" : ""}`}>
        <div className="drawer-top">
          <span className="brand">
            <span className="brand-mark">KA</span>
            <span className="brand-word">
              <span className="zh" style={{ color: "#fff" }}>
                {site.name}
              </span>
              <span className="en">{site.nameEn}</span>
            </span>
          </span>
          <button
            className="close"
            onClick={() => setDrawer(false)}
            aria-label="关闭菜单"
          >
            <i className="ti ti-x" aria-hidden="true" />
          </button>
        </div>
        {navLinks.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setDrawer(false)}>
            {l.label}
          </Link>
        ))}
        <BookingButton className="btn btn-gold btn-lg">预约试听</BookingButton>
      </div>
    </>
  );
}
