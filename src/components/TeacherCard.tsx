"use client";

import Link from "next/link";
import { avgScore, type Teacher } from "@/data/teachers";
import { IconStar, IconBolt } from "./icons";

export type TeacherCardScoreMetric =
  | "overall"
  | "improvement"
  | "responsibility"
  | "charisma";

const scoreLabels: Record<TeacherCardScoreMetric, string> = {
  overall: "综合评分",
  improvement: "学习提分效果",
  responsibility: "责任心与服务态度",
  charisma: "教师个人魅力",
};

const metricBadgeLabels: Record<
  Exclude<TeacherCardScoreMetric, "overall">,
  string
> = {
  improvement: "学习提分",
  responsibility: "责任服务",
  charisma: "个人魅力",
};

/**
 * 名师卡片：综合评分显示在照片右上角；其他排序指标显示在照片左下角。
 * 桌面端点击新标签页打开详情，移动端当前页跳转（详情页有返回按钮）。
 */
export default function TeacherCard({
  teacher,
  scoreMetric = "overall",
}: {
  teacher: Teacher;
  scoreMetric?: TeacherCardScoreMetric;
}) {
  const href = `/teachers/${encodeURIComponent(teacher.name)}`;
  const isOverallScore = scoreMetric === "overall";
  const score =
    isOverallScore
      ? avgScore(teacher)
      : teacher.ratings[scoreMetric].toFixed(1);
  const scoreLabel = scoreLabels[scoreMetric];
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
        {isOverallScore ? (
          <span
            className="teacher-badge"
            aria-label={`${scoreLabel} ${score}`}
            title={`${scoreLabel} ${score}`}
          >
            <IconStar />
            {score}
          </span>
        ) : (
          <span
            className="teacher-metric-badge"
            aria-label={`${scoreLabel} ${score}`}
            title={`${scoreLabel} ${score}`}
          >
            {metricBadgeLabels[scoreMetric]}：{score}
          </span>
        )}
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
