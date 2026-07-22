"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { teachers, subjectOrder, type Subject } from "@/data/teachers";
import { IconChevronDown } from "./icons";
import TeacherCard from "./TeacherCard";

type SubjectFilter = "全部" | Subject;
type GenderFilter = "全部" | "男" | "女";
type RatingFilter = "全部" | "4.9+" | "4.8+" | "4.6+";

const ratingThreshold: Record<Exclude<RatingFilter, "全部">, number> = {
  "4.9+": 4.9,
  "4.8+": 4.8,
  "4.6+": 4.6,
};

function avg(t: (typeof teachers)[number]) {
  const { improvement, responsibility, charisma } = t.ratings;
  return (improvement + responsibility + charisma) / 3;
}

interface Group {
  label: string;
  options: string[];
  value: string;
  onPick: (v: string) => void;
  count?: (v: string) => number;
}

export default function FacultyGrid() {
  const [subject, setSubject] = useState<SubjectFilter>("全部");
  const [rating, setRating] = useState<RatingFilter>("全部");
  const [gender, setGender] = useState<GenderFilter>("全部");
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // 点击面板外 / 按 Esc 时收起下拉
  useEffect(() => {
    if (!openLabel) return;
    const onDocClick = (e: MouseEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setOpenLabel(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenLabel(null);
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openLabel]);

  const list = useMemo(
    () =>
      teachers.filter(
        (t) =>
          (subject === "全部" || t.subject === subject) &&
          (gender === "全部" || t.gender === gender) &&
          (rating === "全部" || avg(t) >= ratingThreshold[rating])
      ),
    [subject, rating, gender]
  );

  const groups: Group[] = [
    {
      label: "学科",
      options: ["全部", ...subjectOrder],
      value: subject,
      onPick: (v) => setSubject(v as SubjectFilter),
      count: (v) =>
        v === "全部"
          ? teachers.length
          : teachers.filter((t) => t.subject === v).length,
    },
    {
      label: "评分",
      options: ["全部", "4.9+", "4.8+", "4.6+"],
      value: rating,
      onPick: (v) => setRating(v as RatingFilter),
    },
    {
      label: "性别",
      options: ["全部", "男", "女"],
      value: gender,
      onPick: (v) => setGender(v as GenderFilter),
      count: (v) =>
        v === "全部"
          ? teachers.length
          : teachers.filter((t) => t.gender === v).length,
    },
  ];

  return (
    <>
      <div className="filter-bar" ref={barRef}>
        {groups.map((g) => (
          <div className="fdrop" key={g.label}>
            <button
              type="button"
              className={`fdrop-btn${openLabel === g.label ? " open" : ""}${
                g.value !== "全部" ? " active" : ""
              }`}
              aria-expanded={openLabel === g.label}
              onClick={() =>
                setOpenLabel(openLabel === g.label ? null : g.label)
              }
            >
              <span className="fdrop-label">{g.label}</span>
              <span className="fdrop-value">{g.value}</span>
              <IconChevronDown />
            </button>
            {openLabel === g.label && (
              <div className="fdrop-menu" role="menu">
                {g.options.map((o) => (
                  <button
                    key={o}
                    type="button"
                    role="menuitemradio"
                    aria-checked={g.value === o}
                    className={`fdrop-item${g.value === o ? " active" : ""}`}
                    onClick={() => {
                      g.onPick(o);
                      setOpenLabel(null);
                    }}
                  >
                    {o}
                    {g.count && <span className="n">{g.count(o)}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <p className="filter-count">共 {list.length} 位老师</p>
      </div>

      {list.length > 0 ? (
        <div className="fac-grid">
          {list.map((t) => (
            <TeacherCard key={t.name} teacher={t} />
          ))}
        </div>
      ) : (
        <p className="fac-empty">没有符合条件的老师，请调整筛选条件。</p>
      )}
    </>
  );
}
