import Link from "next/link";
import { site, images, pillars, campuses, stats } from "@/data/site";
import { teachers, avgScore } from "@/data/teachers";
import { customCourseNote } from "@/data/courses";
import { BookingButton } from "@/components/booking";
import CourseExplorer from "@/components/CourseExplorer";
import TeacherCard from "@/components/TeacherCard";
import {
  IconArrowRight,
  IconChat,
  IconMapPin,
  IconPhone,
} from "@/components/icons";

/** 首页 featured 名师：取 8 位，按综合评分排序 */
const featured = teachers
  .filter((t) => t.featured)
  .sort((a, b) => Number(avgScore(b)) - Number(avgScore(a)))
  .slice(0, 8);

export default function Home() {
  return (
    <>
      {/* ① Hero（浅色，上文下图 / 桌面左文右图） */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>
              让最优秀的老师
              <br />
              带学生<span className="accent">走向优秀</span>
            </h1>
            <p className="hero-sub">
              {site.subSlogan}。来自牛津、剑桥、帝国理工、清华、北大的全职名师，陪你走好升学每一步。
            </p>
            <div className="hero-actions">
              <BookingButton className="btn btn-gold btn-lg" withIcon>
                预约免费咨询
              </BookingButton>
            </div>
            <p className="hero-facts">
              <b>{stats[0].value}</b>&nbsp;{stats[0].label}
              <span className="dot" />
              <b>{stats[1].value}</b>&nbsp;个{stats[1].label}
              <span className="dot" />
              <b>{stats[3].value}</b>&nbsp;{stats[3].label}
            </p>
          </div>
          <div className="hero-img">
            <img src={images.hero} alt="菁仕教育课堂场景" />
          </div>
        </div>
      </section>

      {/* ② 名师团队（静态网格） */}
      <section className="section sec-alt" id="teachers">
        <div className="wrap">
          <div className="sec-head">
            <h2>名师团队</h2>
            <p>全职师资，均毕业于世界顶尖学府</p>
          </div>
          <div className="fac-grid">
            {featured.map((t) => (
              <TeacherCard key={t.name} teacher={t} />
            ))}
          </div>
          <p className="fac-more">
            <Link href="/faculty">
              查看全部 {teachers.length} 位老师
              <IconArrowRight width={14} height={14} />
            </Link>
          </p>
        </div>
      </section>

      {/* ③ 教育理念（01–04 编号列表） */}
      <section className="section" id="pillars">
        <div className="wrap">
          <div className="sec-head">
            <h2>教育理念</h2>
          </div>
          <div className="pillars">
            {pillars.map((p, i) => (
              <div className="pillar" key={p.title}>
                <span className="pillar-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ④ 课程体系（浅色：移动端手风琴 / 桌面竖排 tab） */}
      <section className="section sec-alt" id="courses">
        <div className="wrap">
          <div className="sec-head">
            <h2>课程体系</h2>
            <p>四大方向，覆盖国际课程、语言考试、学术竞赛与升学规划</p>
          </div>
          <CourseExplorer />
          <p className="course-note">{customCourseNote}</p>
        </div>
      </section>

      {/* ⑤ 校区与联系（修复 #contact 死链） */}
      <section className="section" id="contact">
        <div className="wrap">
          <div className="sec-head">
            <h2>校区与联系</h2>
            <p>{campuses.length} 个校区覆盖上海，欢迎就近到访或线上咨询</p>
          </div>
          <div className="contact-grid">
            <div className="campus-list">
              {campuses.map((c) => (
                <div className="campus" key={c.name}>
                  <span className="campus-name">
                    <IconMapPin />
                    {c.name}
                  </span>
                  <span className="campus-addr">{c.address}</span>
                </div>
              ))}
            </div>
            <div className="contact-card">
              <img
                className="qr"
                src={site.contact.wechatQr}
                alt="菁仕教育微信二维码"
              />
              <p className="qr-cap">扫码添加顾问</p>
              <p className="qr-sub">备注学生年级与意向方向，顾问一对一回复</p>
              <div className="contact-rows">
                <div className="contact-row">
                  <IconChat />
                  <span>
                    微信号&nbsp;<b>{site.contact.wechat}</b>
                  </span>
                </div>
                <a
                  className="contact-row"
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                >
                  <IconPhone />
                  <span>
                    电话&nbsp;<b>{site.contact.phone}</b>
                  </span>
                </a>
              </div>
              <BookingButton className="btn btn-gold" withIcon>
                预约到访
              </BookingButton>
            </div>
          </div>
        </div>
      </section>

      {/* ⑥ 浅色 CTA 横条 */}
      <section className="cta-bar">
        <div className="wrap cta-inner">
          <div>
            <h2>想聊聊孩子的升学规划？</h2>
            <p>预约一次免费咨询，让专业老师帮你把路径排清楚。</p>
          </div>
          <BookingButton className="btn btn-gold btn-lg" withIcon>
            预约免费咨询
          </BookingButton>
        </div>
      </section>
    </>
  );
}
