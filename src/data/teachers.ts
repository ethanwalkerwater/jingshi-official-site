export type Subject = "数学" | "物理" | "化学" | "经济" | "英语";

export interface TeacherRatings {
  /** 学习提升效果 1-5 */
  improvement: number;
  /** 责任心与服务态度 1-5 */
  responsibility: number;
  /** 个人魅力 1-5 */
  charisma: number;
}

export interface Teacher {
  /** 姓名（同时作为详情页路由标识） */
  name: string;
  /** 学科 */
  subject: Subject;
  /** 性别（用于名师页筛选） */
  gender: "男" | "女";
  /** 头像路径，位于 /public/teachers 下 */
  photo: string;
  /** 学历（卡片用，简短，主要院校） */
  degree: string;
  /** 教学时长 / 经验亮点（卡片用，简短） */
  hours: string;
  /** 所授课程（卡片用） */
  courses: string;
  /** 学历详情（详情页） */
  education: string;
  /** 教学特点（详情页） */
  style: string;
  /** 三项学员评分 1-5，来自累计反馈数据 */
  ratings: TeacherRatings;
  /** 累计反馈总评分，保留 CSV 中的三位小数精度 */
  overall: number;
  /** 是否在首页「名师精选」中展示 */
  featured?: boolean;
}

/** 网站角标使用一位小数展示，排序仍使用精确总分。 */
export function avgScore(t: Teacher): string {
  return (Math.floor(t.overall * 10) / 10).toFixed(1);
}

/** 指标保留两位小数，避免抹去累计反馈中的有效差异。 */
export function ratingScore(value: number): string {
  return value.toFixed(2);
}

/** 教师展示顺序：精确总分降序；同分按姓名升序。 */
export function compareTeachers(a: Teacher, b: Teacher): number {
  return (
    b.overall - a.overall ||
    a.name.localeCompare(b.name, "zh-CN", { sensitivity: "base" })
  );
}

/**
 * 菁仕名师团队。数据来源于教研整理的「老师卡片」。
 * 评分来源：teacher_scores.csv 累计学员与家长反馈。
 */
