import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
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
      {/* 浅色紧凑页头 */}
      <section className="page-head">
        <div className="wrap">
          <p className="breadcrumb">
            <Link href="/">首页</Link> / 名师团队
          </p>
          <h1>名师团队</h1>
          <p>
            {teachers.length} 位全职教师，均毕业于牛津、剑桥、帝国理工、清华、北大等世界顶尖学府。
          </p>
        </div>
      </section>

      <section className="section faculty-list">
        <div className="wrap">
          <FacultyGrid />
        </div>
      </section>

      {/* 浅色 CTA 横条 */}
      <section className="cta-bar">
        <div className="wrap cta-inner">
          <div>
            <h2>想了解哪位老师更适合孩子？</h2>
            <p>预约免费咨询，根据学习阶段与目标匹配最合适的老师。</p>
          </div>
          <BookingButton className="btn btn-gold btn-lg">
            预约免费咨询
          </BookingButton>
        </div>
      </section>
    </>
  );
}
