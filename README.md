# 菁仕教育官网 · KING'S ACADEMY

面向学生与家长的对外官网，展示菁仕的教育理念、名师团队与课程体系，并引导预约咨询。
与内部管理后台（`菁仕服务后台`）相互独立。

技术栈：Next.js 15（App Router）+ React 19 + TypeScript，纯 CSS，内容数据驱动。

## 本地开发

> 需要 Node 18.18+（开发机默认 node 为 v14，请用 Homebrew 的 node：`/opt/homebrew/bin`）。

```bash
PATH=/opt/homebrew/bin:$PATH npm install
PATH=/opt/homebrew/bin:$PATH npm run dev      # http://localhost:3000
```

## 网站结构（第一版）

```
首页 /
 ├─ ① Hero 主张 + 关键数据 + 预约入口
 ├─ ② 教育理念（四大支柱）
 ├─ ③ 课程体系（四大板块）
 ├─ ④ 名师精选（首页展示 featured 老师 → 名师页）
 ├─ ⑤ 预约转化区
 └─ 页脚（校区低调收纳 + 联系方式）

名师团队 /faculty
 ├─ 头图 + 简介
 ├─ 学科筛选（全部 / 数学 / 物理 / 化学 / 经济 / 英语）
 └─ 全部 20 位老师卡片

全站常驻：顶栏「预约试听」高亮按钮 → 任意位置弹出预约表单。
```

## 如何修改内容

所有文案与数据集中在 `src/data/`，改这里即可，无需动组件：

| 文件 | 管什么 |
| --- | --- |
| [`src/data/site.ts`](src/data/site.ts) | 品牌名/标语、关键数据、教育理念四支柱、校区、联系方式、**全站配图地址** |
| [`src/data/courses.ts`](src/data/courses.ts) | 四大课程板块及其课程清单 |
| [`src/data/teachers.ts`](src/data/teachers.ts) | 20 位老师资料；加 `featured: true` 即在首页精选展示 |

- **换图片**：把图片放到 `public/images/` 下，再到 `site.ts` 的 `images` 里改对应 url（如 `"/images/hero.jpg"`）。当前用的是 Unsplash 占位图。
- **换 logo**：`public/logo.png` 目前是品牌规范图，未直接使用；顶栏现用「KA」文字标识。有干净 logo 后可替换并在 Header 启用。
- **老师头像**：放在 `public/teachers/`，命名「学科-姓名.png」，与 `teachers.ts` 里的 `photo` 字段对应。

## 待补充的信息（TODO）

详见 [`CONTENT-TODO.md`](CONTENT-TODO.md)。主要缺口：真实 logo 文件、联系方式与备案号、2 个校区地址、成绩与案例、预约表单的后端对接、品牌实拍图。
