"use client";

import { useState } from "react";
import { courseCategories } from "@/data/courses";

export default function CourseExplorer() {
  const [cat, setCat] = useState(0);
  const [open, setOpen] = useState(0);

  const active = courseCategories[cat];

  function selectCat(i: number) {
    setCat(i);
    setOpen(0);
  }

  return (
    <>
      <div className="cat-tabs" role="tablist">
        {courseCategories.map((c, i) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={i === cat}
            className={`cat-tab${i === cat ? " active" : ""}`}
            onClick={() => selectCat(i)}
          >
            <i className={`ti ti-${c.icon}`} aria-hidden="true" />
            {c.title}
          </button>
        ))}
      </div>

      <div className="course-layout">
        <div className="course-aside">
          <div className="ci">
            <i className={`ti ti-${active.icon}`} aria-hidden="true" />
          </div>
          <h3>{active.title}</h3>
          <p>{active.summary}</p>
          <span className="audience">
            <i className="ti ti-user-check" aria-hidden="true" />
            {active.audience}
          </span>
        </div>

        <div className="deck">
          {active.items.map((item, i) => (
            <article
              key={item.name}
              className={`deck-card${i === open ? " active" : ""}`}
              onClick={() => setOpen(i)}
            >
              <div className="deck-row">
                <span className="deck-no">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="deck-name">{item.name}</span>
                {item.en && <span className="deck-en">{item.en}</span>}
              </div>
              <div className="deck-desc">
                <p>{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
