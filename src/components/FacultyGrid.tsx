"use client";

import { useMemo, useState } from "react";
import { teachers, subjectOrder, type Subject } from "@/data/teachers";
import TeacherCard from "./TeacherCard";

type Filter = "全部" | Subject;

export default function FacultyGrid() {
  const [filter, setFilter] = useState<Filter>("全部");

  const list = useMemo(
    () =>
      filter === "全部"
        ? teachers
        : teachers.filter((t) => t.subject === filter),
    [filter]
  );

  const filters: Filter[] = ["全部", ...subjectOrder];

  return (
    <>
      <div className="filter-bar">
        {filters.map((f) => {
          const count =
            f === "全部"
              ? teachers.length
              : teachers.filter((t) => t.subject === f).length;
          return (
            <button
              key={f}
              className={`filter-chip${filter === f ? " active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
              <span className="n">{count}</span>
            </button>
          );
        })}
      </div>
      <div className="fac-grid">
        {list.map((t) => (
          <TeacherCard key={t.name} teacher={t} />
        ))}
      </div>
    </>
  );
}
