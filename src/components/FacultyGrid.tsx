"use client";

import { useEffect, useRef, useState } from "react";
import {
  compareTeachers,
  teachers,
  subjectOrder,
  type Subject,
} from "@/data/teachers";
import { preferenceCategory } from "@/data/teacher-feedback";
import { IconChevronDown } from "./icons";
import TeacherCard, {
  type TeacherCardScoreMetric,
} from "./TeacherCard";

type SubjectFilter = "全部" | Subject;
type GenderFilter = "全部" | "男" | "女";
type SortKey = TeacherCardScoreMetric;
type PreferenceFilter = "全部" | "left" | "center" | "right";

const preferenceAxes = [
  { key: "classStyle", label: "上课风格", left: "偏风趣幽默", right: "偏严肃认真" },
  { key: "teachingPace", label: "教学节奏", left: "偏高效紧凑", right: "偏稳扎稳打" },
  { key: "classroomInteraction", label: "课堂互动", left: "偏讲授主导型", right: "偏互动引导型" },
] as const;
type PreferenceKey = (typeof preferenceAxes)[number]["key"];
const preferenceOptions: PreferenceFilter[] = ["全部", "left", "center", "right"];

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
): number | null {
  return sortBy === "overall" ? teacher.overall : teacher.ratings[sortBy];
}

function compareByScore(
  a: (typeof teachers)[number],
  b: (typeof teachers)[number],
  sortBy: SortKey
): number {
  const aScore = sortScore(a, sortBy);
  const bScore = sortScore(b, sortBy);
  if (aScore === null && bScore !== null) return 1;
  if (aScore !== null && bScore === null) return -1;
  if (aScore !== null && bScore !== null && aScore !== bScore) {
    return bScore - aScore;
  }
  return compareTeachers(a, b);
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
  const [preferences, setPreferences] = useState<Record<PreferenceKey, PreferenceFilter>>({
    classStyle: "全部",
    teachingPace: "全部",
    classroomInteraction: "全部",
  });
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

  const matchesFilters = (
    teacher: (typeof teachers)[number],
    ignoredAxis?: PreferenceKey,
  ) =>
    (subject === "全部" || teacher.subject === subject) &&
    (gender === "全部" || teacher.gender === gender) &&
    preferenceAxes.every(({ key }) => {
      if (key === ignoredAxis || preferences[key] === "全部") return true;
      const signal = teacher[key];
      return signal !== null && preferenceCategory(signal.position) === preferences[key];
    });

  const list = teachers
    .filter((teacher) => matchesFilters(teacher))
    .sort((a, b) => compareByScore(a, b, sortBy));
  const activeFilterCount =
    Number(subject !== "全部") +
    Number(gender !== "全部") +
    preferenceAxes.filter(({ key }) => preferences[key] !== "全部").length;

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
    ...preferenceAxes.map((axis) => ({
      label: axis.label,
      options: preferenceOptions,
      value: preferences[axis.key],
      valueLabel:
        preferences[axis.key] === "left"
          ? axis.left
          : preferences[axis.key] === "right"
            ? axis.right
            : preferences[axis.key] === "center"
              ? "相对均衡"
              : "全部",
      optionLabel: (v: string) =>
        v === "left" ? axis.left : v === "right" ? axis.right : v === "center" ? "相对均衡" : "全部",
      onPick: (v: string) =>
        setPreferences((current) => ({ ...current, [axis.key]: v as PreferenceFilter })),
      count: (v: string) =>
        teachers.filter((teacher) => {
          if (!matchesFilters(teacher, axis.key)) return false;
          if (v === "全部") return true;
          const signal = teacher[axis.key];
          return signal !== null && preferenceCategory(signal.position) === v;
        }).length,
    })),
  ];

  return (
    <>
      <div className={`filter-bar${openLabel === "筛选" ? " mobile-open" : ""}`} ref={barRef}>
        {groups.map((g) => (
          <div className={`fdrop${g.label === "排序" ? "" : " desktop-filter"}`} key={g.label}>
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
                    disabled={o !== "全部" && g.count?.(o) === 0}
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
        <button
          type="button"
          className={`mobile-filter-trigger${activeFilterCount > 0 ? " active" : ""}`}
          aria-expanded={openLabel === "筛选"}
          aria-controls="mobile-filter-panel"
          onClick={() => setOpenLabel(openLabel === "筛选" ? null : "筛选")}
        >
          筛选
          {activeFilterCount > 0 && <span>{activeFilterCount}</span>}
          <IconChevronDown />
        </button>
        {openLabel === "筛选" && (
          <div className="mobile-filter-panel" id="mobile-filter-panel" role="region" aria-label="筛选老师">
            <div className="mobile-filter-content">
              <div className="mobile-filter-heading">
                <strong>筛选老师</strong>
                <div>
                  {activeFilterCount > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setSubject("全部");
                        setGender("全部");
                        setPreferences({
                          classStyle: "全部",
                          teachingPace: "全部",
                          classroomInteraction: "全部",
                        });
                      }}
                    >
                      重置
                    </button>
                  )}
                  <button type="button" onClick={() => setOpenLabel(null)}>
                    关闭
                  </button>
                </div>
              </div>
              {groups.slice(1).map((g) => (
                <div className="mobile-filter-group" key={g.label}>
                  <strong>{g.label}</strong>
                  <div className="mobile-filter-options" role="group" aria-label={g.label}>
                    {g.options.map((o) => (
                      <button
                        key={o}
                        type="button"
                        className={`mobile-filter-option${g.value === o ? " active" : ""}`}
                        aria-pressed={g.value === o}
                        disabled={o !== "全部" && g.count?.(o) === 0}
                        onClick={() => g.onPick(o)}
                      >
                        {g.optionLabel?.(o) ?? o}
                        {g.count && <span>{g.count(o)}</span>}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mobile-filter-actions">
              <button type="button" onClick={() => setOpenLabel(null)}>
                查看 {list.length} 位老师
              </button>
            </div>
          </div>
        )}
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
