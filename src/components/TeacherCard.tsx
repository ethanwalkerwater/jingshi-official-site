import Link from "next/link";
import { avgScore, type Teacher } from "@/data/teachers";
import { IconStar } from "./icons";

/**
 * 名师卡片：照片 → 姓名+综合评分（同行，金色星标）→ 学历（2 行截断）→ 课程标签（≤2 个）。
 * 无学科角标、无 hover 浮起金框。
 */
export default function TeacherCard({ teacher }: { teacher: Teacher }) {
  const courses = teacher.courses
    .split(/\s*[·/]\s*/)
    .map((course) => course.trim())
    .filter(Boolean)
    .slice(0, 2);

  return (
    <Link
      href={`/faculty/${encodeURIComponent(teacher.name)}`}
      className="teacher"
    >
      <div className="teacher-photo">
        <img
          src={teacher.photo}
          alt={`${teacher.name}老师`}
          loading="lazy"
          decoding="async"
          width={591}
          height={827}
        />
      </div>
      <div className="teacher-body">
        <div className="teacher-top">
          <h3 className="teacher-name">{teacher.name}</h3>
          <span
            className="teacher-score"
            aria-label={`综合评分 ${avgScore(teacher)}`}
          >
            <IconStar />
            {avgScore(teacher)}
          </span>
        </div>
        <p className="teacher-degree">{teacher.degree}</p>
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
