import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { getShares, SHARE_CODE } from "@/data/shares";
import { getTeachers, selectedTeachers } from "@/data/teachers";
import TeacherCard, { SelectedTeacherCard } from "@/components/TeacherCard";
import { BookingButton } from "@/components/booking";

// 每个编号第一次被打开时生成并缓存；内容变了靠 /api/revalidate 作废
export const revalidate = 86400;
export function generateStaticParams() {
  return [];
}

async function findShare(code: string) {
  if (!SHARE_CODE.test(code)) return undefined;
  return (await getShares()).get(code);
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const share = await findShare((await params).code);
  return {
    title: share ? `${share.title} · ${site.name}` : `链接已失效 · ${site.name}`,
    description: share?.intro.slice(0, 36) || undefined,
    // 只发给家长，不进搜索引擎
    robots: { index: false, follow: false },
    openGraph: share ? { title: share.title, description: share.intro.slice(0, 36) || undefined } : undefined,
  };
}

export default async function SharePage({ params }: { params: Promise<{ code: string }> }) {
  const share = await findShare((await params).code);
  if (!share) {
    return (
      <section className="page-head share-gone">
        <div className="wrap">
          <h1>这个链接已失效</h1>
          <p>请联系菁仕教务老师获取新的链接，或者看看我们的全部老师。</p>
          <p>
            <Link className="btn btn-outline" href="/teachers">
              查看名师团队
            </Link>
          </p>
        </div>
      </section>
    );
  }

  const teachers = await getTeachers();
  const byName = new Map<string, { kind: "teacher"; t: (typeof teachers)[number] } | { kind: "selected"; t: (typeof selectedTeachers)[number] }>();
  for (const t of teachers) byName.set(t.name, { kind: "teacher", t });
  for (const t of selectedTeachers) byName.set(t.name, { kind: "selected", t });
  // 官网上已经删掉的老师（离职）直接不显示
  const cards = share.teachers.map((name) => byName.get(name)).filter((card) => card !== undefined);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{share.title}</h1>
          {share.intro
            .split(/\n+/)
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line, i) => (
              <p key={i}>{line}</p>
            ))}
        </div>
      </section>

      <section className="section faculty-list">
        <div className="wrap">
          <div className="fac-grid">
            {cards.map((card) =>
              card.kind === "teacher" ? (
                <TeacherCard key={card.t.name} teacher={card.t} />
              ) : (
                <SelectedTeacherCard key={card.t.name} teacher={card.t} />
              ),
            )}
          </div>
        </div>
      </section>

      <section className="section sec-alt">
        <div className="wrap share-cta">
          <div className="sec-head">
            <h2>想让孩子试一节课？</h2>
            <p>告诉我们孩子的情况，教务老师帮你安排合适的老师试听。</p>
          </div>
          <BookingButton className="btn btn-gold btn-lg" withIcon>
            预约试听
          </BookingButton>
        </div>
      </section>
    </>
  );
}
