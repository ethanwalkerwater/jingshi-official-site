import { createHash, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";

import { TEACHER_STATS_TAG } from "@/data/teachers";

/**
 * 内部系统有月份定稿（到期或在工作台提前发布）时调用（feedback-api refreshSite）：
 * 作废老师数据缓存，首页和名师页下次访问就按新数据重新生成，不用等每天一次的定时刷新。
 */
export async function POST(request: Request) {
  const key = process.env.TEACHER_STATS_KEY ?? "";
  const digest = (value: string) => createHash("sha256").update(value).digest();
  if (key.length < 32 || !timingSafeEqual(digest(request.headers.get("x-site-key") ?? ""), digest(key))) {
    return Response.json({ ok: false }, { status: 401 });
  }
  revalidateTag(TEACHER_STATS_TAG);
  return Response.json({ ok: true });
}
