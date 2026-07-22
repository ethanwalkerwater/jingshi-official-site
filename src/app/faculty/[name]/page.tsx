import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teachers, avgScore, type Teacher } from "@/data/teachers";
import { site } from "@/data/site";
import { BookingButton } from "@/components/booking";

export function generateStaticParams() {
  return teachers.map((t) => ({ name: t.name }));
}

function findTeacher(nameParam: string): Teacher | undefined {
  const name = decodeURIComponent(nameParam);
  return teachers.find((t) => t.name === name);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const t = findTeacher(name);
  if (!t) return { title: `名师 · ${site.name}` };
  return {
    title: `${t.name}老师 · ${t.subject} · ${site.name}`,
    description: `${t.name}，${t.degree}。${t.style.slice(0, 60)}`,
  };
}

const ratingDims = [
  { key: "improvement", label: "学习提升效果" },
  { key: "responsibility", label: "责任心与服务态度" },
  { key: "charisma", label: "个人魅力" },
] as const;

export default async function TeacherDetail({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const t = findTeacher(name);
  if (!t) notFound();

  return (
    <>
      <section className="detail">
        <div className="wrap">
          <p className="breadcrumb">
            <Link href="/">首页</Link> / <Link href="/faculty">名师团队</Link> /{" "}
            {t.name}
          </p>

          <div className="detail-grid">
            <aside className="detail-aside">
              <div
                className="detail-photo"
                style={{ backgroundImage: `url("${t.photo}")` }}
                role="img"
                aria-label={`${t.name}老师`}
              >
                <span className="detail-score">
                  <span className="s">{avgScore(t)}</span>
                  <span className="l">综合评分</span>
                </span>
              </div>
              <div className="detail-courses">
                <p className="lab">所授课程</p>
                <div className="detail-tags">
                  {t.courses.split("·").map((c) => (
                    <span className="tag" key={c}>
                      {c.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </aside>

            <div>
              <h1 className="detail-name">{t.name}</h1>
              <p className="detail-degree">{t.degree}</p>

              <div className="detail-block">
                <h2>学历背景</h2>
                <p>{t.education}</p>
              </div>

              <div className="detail-block">
                <h2>教学特点</h2>
                <p>{t.style}</p>
              </div>

              <div className="detail-block">
                <h2>学员评分</h2>
                <div className="ratings">
                  {ratingDims.map((d) => {
                    const v = t.ratings[d.key];
                    return (
                      <div className="rating-row" key={d.key}>
                        <span className="rl">{d.label}</span>
                        <span className="rv">{v.toFixed(1)}</span>
                        <div className="rating-bar">
                          <span style={{ width: `${(v / 5) * 100}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="rating-note">评分为 1–5 分制，综合自学员与家长反馈。</p>
              </div>

              <div className="detail-cta">
                <BookingButton className="btn btn-gold btn-lg">
                  预约 {t.name} 老师试听
                </BookingButton>
                <Link href="/faculty" className="btn btn-ghost btn-lg">
                  返回名师团队
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 浅色 CTA 横条 */}
      <section className="cta-bar">
        <div className="wrap cta-inner">
          <div>
            <h2>找到最适合孩子的老师</h2>
            <p>预约免费咨询，根据学习阶段与目标匹配老师与课程方案。</p>
          </div>
          <BookingButton className="btn btn-gold btn-lg">
            预约免费咨询
          </BookingButton>
        </div>
      </section>
    </>
  );
}
