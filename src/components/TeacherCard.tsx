import Link from "next/link";
import { avgScore, type Teacher } from "@/data/teachers";

/** 名师卡片：平均分角标 + 姓名 + 学历 + 教学时长 + 所授课程，点击进入详情页 */
export default function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <Link
      href={`/faculty/${encodeURIComponent(teacher.name)}`}
      className="teacher"
    >
      <div
        className="teacher-photo"
        style={{ backgroundImage: `url("${teacher.photo}")` }}
        role="img"
        aria-label={`${teacher.name}老师`}
      >
        <span className="teacher-subject">{teacher.subject}</span>
        <span className="teacher-score" aria-label={`综合评分 ${avgScore(teacher)}`}>
          <span className="s">{avgScore(teacher)}</span>
          <span className="l">综合评分</span>
        </span>
      </div>
      <div className="teacher-body">
        <h3 className="teacher-name">
          {teacher.name}
          <span className="more">查看详情 →</span>
        </h3>
        <p className="teacher-degree">
          <i className="ti ti-school" aria-hidden="true" />
          {teacher.degree}
        </p>
        <div className="teacher-meta">
          <div>
            <i className="ti ti-clock-hour-4" aria-hidden="true" />
            {teacher.hours}
          </div>
          <div>
            <i className="ti ti-book-2" aria-hidden="true" />
            {teacher.courses}
          </div>
        </div>
      </div>
    </Link>
  );
}
