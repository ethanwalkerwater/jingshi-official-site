import type { Metadata } from "next";
import Link from "next/link";
import { images, site } from "@/data/site";
import { teachers } from "@/data/teachers";
import { BookingButton } from "@/components/booking";
import FacultyGrid from "@/components/FacultyGrid";

export const metadata: Metadata = {
  title: `名师团队 · ${site.name}`,
  description:
    "菁仕教育 20+ 全职名师团队，均毕业于牛津、剑桥、帝国理工、UCL、清华、北大等世界顶级名校，覆盖数学、物理、化学、经济、英语，拥有丰富的国际课程与留学教育经验。",
};

export default function FacultyPage() {
  return (
    <>
      <section className="page-hero">
        <div
          className="page-hero-bg"
          style={{ backgroundImage: `url("${images.facultyHero}")` }}
        />
        <div className="wrap">
          <div className="page-hero-inner">
            <p className="breadcrumb">
              <Link href="/">首页</Link> / 名师团队
            </p>
            <h1>精英中的精英</h1>
            <p>
              菁仕的 {teachers.length} 位全职教师，均毕业于世界顶级名校，
              拥有丰富的留学教育经验，并各自拥有金融、法律、计算机等行业背景。
              因材施教，精英式陪伴每一位学生走向优秀。
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <FacultyGrid />
        </div>
      </section>

      <section className="section cta">
        <div
          className="cta-bg"
          style={{ backgroundImage: `url("${images.cta}")` }}
        />
        <div className="wrap">
          <div className="cta-inner">
            <h2>想了解哪位老师更适合孩子？</h2>
            <p>
              预约一次免费咨询，我们将根据孩子的学习阶段与目标，
              为您匹配最合适的老师与课程方案。
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
