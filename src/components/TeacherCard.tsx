import Link from "next/link";
import { avgScore, type Teacher } from "@/data/teachers";

/** 名师卡片：照片 + 评分 + 姓名 + 学历 + 所授课程，点击进入详情页 */
export default function TeacherCard({ teacher }: { teacher: Teacher }) {
  const courses = teacher.courses
    .split(/\s*[·/]\s*/)
    .map((course) => course.trim())
    .filter(Boolean);

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
        <span className="teacher-score teacher-score-card" aria-label={`综合评分 ${avgScore(teacher)}`}>
          <i className="ti ti-star-filled" aria-hidden="true" />
          <span className="s">{avgScore(teacher)}</span>
        </span>
      </div>
      <div className="teacher-body">
        <h3 className="teacher-name">{teacher.name}</h3>
        <p className="teacher-degree">{teacher.degree}</p>
        <div className="teacher-meta">
          <div className="teacher-courses" aria-label={`所授课程：${teacher.courses}`}>
            {courses.map((course) => (
              <span className="teacher-course-chip" key={course}>
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
