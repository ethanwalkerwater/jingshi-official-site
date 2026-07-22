"use client";

import Link from "next/link";
import { avgScore, type Teacher } from "@/data/teachers";
import { IconStar, IconBolt } from "./icons";

/**
 * 名师卡片：照片（右上角评分角标）→ 姓名 → 学历（2 行截断）→ 经验亮点（1 行）→ 课程标签（≤2 个）。
 * 桌面端点击新标签页打开详情，移动端当前页跳转（详情页有返回按钮）。
 */
export default function TeacherCard({ teacher }: { teacher: Teacher }) {
  const href = `/faculty/${encodeURIComponent(teacher.name)}`;
  const courses = teacher.courses
    .split(/\s*[·/]\s*/)
    .map((course) => course.trim())
    .filter(Boolean)
    .slice(0, 2);

  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (window.matchMedia("(min-width: 861px)").matches) {
      e.preventDefault();
      window.open(href, "_blank", "noopener");
    }
  }

  return (
    <Link href={href} className="teacher" onClick={onClick}>
      <div className="teacher-photo">
        <img
          src={teacher.photo}
          alt={`${teacher.name}老师`}
          loading="lazy"
          decoding="async"
          width={591}
          height={827}
        />
        <span
          className="teacher-badge"
          aria-label={`综合评分 ${avgScore(teacher)}`}
        >
          <IconStar />
          {avgScore(teacher)}
        </span>
      </div>
      <div className="teacher-body">
        <h3 className="teacher-name">{teacher.name}</h3>
        <p className="teacher-degree">{teacher.degree}</p>
        <p className="teacher-highlight">
          <IconBolt />
          <span>{teacher.hours}</span>
        </p>
        <div className="teacher-tags" aria-label={`所授课程：${teacher.courses}`}>
          {courses.map((course) => (
            <span className="tag" key={course}>
              {course}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
