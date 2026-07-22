"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { useBooking } from "./booking";
import { IconChat, IconPhone } from "./icons";

/**
 * 移动端吸底转化条：「电话咨询 | 微信预约」。
 * 仅 ≤860px 显示（CSS 控制）；滚动超过一屏后滑入；预约弹窗打开时隐藏。
 */
export default function StickyCta() {
  const { open, isOpen } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isTeacherDetail = pathname.startsWith("/faculty/");

  useEffect(() => {
    if (isTeacherDetail) return;
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isTeacherDetail]);

  const tel = site.contact.phone.replace(/\s/g, "");

  if (isTeacherDetail) return null;

  return (
    <div className={`sticky-bar${scrolled && !isOpen ? " show" : ""}`}>
      <a className="btn btn-outline" href={`tel:${tel}`}>
        <IconPhone />
        电话咨询
      </a>
      <button type="button" className="btn btn-gold" onClick={open}>
        <IconChat />
        微信预约
      </button>
    </div>
  );
}
