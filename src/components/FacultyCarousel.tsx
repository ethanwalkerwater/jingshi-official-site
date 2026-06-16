"use client";

import { useEffect, useRef } from "react";
import { teachers } from "@/data/teachers";
import TeacherCard from "./TeacherCard";

/**
 * 名师全宽轮播：缓慢横向无缝循环，支持鼠标/触摸拖拽，悬停暂停。
 * 数据用首页精选老师，重复一份实现无缝循环。
 */
export default function FacultyCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const featured = teachers.filter((t) => t.featured);
  const list = featured.length >= 6 ? featured : teachers.slice(0, 8);
  const loop = [...list, ...list];

  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const paused = useRef(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const speed = 0.4; // px/帧，缓慢
    const step = () => {
      const half = el.scrollWidth / 2;
      if (half > 0) {
        if (!paused.current && !drag.current.active) el.scrollLeft += speed;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
        else if (el.scrollLeft < 0) el.scrollLeft += half;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  function onDown(e: React.PointerEvent<HTMLDivElement>) {
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    el.classList.add("dragging");
  }
  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current.active) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  }
  function onUp() {
    if (!drag.current.active) return;
    drag.current.active = false;
    trackRef.current?.classList.remove("dragging");
  }
  // 拖拽过程中阻止卡片点击跳转（避免误触）
  function onClickCapture(e: React.MouseEvent<HTMLDivElement>) {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  return (
    <div
      className="carousel-viewport"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div
        ref={trackRef}
        className="carousel-track"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onPointerCancel={onUp}
        onClickCapture={onClickCapture}
      >
        {loop.map((t, i) => (
          <div className="carousel-item" key={`${t.name}-${i}`}>
            <TeacherCard teacher={t} />
          </div>
        ))}
      </div>
      <div className="carousel-fade carousel-fade-l" aria-hidden="true" />
      <div className="carousel-fade carousel-fade-r" aria-hidden="true" />
    </div>
  );
}
