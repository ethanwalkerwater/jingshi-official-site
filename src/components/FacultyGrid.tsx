"use client";

import { useMemo, useState } from "react";
import { teachers, subjectOrder, type Subject } from "@/data/teachers";
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

export default function FacultyGrid() {
  const [subject, setSubject] = useState<SubjectFilter>("全部");
  const [rating, setRating] = useState<RatingFilter>("全部");
  const [gender, setGender] = useState<GenderFilter>("全部");

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

  const groups: {
    label: string;
    options: string[];
    value: string;
    onPick: (v: string) => void;
    count?: (v: string) => number;
  }[] = [
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
        v === "全部" ? teachers.length : teachers.filter((t) => t.gender === v).length,
    },
  ];

  return (
    <>
      <div className="filter-panel">
        {groups.map((g) => (
          <div className="filter-group" key={g.label}>
            <span className="filter-label">{g.label}</span>
            <div className="filter-chips">
              {g.options.map((o) => (
                <button
                  key={o}
                  className={`filter-chip${g.value === o ? " active" : ""}`}
                  onClick={() => g.onPick(o)}
                >
                  {o}
                  {g.count && <span className="n">{g.count(o)}</span>}
                </button>
              ))}
            </div>
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
