# 新增教师上官网 SOP

## 适用范围

本 SOP 用于向官网新增一位教师，覆盖名师列表、教师详情页、评分排序、真实评价、首页精选、微信分享图和双远程发布。

官网目前没有独立的教师 CMS。运行时教师主数据以 `src/data/teachers.ts` 为准；`public/teachers/老师卡片.txt` 和 `public/teachers/老师介绍.md` 是历史素材，不参与网站构建，不能代替主数据更新。

## 1. 上线前必须收集的信息

### 基本信息

- 对外展示姓名：中英文空格和大小写必须定稿，该名称同时是详情页路由标识。
- 性别：男 / 女，用于名师页筛选。
- 主学科：数学 / 物理 / 化学 / 经济 / 英语。
- 是否进入首页「名师团队」：是则设置 `featured: true`；首页最多展示按总分排序后的前 8 位精选老师。
- 教师已确认姓名、肖像和简介可以对外公开。

如果是新学科，不能只新增教师对象；还要在 `src/data/teachers.ts` 同步扩展 `Subject` 类型和 `subjectOrder`，并检查筛选器展示顺序。

### 卡片和详情页文案

| 字段 | 用途 | 建议长度 / 规则 |
|---|---|---|
| `degree` | 卡片学历摘要、详情页标题下方、微信分享描述 | 单行，建议不超过 20 个字符；过长会在卡片中省略 |
| `hours` | 卡片闪电图标后的经验 / 成果亮点 | 单行，建议不超过 22 个字符，只放一个最强信息 |
| `courses` | 所授课程 | 用 `·` 分隔；卡片只展示前 2 个标签，详情页展示全部 |
| `education` | 详情页「学历背景」 | 1–2 个完整句子；写清学校、学位和专业，不根据卡片文案自行推测 |
| `style` | 详情页「教学特点」和 SEO 描述 | 建议 90–140 个字，包含可验证的教学方法、适用学生或成果 |

成果类数据（课时、提分、录取、获奖率等）必须有可追溯来源或业务负责人确认，不做文案扩写。

### 肖像文件

需要同时提供两个同名不同格式的文件：

1. `public/teachers/<学科>-<姓名>.webp`：卡片和详情页使用。
2. `public/og/teachers/<学科>-<姓名>.jpg`：微信 / Open Graph 分享使用。

当前全部教师图片都是 `591 × 827`，竖版、人物居中偏上。建议 WebP 小于 100 KB、JPG 小于 150 KB。转换后必须人工检查头顶、手臂和衣着没有被错误裁切。

参考命令（需根据原图构图调整 `-gravity`）：

```bash
magick "/原始肖像.png" -auto-orient -resize '591x827^' \
  -gravity north -extent 591x827 -quality 82 \
  "public/teachers/<学科>-<姓名>.webp"

magick "public/teachers/<学科>-<姓名>.webp" -quality 85 \
  "public/og/teachers/<学科>-<姓名>.jpg"
```

### 评分和反馈

必须提供评分的权威数据源和数据截止月份，而不是只提供三个手工数字：

- `improvement`：学习提升效果，1–5 分。
- `responsibility`：责任心与服务态度，1–5 分。
- `charisma`：个人魅力，1–5 分。
- `overall`：三个未舍入累计指标的算术平均，保留 3 位小数。

累计指标必须继续使用现有口径：

`累计指标 = Σ（月度指标 × 该月授课课时） ÷ Σ（该指标有有效评分的月份授课课时）`

更多细节见 `docs/教师评分数据.md`。

#### 新老师暂无评分时

官网已支持「暂无评分」状态。不得填 `5.0`、复制其他老师评分或只用当月分覆盖累计分。新老师尚无权威样本时，三项 `ratings` 与 `overall` 均填写 `null`：卡片显示「暂无评分」，详情页不显示虚构数字或进度，四种评分排序均将暂无评分老师置于有评分老师之后。

课堂偏向和真实评价可以暂时为空，页面已有「当前有效样本不足」和空评价状态。如果问卷中的教师名与官网展示名不一致，还要提供确切别名，不做模糊匹配。

## 2. 必须修改的文件

### A. 教师主数据

在 `src/data/teachers.ts` 的 `teacherProfiles` 中新增一个对象：

```ts
{
  name: "<对外展示姓名>",
  gender: "<男|女>",
  subject: "<数学|物理|化学|经济|英语>",
  photo: "/teachers/<学科>-<姓名>.webp",
  degree: "<卡片学历摘要>",
  hours: "<经验或成果亮点>",
  courses: "<课程 1> · <课程 2> · <课程 3>",
  education: "<完整学历背景>",
  style: "<教学特点>",
  ratings: {
    improvement: <累计分|null>,
    responsibility: <累计分|null>,
    charisma: <累计分|null>,
  },
  overall: <精确累计总分|null>,
  featured: true, // 仅在业务明确要求进入首页时添加
},
```

新增后，名师总数、教师详情路由、SEO 元数据、各种排序和现有学科 / 性别筛选都会从该数组自动生成，不需要修改页面组件。

### B. 教师肖像与分享图

- `public/teachers/<学科>-<姓名>.webp`
- `public/og/teachers/<学科>-<姓名>.jpg`

文件名必须与 `photo` 字段及教师姓名完全一致，包括空格、大小写和中文字符。

### C. 评分说明文档

在 `docs/教师评分数据.md` 表格中按精确总分降序增加新老师，并更新数据截止月份。文档与 `teachers.ts` 必须保持一致。

