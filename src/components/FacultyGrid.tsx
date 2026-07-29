"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  compareTeachers,
  teachers,
  subjectOrder,
  type Subject,
} from "@/data/teachers";
import { IconChevronDown } from "./icons";
import TeacherCard, {
  type TeacherCardScoreMetric,
} from "./TeacherCard";

type SubjectFilter = "全部" | Subject;
type GenderFilter = "全部" | "男" | "女";
type SortKey = TeacherCardScoreMetric;

const sortKeys: SortKey[] = [
  "overall",
  "improvement",
  "responsibility",
  "charisma",
];

const sortLabels: Record<
  SortKey,
  { button: string; menu: string }
> = {
  overall: { button: "综合评分", menu: "按综合评分排序" },
  improvement: { button: "学习提分", menu: "按学习提分效果排序" },
  responsibility: {
    button: "责任服务",
    menu: "按责任心与服务态度排序",
  },
  charisma: { button: "个人魅力", menu: "按教师个人魅力排序" },
};

function sortScore(
  teacher: (typeof teachers)[number],
  sortBy: SortKey
): number {
  return sortBy === "overall" ? teacher.overall : teacher.ratings[sortBy];
}

interface Group {
  label: string;
  options: string[];
  value: string;
  valueLabel?: string;
  optionLabel?: (v: string) => string;
  active?: boolean;
  onPick: (v: string) => void;
  count?: (v: string) => number;
}

export default function FacultyGrid() {
  const [subject, setSubject] = useState<SubjectFilter>("全部");
  const [sortBy, setSortBy] = useState<SortKey>("overall");
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

  const list = useMemo(() => {
    const filtered = teachers.filter(
      (teacher) =>
        (subject === "全部" || teacher.subject === subject) &&
        (gender === "全部" || teacher.gender === gender)
    );

    return [...filtered].sort(
      (a, b) =>
        sortScore(b, sortBy) - sortScore(a, sortBy) ||
        compareTeachers(a, b)
    );
  }, [subject, sortBy, gender]);

  const groups: Group[] = [
    {
      label: "排序",
      options: sortKeys,
      value: sortBy,
      valueLabel: sortLabels[sortBy].button,
      optionLabel: (v) => sortLabels[v as SortKey].menu,
      active: sortBy !== "overall",
      onPick: (v) => setSortBy(v as SortKey),
    },
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
                (g.active ?? g.value !== "全部") ? " active" : ""
              }`}
              aria-expanded={openLabel === g.label}
              onClick={() =>
                setOpenLabel(openLabel === g.label ? null : g.label)
              }
            >
              <span className="fdrop-label">{g.label}</span>
              <span className="fdrop-value">{g.valueLabel ?? g.value}</span>
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
                    {g.optionLabel?.(o) ?? o}
                    {g.count && <span className="n">{g.count(o)}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {list.length > 0 ? (
        <div className="fac-grid">
          {list.map((t) => (
            <TeacherCard key={t.name} teacher={t} scoreMetric={sortBy} />
          ))}
        </div>
      ) : (
        <p className="fac-empty">没有符合条件的老师，请调整筛选条件。</p>
      )}
    </>
  );
}
