/**
 * 教务分享页（/s/编号）：教务在内部系统 app.jsjy.asia/share/ 挑几位老师、写标题和介绍，生成链接发给家长。
 * 官网一次取回全部有效的分享页、缓存起来，按编号在内存里找：家长打开、或有人乱试编号，都不会访问内部系统。
 * 教务保存或停用时，内部系统调 /api/revalidate（target: "shares"）作废这份缓存。
 */
export interface Share {
  code: string;
  title: string;
  intro: string;
  /** 老师姓名（名师和严选老师的名字不重复，详情页也按名字找），按教务挑的顺序 */
  teachers: string[];
}

export const SHARES_TAG = "teacher-shares";
/** 编号是 8 位字母数字；形状不对的直接当作失效，不去查 */
export const SHARE_CODE = /^[A-Za-z0-9]{8}$/;

const DEFAULT_URL = "https://app.jsjy.asia/share-api/site/shares";

// shortcut: 全部有效分享页放在一个缓存项里，Next 单个缓存项上限约 2MB（每条约 1KB，够两千条）；超过时改成按编号分开缓存
export async function getShares(): Promise<Map<string, Share>> {
  const key = process.env.TEACHER_STATS_KEY;
  if (!key) throw new Error("缺少 TEACHER_STATS_KEY，取不到分享页");
  const response = await fetch(process.env.SHARE_LIST_URL || DEFAULT_URL, {
    headers: { "x-site-key": key },
    // 只靠内部系统通知作废，不定时刷新：定时刷新会在数据库没人用的时候多占计费格（约 14 点一次）。
    // 通知没送到时后台会提示教务「再通知一次」
    next: { revalidate: false, tags: [SHARES_TAG] },
  });
  // 取不到就抛错：Next 继续给上一次的页面，不会把「已失效」缓存下来
  if (!response.ok) throw new Error(`取分享页失败：HTTP ${response.status}`);
  const data = (await response.json()) as { shares: Share[] };
  return new Map(data.shares.map((share) => [share.code, share]));
}
