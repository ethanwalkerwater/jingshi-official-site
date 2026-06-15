export interface CourseItem {
  /** 课程 / 考试名称 */
  name: string;
  /** 英文或副标题 */
  en?: string;
  /** 简介：是什么 + 基础背景 + 所需知识体系 */
  desc: string;
}

export interface CourseCategory {
  id: string;
  title: string;
  /** Tabler 图标名 */
  icon: string;
  summary: string;
  audience: string;
  items: CourseItem[];
}

/**
 * 菁仕课程体系 —— 四大板块，每门课带简介。
 * 想增删课程：编辑对应板块的 items 数组即可。
 */
export const courseCategories: CourseCategory[] = [
  {
    id: "curriculum",
    title: "国际课程体系",
    icon: "school",
    summary: "主流国际学校课程的同步与培优，打牢学术主线，对接全球名校申请。",
    audience: "小升初至高中 · 国际 / 双语学校在读",
    items: [
      {
        name: "IGCSE",
        en: "International GCSE",
        desc: "英国体系下 14–16 岁的国际中学课程，是 A-Level / IB 的衔接基础。覆盖数学、科学、英语与人文等学科，帮助学生在升入高中课程前建立扎实的学科底子与英文学术表达能力。",
      },
      {
        name: "A-Level",
        en: "GCE Advanced Level",
        desc: "英国高中课程与升学的「黄金标准」，通常选修 3–4 门。以学科深度专精见长，成绩直接对接英国及全球大学申请，适合目标明确、希望发挥学科优势的学生。",
      },
      {
        name: "IB",
        en: "International Baccalaureate",
        desc: "国际文凭大学预科项目，需修读六大学科组并完成 TOK、EE 与 CAS。强调全面发展与批判性思维，适合学科均衡、学有余力、面向全球顶尖院校的学生。",
      },
      {
        name: "AP",
        en: "Advanced Placement",
        desc: "美国大学先修课程，可在高中阶段修读大学难度的单科考试。高分有助于体现学术能力、增强美本申请竞争力，并可能兑换大学学分。",
      },
      {
        name: "Top-up Degree",
        en: "本科学位衔接",
        desc: "本科学位衔接课程，帮助已完成大专或部分本科的学生衔接英国等海外院校的最后一年，取得正式学士学位。",
      },
    ],
  },
  {
    id: "standardized",
    title: "标化语言考试",
    icon: "certificate",
    summary: "海外院校申请的硬通货，从基础到冲刺，系统提分。",
    audience: "初中至大学 · 准备海外升学的学生",
    items: [
      {
        name: "TOEFL",
        en: "托福",
        desc: "面向北美院校的学术英语能力测试，考查听、说、读、写四项。是申请美国、加拿大本科与研究生的主流语言成绩之一。",
      },
      {
        name: "IELTS",
        en: "雅思",
        desc: "全球广泛认可的英语水平考试，分学术类与培训类。英国、澳洲、加拿大等院校申请的主流语言门槛。",
      },
      {
        name: "SAT",
        en: "美国学术能力测试",
        desc: "美国本科入学的标准化学术测试，考查阅读、文法与数学。是冲刺美国名校的重要标化成绩。",
      },
      {
        name: "ACT",
        en: "美国大学入学考试",
        desc: "与 SAT 并列的美国本科入学考试，增设科学推理部分，更侧重答题节奏与综合学科能力。",
      },
    ],
  },
  {
    id: "competition",
    title: "国际学术竞赛",
    icon: "trophy",
    summary: "覆盖数理化生与人文经济的高含金量竞赛，打造名校申请的差异化亮点。",
    audience: "学有余力、冲刺顶尖名校的学生",
    items: [
      { name: "AMC", en: "美国数学竞赛", desc: "AMC 8 / 10 / 12 分级，是通往 AIME 与全球数学人才选拔的起点，北美院校认可度高。" },
      { name: "Euclid", en: "欧几里得数学竞赛", desc: "滑铁卢大学主办的高含金量数学竞赛，深受北美理工与数学专业院校认可。" },
      { name: "UKMT", en: "英国数学竞赛", desc: "英国数学竞赛体系，覆盖初级到高级，是英国数学人才的主流选拔通道。" },
      { name: "BPhO", en: "英国物理奥赛", desc: "考查物理深度与建模能力，是名校理工科申请的有力学术背书。" },
      { name: "Physics Bowl", en: "美国物理碗", desc: "限时高强度的物理竞赛，考查知识广度与解题速度。" },
      { name: "UKChO", en: "英国化学奥赛", desc: "侧重化学原理的综合应用与推理，含金量高。" },
      { name: "CCC", en: "加拿大化学竞赛", desc: "权威的化学学科能力测评，适合化学方向的学术展示。" },
      { name: "BBO", en: "英国生物奥赛", desc: "面向生物方向学生的学术能力证明。" },
      { name: "Marshall 经济论文", en: "Marshall Society Essay", desc: "剑桥 Marshall Society 主办的经济论文竞赛，考查经济分析与学术写作。" },
      { name: "John Locke 写作", en: "Writing Competition", desc: "面向全球中学生的学术写作竞赛，涵盖哲学、政治、经济等领域，含金量高。" },
    ],
  },
  {
    id: "counseling",
    title: "升学与规划服务",
    icon: "compass",
    summary: "从院校申请到学术、职业规划，一站式陪伴学生走向心仪的高等学府。",
    audience: "高中至研究生申请阶段的家庭",
    items: [
      { name: "名校 / 私校申请", en: "英美顶尖院校 · 国际学校", desc: "英美顶尖大学与私立高中的择校、文书与全流程申请规划。" },
      { name: "学术规划", en: "选课 · 背景提升", desc: "结合目标院校与专业，定制选课、考试与背景提升的长期路径。" },
      { name: "职业咨询", en: "专业方向 · 升学路径", desc: "从兴趣与能力出发，提供专业方向与职业发展建议。" },
      { name: "一站式信息同步", en: "稀缺资源 · 全天候响应", desc: "依托与海外院校及国际学校的合作渠道，对接稀缺资源、全天候响应。" },
    ],
  },
];

/** 课程页底部说明：未列出的考试同样可定制开课 */
export const customCourseNote =
  "针对欧美留学的主流考试，菁仕均可按学生需求定制组建课程。未在上方列出的科目或考试，欢迎咨询。";
