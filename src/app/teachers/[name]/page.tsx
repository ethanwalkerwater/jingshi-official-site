import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  teachers,
  avgScore,
  ratingScore,
  type Teacher,
} from "@/data/teachers";
import { teacherFeedbackByName } from "@/data/teacher-feedback.generated";
import { site } from "@/data/site";
import { BookingButton } from "@/components/booking";
import { IconArrowLeft } from "@/components/icons";
import { TeacherReviews } from "@/components/TeacherReviews";

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
  const title = `${t.name}老师 · ${t.subject} · ${site.name}`;
  const description = `${t.name}，${t.degree}。${t.style.slice(0, 60)}`;
  // 分享老师详情页时，微信卡片缩略图使用老师照片
  // （photo 为 webp，微信缩略图对 webp 支持不可靠，构建时已生成同名 jpg 副本）
  const ogImage = t.photo
    .replace("/teachers/", "/og/teachers/")
    .replace(/\.webp$/, ".jpg");
  // 微信卡片：标题 ≤16 字不带学科；描述 = 学位句 + 教学特点首句，≤36 字，
  // 超长时只保留学位句，保证完整句子、句号结尾、绝不半截截断
  const ogTitle = `${t.name}｜${site.name}`;
  const firstClause = t.style.split(/[。；]/)[0].trim();
  const fullDesc = `${t.degree}。${firstClause}。`;
  const ogDescription =
    fullDesc.length <= 36 ? fullDesc : `${t.degree}。`;
  return {
    title,
    description,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: [{ url: ogImage }],
    },
  };
}

const ratingDims = [
  { key: "improvement", label: "学习提升效果" },
  { key: "responsibility", label: "责任心与服务态度" },
  { key: "charisma", label: "个人魅力" },
] as const;

const preferenceAxes = [
  {
    key: "classStyle",
    label: "上课风格",
    left: "风趣幽默",
    right: "严肃认真",
    description:
      "左侧更常通过例子、比喻、幽默或故事引入内容；右侧更强调清晰逻辑、框架与严谨表达。",
  },
  {
    key: "teachingPace",
    label: "教学节奏",
    left: "高效紧凑",
    right: "稳扎稳打",
    description:
      "左侧内容密度更高、节奏更快；右侧节奏更平稳，重视每一步的消化。",
  },
  {
    key: "classroomInteraction",
    label: "课堂互动",
    left: "讲授主导型",
    right: "互动引导型",
    description:
      "左侧以老师系统讲解为主；右侧更常通过提问和讨论，引导学生参与思考与表达。",
  },
] as const;

function preferenceDisplay(position: number, left: string, right: string) {
  if (position <= 40) {
    return {
      label: `偏${left}`,
      tone: "left",
      activeStep: Math.round((position / 100) * 4),
    };
  }
  if (position >= 60) {
    return {
      label: `偏${right}`,
      tone: "right",
      activeStep: Math.round((position / 100) * 4),
    };
  }
  return {
    label: "相对均衡",
    tone: "center",
    activeStep: 2,
  };
}

