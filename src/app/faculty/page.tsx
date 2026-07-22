import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { teachers } from "@/data/teachers";
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

    </>
  );
}
