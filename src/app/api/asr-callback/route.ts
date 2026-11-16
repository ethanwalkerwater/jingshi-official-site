import { after } from "next/server";

/**
 * 菁仕课堂录音转写完成的中转（腾讯云录音识别 CallbackUrl 指向这里）。
 * 腾讯云把整份转写（一节 2 小时的课 1～4 MB）放在回调里 POST 过来，CloudBase 的 HTTP 访问服务
 * 只收 100 KB 以内的文本请求体，直接回调到 classroom-api 会被网关拒掉（EXCEED_MAX_PAYLOAD_SIZE）。
 * 这里丢掉请求体，只把课程编号转给 classroom-api；它自己去腾讯云查结果、出报告。
 * 先回腾讯云成功（不然它会重试），转发放在响应之后做。转丢了也没关系：classroom-api 的兜底会补上。
 */
const LESSON = /^(rec[A-Za-z0-9]+|adhoc-[0-9a-f]{16})$/;
const TARGET = "https://app.jsjy.asia/classroom-api/asr/callback";

export async function POST(request: Request) {
  const lesson = new URL(request.url).searchParams.get("lesson") ?? "";
  if (LESSON.test(lesson)) {
    after(async () => {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          // classroom-api 出完报告才响应（约 1 分钟）；它按租约和阶段去重，重复转发无害
          const response = await fetch(`${TARGET}?lesson=${lesson}`, { method: "POST", signal: AbortSignal.timeout(290_000) });
          if (response.status < 500) return;
          console.error("[asr-callback] 转发失败", lesson, response.status);
        } catch (error) {
          console.error("[asr-callback] 转发失败", lesson, error);
        }
        await new Promise((resolve) => setTimeout(resolve, 30_000));
      }
    });
  }
  return Response.json({ code: 0, message: "成功" });
}
