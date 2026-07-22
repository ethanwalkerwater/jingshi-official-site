"use client";

import { useState } from "react";
import { courseCategories, type CourseCategory } from "@/data/courses";
import { IconPlus } from "./icons";

/** 课程详情块（移动端手风琴与桌面 tab 共用） */
function CategoryDetail({ c }: { c: CourseCategory }) {
  return (
    <>
      <p className="course-audience">
        <b>适合学生：</b>
        {c.audience}
      </p>
      <div className="course-stack">
        {c.items.map((it) => (
          <div className="course-item" key={it.name}>
            <div className="course-item-head">
              <span className="name">{it.name}</span>
              {it.en && <span className="en">{it.en}</span>}
            </div>
            <p className="level">{it.level}</p>
            <p className="parent">{it.parentNote}</p>
            <div className="course-subjects">
              {it.subjects.map((s) => (
                <span className="tag" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/**
 * 课程体系 explorer：
 * ≤860px 手风琴（默认全部收起）；桌面左侧竖排 tab + 右侧详情。浅色底。
 */
export default function CourseExplorer() {
  const [tab, setTab] = useState(0);
  const [openAcc, setOpenAcc] = useState<number | null>(null);

  return (
    <>
      {/* 移动端手风琴 */}
      <div className="acc">
        {courseCategories.map((c, i) => {
          const open = openAcc === i;
          return (
            <div className={`acc-item${open ? " open" : ""}`} key={c.id}>
              <button
                type="button"
                className="acc-head"
                aria-expanded={open}
                onClick={() => setOpenAcc(open ? null : i)}
              >
                <span>
                  <span className="acc-title">{c.title}</span>
                  <span className="acc-summary">{c.summary}</span>
                </span>
                <span className="acc-chevron">
                  <IconPlus />
                </span>
              </button>
              <div className="acc-body">
                <CategoryDetail c={c} />
              </div>
            </div>
          );
        })}
      </div>

      {/* 桌面竖排 tab */}
      <div className="course-tabs">
        <div className="course-tab-list" role="tablist">
          {courseCategories.map((c, i) => (
            <button
              type="button"
              key={c.id}
              role="tab"
              aria-selected={i === tab}
              className={`course-tab${i === tab ? " active" : ""}`}
              onClick={() => setTab(i)}
            >
              <span className="t">{c.title}</span>
              <span className="s">{c.summary}</span>
            </button>
          ))}
        </div>
        <div>
          {courseCategories.map((c, i) => (
            <div
              key={c.id}
              role="tabpanel"
              className={`course-panel${i === tab ? " active" : ""}`}
            >
              <CategoryDetail c={c} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