export default async function TeacherDetail({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const t = findTeacher(name);
  if (!t) notFound();
  const feedback = teacherFeedbackByName[t.name];
  const reviews = feedback?.reviews ?? [];
  const reviewCount = feedback?.reviewCount ?? 0;
  const preferenceCount = preferenceAxes.filter(
    (axis) => t[axis.key] !== null,
  ).length;

  return (
    <>
      <section className="detail">
        <div className="wrap">
          <Link href="/teachers" className="detail-back">
            <IconArrowLeft />
            返回名师团队
          </Link>

          <div className="detail-grid">
            <aside className="detail-aside">
              <div className="detail-photo-shell">
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
                <BookingButton className="detail-photo-booking">
                  预约试听
                </BookingButton>
              </div>
              <div className="detail-courses detail-courses-desktop">
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

            <div className="detail-content">
              <h1 className="detail-name">{t.name}</h1>
              <p className="detail-degree">{t.degree}</p>

              <div className="detail-courses detail-courses-mobile">
                <p className="lab">所授课程</p>
                <div className="detail-tags">
                  {t.courses.split("·").map((c) => (
                    <span className="tag" key={c}>
                      {c.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="detail-block">
                <h2>学历背景</h2>
                <p>{t.education}</p>
              </div>

              <div className="detail-block">
                <h2>教学特点</h2>
                <p>{t.style}</p>
              </div>

              <div className="detail-block">
                <h2>课堂体验</h2>
                {preferenceCount > 0 ? (
                  <>
                    <div className="preference-panel">
                      {preferenceAxes.map((axis) => {
                        const signal = t[axis.key];
                        if (!signal) return null;
                        const display = preferenceDisplay(
                          signal.position,
                          axis.left,
                          axis.right,
                        );
                        return (
                          <div
                            className="preference-row"
                            key={axis.key}
                            aria-label={`${axis.label}：${axis.description}`}
                          >
                            <div className="preference-meta">
                              <strong>{axis.label}</strong>
                              <span>{signal.responseCount} 份反馈</span>
                            </div>
                            <div className="preference-spectrum">
                              <span>{axis.left}</span>
                              <div
                                className="preference-steps"
                                aria-hidden="true"
                              >
                                {[0, 1, 2, 3, 4].map((step) => (
                                  <span
                                    className={`preference-step${
                                      step === display.activeStep
                                        ? ` active ${display.tone}`
                                        : ""
                                    }`}
                                    key={step}
                                  />
                                ))}
                              </div>
                              <span>{axis.right}</span>
                            </div>
                            <span
                              className={`preference-result ${display.tone}`}
                            >
                              {display.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <p className="preference-note">
                      位置来自学员问卷中的有效选择，表示整体倾向，不代表每节课采用固定模式。
                    </p>
                  </>
                ) : (
                  <p className="detail-empty">
                    当前有效样本不足，积累更多学员反馈后展示。
                  </p>
                )}
              </div>

              <div className="detail-block">
                <h2>学员评分</h2>
                <div className="ratings">
                  {ratingDims.map((d) => {
                    const v = t.ratings[d.key];
                    return (
                      <div className="rating-row" key={d.key}>
                        <span className="rl">{d.label}</span>
                        <span className="rv">{ratingScore(v)}</span>
                        <div className="rating-bar">
                          <span style={{ width: `${(v / 5) * 100}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="rating-note">
                  历史累计评分，采用 1-5 分制，综合自学员与家长反馈。
                </p>
              </div>

              {t.monthlyFeedbackHistory.map((monthlyFeedback) => (
                <div className="detail-block" key={monthlyFeedback.period}>
                  <div className="detail-section-heading">
                    <h2>月度评分与反馈</h2>
                    <span>{monthlyFeedback.period}</span>
                  </div>
                  <div className="monthly-score-grid">
                    {ratingDims.map((dimension) => (
                      <div className="monthly-score-item" key={dimension.key}>
                        <span>{dimension.label}</span>
                        <strong>
                          {ratingScore(
                            monthlyFeedback.ratings[dimension.key],
                          )}
                        </strong>
                      </div>
                    ))}
                  </div>
                  <p className="monthly-score-note">
                    该月共 {monthlyFeedback.responseCount} 份有效评分；作为独立月度记录追加，不覆盖历史累计评分。
                  </p>
                  {(monthlyFeedback.studentThemes.length > 0 ||
                    monthlyFeedback.parentThemes.length > 0) && (
                    <div className="monthly-feedback-grid">
                      {monthlyFeedback.studentThemes.length > 0 && (
                        <section className="monthly-feedback-group">
                          <header>
                            <strong>学生反馈</strong>
                            <span>
                              {monthlyFeedback.studentFeedbackCount} 条
                            </span>
                          </header>
                          <ul>
                            {monthlyFeedback.studentThemes.map((theme) => (
                              <li key={theme}>{theme}</li>
                            ))}
                          </ul>
                        </section>
                      )}
                      {monthlyFeedback.parentThemes.length > 0 && (
                        <section className="monthly-feedback-group">
                          <header>
                            <strong>家长反馈</strong>
                            <span>
                              {monthlyFeedback.parentFeedbackCount} 条
                            </span>
                          </header>
                          <ul>
                            {monthlyFeedback.parentThemes.map((theme) => (
                              <li key={theme}>{theme}</li>
                            ))}
                          </ul>
                        </section>
                      )}
                    </div>
                  )}
                  <p className="monthly-feedback-note">
                    摘要来自匿名问卷中的结构化改进反馈；无效自由文本、玩笑内容与个人信息不会公开。
                  </p>
                </div>
              ))}

              <div className="detail-block">
                <div className="detail-section-heading">
                  <h2>学生与家长真实评价</h2>
                  {reviewCount > 0 && <span>共 {reviewCount} 条</span>}
                </div>
                <TeacherReviews teacherName={t.name} reviews={reviews} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="detail-mobile-booking">
        <div>
          <strong>{t.name}老师</strong>
          <span>{t.subject} · {avgScore(t)} 综合评分</span>
        </div>
        <BookingButton className="btn btn-gold">预约试听</BookingButton>
      </div>

    </>
  );
}
