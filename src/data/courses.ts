export interface CourseItem {
  /** 课程/考试名称 */
  name: string;
  /** 英文或副标题 */
  en?: string;
}

export interface CourseCategory {
  /** 唯一标识 */
  id: string;
  /** 板块名称 */
  title: string;
  /** Tabler 图标名（如需要） */
  icon: string;
  /** 一句话介绍这个板块 */
  summary: string;
  /** 适合人群 */
  audience: string;
  /** 板块下的课程清单 */
  items: CourseItem[];
}

/**
 * 菁仕课程体系 —— 四大板块。
 *
 * 这里只做「板块 + 简介 + 课程清单」级别的展示。
 * 想增删课程：编辑对应板块的 items 数组即可。
 */
export const courseCategories: CourseCategory[] = [
  {
    id: "curriculum",
    title: "国际课程体系",
    icon: "school",
    summary: "主流国际学校课程的同步与培优，打牢学术主线，对接全球名校申请。",
    audience: "小升初至高中 · 国际学校 / 双语学校在读",
    items: [
      { name: "IGCSE", en: "International GCSE" },
      { name: "A-Level", en: "GCE Advanced Level" },
      { name: "IB", en: "International Baccalaureate" },
      { name: "AP", en: "Advanced Placement" },
      { name: "Top-up Degree", en: "本科学位衔接" },
    ],
  },
  {
    id: "standardized",
    title: "标化语言考试",
    icon: "certificate",
    summary: "海外院校申请的硬通货，从基础到冲刺，系统提分。",
    audience: "初中至大学 · 准备海外升学的学生",
    items: [
      { name: "TOEFL", en: "托福" },
      { name: "IELTS", en: "雅思" },
      { name: "SAT", en: "美国学术能力测试" },
      { name: "ACT", en: "美国大学入学考试" },
    ],
  },
  {
    id: "competition",
    title: "国际学术竞赛",
    icon: "trophy",
    summary: "覆盖数理化生与人文经济的高含金量竞赛，打造名校申请的差异化亮点。",
    audience: "学有余力、冲刺顶尖名校的学生",
    items: [
      { name: "AMC", en: "美国数学竞赛" },
      { name: "Euclid", en: "欧几里得数学竞赛" },
      { name: "UKMT", en: "英国数学竞赛" },
      { name: "BPhO", en: "英国物理奥赛" },
      { name: "Physics Bowl", en: "美国物理碗" },
      { name: "UKChO", en: "英国化学奥赛" },
      { name: "CCC", en: "加拿大化学竞赛" },
      { name: "BBO", en: "英国生物奥赛" },
      { name: "Marshall 经济论文", en: "Marshall Society Economics Essay" },
      { name: "John Locke 写作", en: "John Locke Writing Competition" },
    ],
  },
  {
    id: "counseling",
    title: "升学与规划服务",
    icon: "compass",
    summary: "从院校申请到学术、职业规划，一站式陪伴学生走向心仪的高等学府。",
    audience: "高中至研究生申请阶段的家庭",
    items: [
      { name: "名校 / 私校申请", en: "英美顶尖院校 · 国际学校" },
      { name: "学术规划", en: "选课 · 背景提升路径" },
      { name: "职业咨询", en: "专业方向 · 升学路径建议" },
      { name: "一站式信息同步", en: "稀缺资源对接 · 全天候响应" },
    ],
  },
];

/** 课程页底部说明：未列出的考试同样可定制开课 */
export const customCourseNote =
  "针对欧美留学的主流考试，菁仕均可按学生需求定制组建课程。未在上方列出的科目或考试，欢迎咨询。";
