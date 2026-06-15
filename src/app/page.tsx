import Link from "next/link";
import { site, images, pillars, stats } from "@/data/site";
import { customCourseNote } from "@/data/courses";
import { teachers } from "@/data/teachers";
import { BookingButton } from "@/components/booking";
import TeacherCard from "@/components/TeacherCard";
import CourseExplorer from "@/components/CourseExplorer";

export default function Home() {
  const featured = teachers.filter((t) => t.featured).slice(0, 8);

  return (
    <>
      {/* ① Hero */}
      <section className="hero">
        <div
          className="hero-bg"
          style={{ backgroundImage: `url("${images.hero}")` }}
        />
        <div className="wrap">
          <div className="hero-inner">
            <p className="hero-eyebrow">{site.nameEn}</p>
            <h1>
              让最优秀的老师
              <br />
              带学生<span className="accent">走向优秀</span>
            </h1>
            <p>{site.subSlogan}。深度陪伴每一位学生，直到送他们进入最心仪的高等学府。</p>
            <div className="hero-actions">
              <BookingButton className="btn btn-gold btn-lg">
                预约免费咨询
              </BookingButton>
              <a href="#philosophy" className="btn btn-outline btn-lg">
                了解菁仕
              </a>
            </div>
          </div>
          <div className="hero-stats">
            {stats.map((s) => (
              <div className="hero-stat" key={s.label}>
                <div className="num">{s.value}</div>
                <div className="lab">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ② 教育理念 */}
      <section className="section philosophy" id="philosophy">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow">为什么选择菁仕</span>
            <h2 className="section-title">精英教育，言传身教</h2>
            <p className="section-sub">
              菁仕崇尚精英教育理念——让最优秀的老师带领学生走向优秀。
              老师们不仅教学经验丰富、成功案例众多，更各自拥有金融、法律、计算机等行业背景，
              真正做到言传身教、启迪心灵，精英式陪伴学生成长。
            </p>
          </div>
          <div className="pillars">
            {pillars.map((p) => (
              <div className="pillar" key={p.title}>
                <div className="pillar-icon">
                  <i className={`ti ti-${p.icon}`} aria-hidden="true" />
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ③ 课程体系 */}
      <section className="section courses" id="courses">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">课程体系</span>
            <h2 className="section-title">覆盖留学全阶段的课程与服务</h2>
            <p className="section-sub">
              从低龄国际课程到名校申请，菁仕的课程贯穿学生留学的每一个阶段。
              点击下方课程，了解它是什么、需要怎样的基础与知识体系。
            </p>
          </div>
          <CourseExplorer />
          <p className="course-note">{customCourseNote}</p>
        </div>
      </section>

      {/* ④ 名师精选 */}
      <section className="section" id="faculty">
        <div className="wrap">
          <div className="section-head fac-head">
            <div>
              <span className="eyebrow">名师团队</span>
              <h2 className="section-title">精英中的精英</h2>
              <p className="section-sub">
                20+ 全职教师，均毕业于牛津、剑桥、帝国理工、UCL、清华、北大等世界顶级名校，
                拥有丰富的留学教育经验。
              </p>
            </div>
          </div>
          <div className="fac-grid">
            {featured.map((t) => (
              <TeacherCard key={t.name} teacher={t} />
            ))}
          </div>
          <div className="fac-more">
            <Link href="/faculty" className="btn btn-navy btn-lg">
              查看全部 {teachers.length} 位名师
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ⑤ 预约转化 */}
      <section className="section cta">
        <div
          className="cta-bg"
          style={{ backgroundImage: `url("${images.cta}")` }}
        />
        <div className="wrap">
          <div className="cta-inner">
            <h2>为孩子规划一条清晰的留学之路</h2>
            <p>
              预约一次免费咨询，菁仕课程顾问将结合孩子的现状，
              定制专属的课程与升学规划方案。
            </p>
            <BookingButton className="btn btn-gold btn-lg">
              预约免费咨询
            </BookingButton>
          </div>
        </div>
      </section>
    </>
  );
}
