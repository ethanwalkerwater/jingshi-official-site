import { selectedTeachers, staticTeachers } from "@/data/teachers";

/**
 * 内部系统「老师分享」后台（app.jsjy.asia/share/）挑老师用的名单：名师 + 菁仕严选。
 * 都是官网已公开的资料，所以允许任何来源跨域读；构建时生成，老师资料随官网发版更新。
 */
export const dynamic = "force-static";

export function GET() {
  const teachers = [
    ...staticTeachers.map((t) => ({
      name: t.name,
      pool: "名师" as const,
      subject: t.subject,
      photo: `https://jsjy.asia${t.photo}`,
      degree: t.degree,
      hours: t.hours,
      courses: t.courses,
      ielts: t.ielts?.overall ?? null,
    })),
    ...selectedTeachers.map((t) => ({
      name: t.name,
      pool: "严选" as const,
      subject: t.subject,
      photo: null,
      degree: t.degree,
      hours: t.hours,
      courses: t.courses,
      ielts: null,
    })),
  ];
  return Response.json({ teachers }, { headers: { "access-control-allow-origin": "*" } });
}
