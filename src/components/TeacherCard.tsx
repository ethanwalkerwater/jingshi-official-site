import type { Teacher } from "@/data/teachers";

/**
 * 名师卡片。clampBio 为 true 时简介截断为 4 行（首页精选用），
 * false 时完整展示（名师页用）。
 */
export default function TeacherCard({
  teacher,
  clampBio = false,
}: {
  teacher: Teacher;
  clampBio?: boolean;
}) {
  return (
    <article className="teacher">
      <div
        className="teacher-photo"
        style={{ backgroundImage: `url("${teacher.photo}")` }}
        role="img"
        aria-label={`${teacher.name}老师`}
      >
        <span className="teacher-subject">{teacher.subject}</span>
      </div>
      <div className="teacher-body">
        <h3 className="teacher-name">{teacher.name}</h3>
        <p className="teacher-tag">{teacher.tag}</p>
        <p className={`teacher-bio${clampBio ? " clamp" : ""}`}>{teacher.bio}</p>
      </div>
    </article>
  );
}
