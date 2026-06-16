"use client";

import { useState } from "react";
import { courseCategories } from "@/data/courses";

export default function CourseExplorer() {
  const [cat, setCat] = useState(0);
  const [open, setOpen] = useState(0);

  const active = courseCategories[cat];
  const activeItem = active.items[open];

  function selectCat(i: number) {
    setCat(i);
    setOpen(0);
  }

  return (
    <>
      <div className="program-tabs" role="tablist">
        {courseCategories.map((c, i) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={i === cat}
            className={`program-tab${i === cat ? " active" : ""}`}
            onClick={() => selectCat(i)}
          >
            <span className="program-copy">
              <span className="program-title">{c.title}</span>
              <span className="program-summary">{c.summary}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="course-panel">
        <aside className="course-menu" aria-label={`${active.title}项目列表`}>
          {active.items.map((item, i) => (
            <button
              type="button"
              key={item.name}
              className={`course-menu-item${i === open ? " active" : ""}`}
              onClick={() => setOpen(i)}
            >
              <span className="course-menu-copy">
                <span className="course-menu-name">{item.name}</span>
                {item.en && <span className="course-menu-en">{item.en}</span>}
              </span>
            </button>
          ))}
        </aside>

        <article className="course-detail">
          <span className="course-kicker">{active.title}</span>
          <div className="course-detail-head">
            <h3>{activeItem.name}</h3>
            {activeItem.en && <span>{activeItem.en}</span>}
          </div>
          <div className="course-meta-row">
            <div>
              <span>考试级别</span>
              <strong>{activeItem.level}</strong>
            </div>
            <div>
              <span>面向学生</span>
              <strong>{activeItem.audience}</strong>
            </div>
          </div>

          <div className="course-info-grid">
            <div className="course-info-card">
              <h4>需要什么基础</h4>
              <p>{activeItem.foundation}</p>
            </div>
            <div className="course-info-card">
              <h4>核心价值</h4>
              <p>{activeItem.value}</p>
            </div>
            <div className="course-info-card">
              <h4>家长可以这样理解</h4>
              <p>{activeItem.parentNote}</p>
            </div>
          </div>

          <div className="course-subjects">
            <h4>考试科目 / 课程模块</h4>
            <div className="course-subject-list">
              {activeItem.subjects.map((subject) => (
                <span key={subject}>{subject}</span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