export const teachers: Teacher[] = ([
  {
    name: "应雁心",
    gender: "女",
    subject: "数学",
    photo: "/teachers/数学-应雁心.webp",
    degree: "伦敦大学学院（UCL）· 全 A* 录取",
    hours: "累计授课 10000+ 小时",
    courses: "IGCSE · A-Level · IB · AP 数学",
    education: "伦敦大学学院（UCL）以全 A* 成绩录取。",
    style:
      "因材施教，按学生基础制定个性化方案；循循善诱，激发数学兴趣与长期目标；紧贴最新大纲、真题与评分标准，注重细节与规范表达，擅长梳理知识体系与逻辑框架，实现稳定提分。IGCSE / A-Level 高比例 A / A*，竞赛获奖率 90%+。",
    ratings: { improvement: 4.99, responsibility: 5.0, charisma: 4.99 },
    overall: 4.993,
    featured: true,
  },
  {
    name: "张文豪",
    gender: "男",
    subject: "数学",
    photo: "/teachers/数学-张文豪.webp",
    degree: "帝国理工学院数学系本科",
    hours: "累计教学 800+ 人",
    courses: "IGCSE · A-Level 数学",
    education: "帝国理工学院数学系本科，英国留学生活 7 年。",
    style:
      "因材施教、寓教于乐，针对薄弱模块集中强化，对优势部分拓展提升；注重学习习惯与方法，引导建立长期稳定的学习体系；强调「理解 + 应用」，重视书面表达规范与多方法验算。熟悉英国数学体系与考试风格，可分享英国学习生活经验。",
    ratings: { improvement: 4.88, responsibility: 4.95, charisma: 4.89 },
    overall: 4.907,
  },
  {
    name: "张劭景",
    gender: "男",
    subject: "数学",
    photo: "/teachers/数学-张劭景.webp",
    degree: "帝国理工学院应用数学硕士",
    hours: "幽默互动式教学",
    courses: "IGCSE · A-Level · IB · AP 数学",
    education: "诺丁汉大学数学与应用数学本科、帝国理工学院应用数学硕士。",
    style:
      "课堂幽默生动、互动性强，善于激发兴趣，让学生在轻松氛围中理解数学逻辑与内在规律；注重基础能力与学习习惯培养，为高阶学习打牢地基；教学紧贴大纲，帮助形成标准化解题与满分答题习惯，强调「理解数学之美」，引导主动探索。",
    ratings: { improvement: 4.91, responsibility: 4.96, charisma: 4.95 },
    overall: 4.94,
    featured: true,
  },
  {
    name: "陈璐怡",
    gender: "女",
    subject: "数学",
    photo: "/teachers/数学-陈璐怡.webp",
    degree: "牛津大学研究生 · 工程系本科",
    hours: "零基础 → G5 录取案例",
    courses: "IGCSE · A-Level · IB · AP 数学",
    education: "牛津大学生物化学研究生、牛津大学工程系本科。",
    style:
      "从底层原理出发讲解推演，帮助学生建立完整的知识逻辑体系；注重知识点归纳与结构化整理，强化系统理解能力；因材施教，秉持「全人教育」理念，兼顾学习与长期发展，并提供学业规划与升学路径建议。学生录取覆盖世界顶尖高校。",
    ratings: { improvement: 4.9, responsibility: 5.0, charisma: 4.99 },
    overall: 4.963,
    featured: true,
  },
  {
    name: "傅威程",
    gender: "男",
    subject: "数学",
    photo: "/teachers/数学-傅威程.webp",
    degree: "香港科技大学金融科技硕士",
    hours: "尤擅 AMC8 / 13+ 方向",
    courses: "AMC8 · 13+ 数学思维",
    education: "香港科技大学金融科技硕士、曼彻斯特大学一等数学金融荣誉学士。",
    style:
      "深入研究代数、几何、概率统计等领域，理论基础扎实；善于清晰讲解、循序渐进帮助学生建立数学理解与逻辑思维；能针对学生特点提供实用学习策略与解题方法，注重问题分析能力与长期学习习惯培养。尤擅低龄数学能力与思维训练。",
    ratings: { improvement: 4.98, responsibility: 5.0, charisma: 4.99 },
    overall: 4.99,
  },
  {
    name: "郑唯梓",
    gender: "男",
    subject: "数学",
    photo: "/teachers/数学-郑唯梓.webp",
    degree: "北京大学力学 + 经济双学位",
    hours: "竞赛与应试双经验",
    courses: "A-Level 数理 · 竞赛",
    education: "北京大学理论与应用力学学士、经济学学士（双学位），持教师资格证。",
    style:
      "强调理科知识体系构建，帮助学生形成完整逻辑框架与思维模型；注重启发式引导，提升思考力与主动性；因材施教、以点带面引导知识拓展；注重得分能力提升，能在短期内显著提高得分率。理工 + 经济双背景。",
    ratings: { improvement: 4.85, responsibility: 4.98, charisma: 4.92 },
    overall: 4.917,
  },
  {
    name: "李品轩",
    gender: "女",
    subject: "物理",
    photo: "/teachers/物理-李品轩.webp",
    degree: "西交利物浦大学国际教育硕士",
    hours: "累计授课 8000+ 小时",
    courses: "IGCSE · A-Level 物理 · 科学",
    education: "西交利物浦大学国际教育专业硕士、生物科学本科，持高中生物与英语教师资格证。",
    style:
      "逻辑清晰、富有亲和力，善于引导学生建立结构化思维；注重兴趣培养，激发主动学习；8 年以上一线国际课程教学，熟悉 IGCSE 与 A-Level 科学体系，擅长课程规划与学习路径设计、精准定位痛点。曾任教上海惠立、协和双语。",
    ratings: { improvement: 4.99, responsibility: 5.0, charisma: 4.99 },
    overall: 4.993,
    featured: true,
  },
  {
    name: "汤朔",
    gender: "男",
    subject: "物理",
    photo: "/teachers/物理-汤朔.webp",
    degree: "UCL 理学硕士 · 东南大学学士",
    hours: "Physics Bowl 获奖率 +300%",
    courses: "IGCSE · A-Level · IB · AP 物理 · 竞赛",
    education: "UCL 巴特莱特建筑学院理学硕士、东南大学建筑学学士（高考理科省前 0.43%）。",
    style:
      "强调体系化教学，依托系统思维帮助学生建立完整物理知识结构；独创「金字塔教学法」，以力学、电磁学、热力学三维网络构建可迁移认知；注重模型与原理理解，建立物理直觉，课堂兼具深度与启发，培养竞赛级解题能力。",
    ratings: { improvement: 4.94, responsibility: 4.96, charisma: 4.95 },
    overall: 4.95,
    featured: true,
  },
  {
    name: "王冰青",
    gender: "女",
    subject: "物理",
    photo: "/teachers/物理-王冰青.webp",
    degree: "清华大学学士 · UC Davis 博士",
    hours: "物理 + 统计双背景",
    courses: "IGCSE · A-Level · IB · AP 物理",
    education: "清华大学物理学学士、加州大学戴维斯分校（UC Davis）传播学博士、统计学硕士。",
    style:
      "从实证主义与物理本质规律出发讲解，帮助学生理解原理、避免机械刷题；强调「理解 + 方法」，以高效路径实现成绩与能力双提升；因材施教，激发自主学习与内驱力；紧贴考纲，系统梳理考点与得分关键。逻辑严谨、体系清晰。",
    ratings: { improvement: 4.71, responsibility: 4.98, charisma: 4.58 },
    overall: 4.757,
  },
  {
    name: "李寅鑫",
    gender: "男",
    subject: "化学",
    photo: "/teachers/化学-李寅鑫.webp",
    degree: "宾夕法尼亚大学化学硕士",
    hours: "UKChO / CCC 优秀竞赛教练",
    courses: "IGCSE · A-Level · IB · AP 化学",
    education: "宾夕法尼亚大学化学硕士、帝国理工学院流行病学硕士。",
    style:
      "多年海外留学与科研经历，专业基础扎实，擅长系统性构建化学知识体系，强化逻辑推导与本质理解；授课严谨清晰、条理分明，善用实例与类比拆解复杂概念；兼具课内提升与国际竞赛培优经验。College Board AP 认证教师。",
    ratings: { improvement: 4.54, responsibility: 4.88, charisma: 4.71 },
    overall: 4.71,
    featured: true,
  },
  {
    name: "朱毅博",
    gender: "男",
    subject: "化学",
    photo: "/teachers/化学-朱毅博.webp",
    degree: "西北大学硕士 · UC Davis 本科",
    hours: "授课 3000+ 小时",
    courses: "A-Level · IB 生化数 · 标化",
    education: "西北大学化学工程 / 生物科技硕士、加州大学戴维斯分校（UC Davis）本科。",
    style:
      "熟悉各类国际课程考试；注重理论 + 题型结合，系统梳理考点与易错点；性格温和耐心，尤擅低龄段理科思维培养与学习习惯建立；拥有 10 年留美与科研背景，可为学生提供学术规划与升学策略指导。",
    ratings: { improvement: 4.87, responsibility: 4.97, charisma: 4.9 },
    overall: 4.913,
  },
  {
    name: "刘艳阳",
    gender: "女",
    subject: "经济",
    photo: "/teachers/经济-刘艳阳.webp",
    degree: "堪培拉大学 MBA",
    hours: "A-Level 经济 A 率 90%+",
    courses: "A-Level · AP 经济",
    education: "麦考瑞大学会计学本科、堪培拉大学工商管理硕士（MBA）。",
    style:
      "10 年海外留学 + 3 年海外工作，具备国际化视野；授课逻辑清晰、紧贴考纲，擅长梳理高频考点与得分逻辑；熟悉 CIE / Edexcel / AP 出题特点，擅长短期冲刺并帮助基础薄弱学生跨等级提升（U→A）。培养多名剑桥、牛津、LSE / UCL 录取学生。",
    ratings: { improvement: 4.86, responsibility: 4.94, charisma: 4.91 },
    overall: 4.903,
    featured: true,
  },
  {
    name: "马怡婷",
    gender: "女",
    subject: "经济",
    photo: "/teachers/经济-马怡婷.webp",
    degree: "威斯康星麦迪逊本科 · MBA",
    hours: "累计授课 3000+ 小时",
    courses: "IGCSE · A-Level · AP · IB 经济",
    education: "University of Wisconsin–Madison 本科、University of Canberra 工商管理硕士（MBA）。",
    style:
      "长期担任 A-Level、AP 与 IB 经济及商务课程导师，累计教学 300+ 人；擅长整理历年高频考点，帮助学生高效建立知识框架与答题逻辑；熟悉 CIE、Edexcel 评分标准，风格务实清晰，注重提分路径规划。多名学生 U→A 提升并录取 LSE、UCL。",
    ratings: { improvement: 4.88, responsibility: 4.98, charisma: 4.92 },
    overall: 4.927,
  },
  {
    name: "陈依依",
    gender: "女",
    subject: "英语",
    photo: "/teachers/英语-陈依依.webp",
    degree: "伯明翰大学 TESOL 硕士",
    hours: "雅思阅读写作专精",
    courses: "雅思 · SAT / ACT 文法",
    education: "伯明翰大学 TESOL（对外英语教育）硕士、上海外国语大学本科，持高级中学英语教师资格证。",
    style:
      "语言教学理论扎实、一线实践丰富；熟悉体制内学生痛点，能因材施教助其快速适应国际考试体系；精准把握雅思阅读与写作出题逻辑与评分标准，注重高效应试；擅长「方法论 + 题型拆解 + 词汇体系」结合，提升做题效率与稳定性。",
    ratings: { improvement: 4.82, responsibility: 5.0, charisma: 4.86 },
    overall: 4.893,
    featured: true,
  },
  {
    name: "黄钢",
    gender: "男",
    subject: "英语",
    photo: "/teachers/英语-黄钢.webp",
    degree: "香港中文大学翻译学硕士",
    hours: "英国私校申请成功率 100%",
    courses: "雅思托福 · A-Level 文学",
    education: "香港中文大学翻译学硕士，持 CATTI 笔译二级、英语专业八级。",
    style:
      "强调英语知识体系的结构化与互联，帮助学生建立完整语言网络；从「语言使用目的」出发教学，注重实际应用与考试提分结合；纯正英音沉浸式教学。IGCSE 第一语言英语平均提分约 2 分，标化（雅思 / 托福 / SAT / ACT）提分能力突出。",
    ratings: { improvement: 4.99, responsibility: 5.0, charisma: 4.98 },
    overall: 4.99,
  },
  {
    name: "蓝浪",
    gender: "男",
    subject: "英语",
    photo: "/teachers/英语-蓝浪.webp",
    degree: "伦敦国王学院教育政策硕士",
    hours: "小分平均提升 1–1.5 分",
    courses: "雅思托福 · IGCSE 文学",
    education: "伦敦国王学院教育政策硕士、四川大学英语语言文学本科。",
    style:
      "强调英文思维方式建立，注重解题方法与语言逻辑的系统训练；注重知识框架搭建与语感培养，帮助学生从「会做题」转向「用英语思考」；引导式教学串联已知与考点；纯正英音、课堂沉浸感强，接近真实雅思听力环境。擅长中短期冲刺。",
    ratings: { improvement: 4.8, responsibility: 4.94, charisma: 4.88 },
    overall: 4.873,
  },
  {
    name: "Valentina Lin",
    gender: "女",
    subject: "英语",
    photo: "/teachers/英语-Valentina Lin.webp",
    degree: "范德堡大学优等荣誉毕业",
    hours: "EPQ 项目 80% 获 A*",
    courses: "IGCSE · A-Level · IB 英语文学 · SAT",
    education: "美国范德堡大学优等荣誉毕业（Magna Cum Laude）、复旦大学文学与世界文学专业，17 年欧美生活与学习经验。",
    style:
      "课堂开放启发，强调语言与文学基础的系统训练，兼顾学术表达的逻辑与准确；通过精读文学作品与课堂讨论培养批判性思维与深度分析；融合欧美文化拓展国际视野。学生 EPQ 项目 100% 获 A。",
    ratings: { improvement: 4.87, responsibility: 4.96, charisma: 4.94 },
    overall: 4.923,
    featured: true,
  },
  {
    name: "王储君",
    gender: "男",
    subject: "英语",
    photo: "/teachers/英语-王储君.webp",
    degree: "曼彻斯特大学本科 · TESOL 认证",
    hours: "10 年以上教龄",
    courses: "雅思 · 剑桥英语 KET / PET / FCE",
    education: "曼彻斯特大学本科，持高中英语教师资格证、TESOL 国际高级英语教师资格证、初级心理咨询师证书。",
    style:
      "专注青少年英语，覆盖 0–20 岁全阶段；具备丰富「体制内转国际」辅导经验，学生多来自上海顶尖学校；强调「系统性语言输入构建」，从语言学、教育学、心理学多维出发，注重学习习惯与语言环境，而非短期刷题。",
    ratings: { improvement: 4.93, responsibility: 4.99, charisma: 4.95 },
    overall: 4.957,
  },
  {
    name: "罗健文",
    gender: "男",
    subject: "英语",
    photo: "/teachers/英语-罗健文.webp",
    degree: "曼彻斯特大学全奖 · ICAEW 会员",
    hours: "ICAEW 全科一次通过",
    courses: "IGCSE · A-Level 会计 · 商科",
    education: "曼彻斯特大学会计与金融文学士（全额奖学金），英国英格兰及威尔士特许会计师协会（ICAEW）成员。",
    style:
      "实务导向教学，结合跨国企业工作经验，将会计理论与真实商业场景结合；基于 ICAEW 全科一次通过经验，强调细节与逻辑推导；鼓励建立规范化、结构化的解题与分析习惯，并结合 IFRS 拓展全球化理解。可帮助学生打通「从考试到职业」。",
    ratings: { improvement: 4.97, responsibility: 4.99, charisma: 4.97 },
    overall: 4.977,
  },
] satisfies Teacher[]).sort(compareTeachers);

/** 学科顺序（用于名师页筛选与分组展示） */
export const subjectOrder: Subject[] = ["数学", "物理", "化学", "经济", "英语"];