## 3. 按条件修改的文件

| 条件 | 文件 | 操作 |
|---|---|---|
| 要从原问卷生成课堂偏向 / 真实评价 | `src/data/teacher-feedback.generated.ts` | 不手改，使用 `npm run data:feedback -- ...` 重新生成 |
| 问卷姓名与官网姓名不同 | `scripts/generate-teacher-feedback.mjs` | 在 `teacherAliases` 中加入精确别名映射 |
| 新增学科 | `src/data/teachers.ts` | 扩展 `Subject` 和 `subjectOrder` |
| 首页精选 | `src/data/teachers.ts` | 经业务确认后添加 `featured: true`；确认是否挤出原前 8 位 |
| 新老师无权威评分但要立即上线 | `src/data/teachers.ts` | 三项评分与总分填写 `null`，不临时填假数据 |

`public/teachers/老师卡片.txt` 和 `public/teachers/老师介绍.md` 可以作为内部素材同步更新，但修改它们不会更改网站。

## 4. 反馈数据生成

当需要将新老师的课堂偏向或真实评价发布到官网时，先在 `teachers.ts` 新增老师，再执行：

```bash
npm run data:feedback -- \
  "/历史课程反馈问卷.csv" \
  "/月度反馈/<月份>/respondent_detail.csv" \
  ["/更多月份/respondent_detail.csv" ...]
```

生成结果要求：

- 新老师必须出现在 `teacherFeedbackByName` 中；可以是空反馈对象。
- 只有学生来源才标「学生评价」，只有家长来源才标「家长评价」；合并后无法确定归属时标「匿名评价」。
- 不根据文案猜测身份，不公开姓名、联系方式、测试文本、辱骂或与教学无关内容。
- 同一套输入重复执行后，生成文件应完全一致。

详细规则见 `docs/教师反馈数据维护.md`。

## 5. 上线前验证

### 静态检查

```bash
# 资产存在、格式和尺寸正确
test -f "public/teachers/<学科>-<姓名>.webp"
test -f "public/og/teachers/<学科>-<姓名>.jpg"
sips -g pixelWidth -g pixelHeight -g format \
  "public/teachers/<学科>-<姓名>.webp" \
  "public/og/teachers/<学科>-<姓名>.jpg"

# 类型与生产构建
npx tsc --noEmit
npm run build
```

### 页面回归

启动 `npm run dev`，至少检查：

1. `/teachers`：新卡片图片、学历、亮点和前 2 个课程标签正确。
2. 学科和性别筛选：数量和归类正确。
3. 四种排序：按实际精确值降序；右上角始终保留综合分，非综合排序在左下角显示对应指标。
4. `/teachers/<URL 编码后姓名>`：详情页可访问，学历、教学特点、评分、课堂偏向和评价正确。
5. 详情页 HTML 的 `og:image` 指向对应 JPG，该 URL 返回 200。
6. 移动端与桌面端构图正常，姓名、学历、标签和固定预约栏无溢出。
7. 如设置 `featured`，首页展示结果符合「精选中总分前 8 位」的当前逻辑。

注意：不要在 `next dev` 运行时同时执行 `next build`，两者会共享 `.next` 目录并可能导致开发页面临时 500。构建完成后应重启 dev 服务。

## 6. 提交与双平台发布

工作区可能存在其他人的未提交变更。只显式暂存本次文件，不使用 `git add -A`。

```bash
git status -sb
git diff --check -- <本次文件...>
git add -- <本次文件...>
git diff --cached --name-status
git commit -m "Add <姓名> teacher profile"
git push origin main
```

当前本地仓库的 `origin` 配置了 GitHub 和 Gitee 两个 push URL，一次 `git push origin main` 会同时推送两端。发布后必须比对两个远程 `main` 的 commit SHA 相同；其他克隆如果没有该本地配置，需分别推送 GitHub 和 `gitee` 远程。

## 7. 信息收集模板

```text
对外展示姓名：
问卷 / 课表中的精确姓名或别名：
性别：
主学科：
是否首页精选：

卡片学历摘要 degree：
卡片经验 / 成果亮点 hours：
所授课程 courses：
完整学历背景 education：
教学特点 style：

原始高清肖像路径：
肖像和文案对外发布确认人：

评分数据截止月份：
累计评分数据源文件：
学习提升效果：
责任心与服务态度：
个人魅力：
精确累计总分：

需要导入的历史问卷和月度 respondent_detail.csv：
其他业务备注：
```

## 8. 是否需要创建 Skill

当前不建议创建独立 Skill，原因是：

- 流程仅适用于本仓库，文件路径、页面字段和评分口径都应跟随代码一起版本化。
- 新增老师预计是低频任务，SOP 的发现、审核和维护成本更低。
- 最高风险步骤是评分计算、名称映射和资产完整性，这些更适合用可测试的仓库脚本解决，而不是只靠 Skill 中的自然语言约束。

当出现以下任一情况时，再建议创建「菁仕教师上线」Skill：

1. 已完成 2–3 次真实新增，流程和输入模板已稳定。
2. 每次都需要跨「菁仕教育服务」与官网两个仓库重复运算、映射和发布。
3. 已有稳定的脚本能完成评分导入、图片检查和字段完整性校验，Skill 只负责收集输入、调用脚本、执行视觉回归和生成发布摘要。

在创建 Skill 之前，更优先的自动化是增加一个仓库内的 `validate-teacher-profile` 脚本，检查字段、评分范围、总分、图片尺寸、OG 副本、别名映射和生成反馈条目。
