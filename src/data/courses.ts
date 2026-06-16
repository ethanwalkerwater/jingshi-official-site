export interface CourseItem {
  /** 课程 / 考试名称 */
  name: string;
  /** 英文或副标题 */
  en?: string;
  /** 考试级别 / 服务阶段 */
  level: string;
  /** 面向怎样的学生 */
  audience: string;
  /** 需要什么基础 */
  foundation: string;
  /** 核心价值 */
  value: string;
  /** 给家长的理解方式 */
  parentNote: string;
  /** 考试科目 / 课程科目 / 服务模块 */
  subjects: string[];
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
 * 菁仕课程体系 —— 四大板块，每门课带决策型信息。
 * 想增删课程：编辑对应板块的 items 数组即可。
 */
export const courseCategories: CourseCategory[] = [
  {
    id: "curriculum",
    title: "国际课程体系",
    icon: "world",
    summary: "校内课程先稳住，后续选择才从容。",
    audience: "国际 / 双语学校在读，或准备转轨国际课程的学生",
    items: [
      {
        name: "IGCSE",
        en: "International GCSE",
        level: "英国国际中学课程 · 通常对应 14-16 岁",
        audience: "准备进入国际高中核心课程，或需要补齐英文授课与学科基础的学生。",
        foundation: "重点是补齐学科基础、英文读写和规范答题表达，为后续 A-Level、IB 或 AP 做准备。",
        value: "帮助学生建立扎实的国际课程地基，提前适应英文教材、国际考试题型和评分标准。",
        parentNote: "可以理解为国际高中前的地基课。地基稳，后面选 A-Level、IB 或 AP 都会更从容。",
        subjects: ["数学", "英语语言", "物理", "化学", "生物", "经济", "历史", "地理"],
      },
      {
        name: "A-Level",
        en: "GCE Advanced Level",
        level: "英国高中课程 · 通常选择 3-4 门深度学习",
        audience: "目标英国、香港、新加坡、澳洲等方向，学科优势较明确的高中学生。",
        foundation: "需要较好的单科学习能力、英文审题能力和长期刷题复盘习惯。",
        value: "成绩与大学申请高度绑定，适合把优势学科做深，冲刺 G5、港前三等名校。",
        parentNote: "A-Level 更像把几门强项做专做深，适合目标清晰、愿意在优势学科上拉开差距的学生。",
        subjects: ["数学", "进阶数学", "物理", "化学", "生物", "经济", "商务", "心理学"],
      },
      {
        name: "IB",
        en: "International Baccalaureate",
        level: "国际文凭大学预科 · 六大学科组 + TOK / EE / CAS",
        audience: "学科均衡、自驱力强，目标全球顶尖大学且愿意接受高强度综合训练的学生。",
        foundation: "需要稳定的时间管理、英文写作、跨学科阅读和持续项目产出能力。",
        value: "能体现学生综合学术能力、研究能力和批判性思维，全球认可度高。",
        parentNote: "IB 不是只拼考试分数，更考验长期规划和综合能力，适合均衡型、抗压强的孩子。",
        subjects: ["语言与文学", "第二语言", "个人与社会", "科学", "数学", "艺术", "TOK", "EE"],
      },
      {
        name: "AP",
        en: "Advanced Placement",
        level: "美国大学先修课程 · 单科考试制",
        audience: "目标美本申请，想用高阶单科成绩证明学术能力的高中学生。",
        foundation: "需要具备相应学科基础，并能适应大学入门难度的英文教材和考试节奏。",
        value: "AP 高分可增强申请材料的学术可信度，部分大学还可用于换学分或跳过入门课。",
        parentNote: "AP 像是高中阶段提前修大学单科，适合用具体科目证明孩子的学术上限。",
        subjects: ["微积分 AB/BC", "统计", "物理", "化学", "生物", "经济", "心理学", "计算机"],
      },
      {
        name: "Pre-A",
        en: "Pre-Advanced",
        level: "国际课程预备段 · 转轨衔接课程",
        audience: "体制内转国际、英文授课基础不足，或暂时还不适合直接进入高阶课程的学生。",
        foundation: "重点补英文学习习惯、数学科学词汇、课堂表达和国际课程作业方式。",
        value: "降低转轨后的适应成本，避免学生一进入国际课程就被语言和学习方式同时卡住。",
        parentNote: "Pre-A 是缓冲带，先把学习方式切过来，再进入 IGCSE、A-Level 或 AP 会稳很多。",
        subjects: ["学术英语", "数学基础", "科学基础", "阅读写作", "学习方法", "选课规划"],
      },
      {
        name: "OSSD",
        en: "Ontario Secondary School Diploma",
        level: "加拿大安省高中课程 · 学分制",
        audience: "目标加拿大、英美澳方向，希望通过过程性评价积累成绩的高中学生。",
        foundation: "需要持续完成作业、测验、课堂项目和期末任务，重视过程管理。",
        value: "成绩构成更连续，适合稳定投入、希望用高中平时表现支持大学申请的学生。",
        parentNote: "OSSD 不只看一次大考，更看长期表现，适合需要用过程管理稳住申请结果的家庭。",
        subjects: ["英语", "函数", "微积分", "物理", "化学", "生物", "经济", "商业"],
      },
    ],
  },
  {
    id: "standardized",
    title: "语言考试",
    icon: "message-2",
    summary: "语言成绩关系到申请，也关系到能否听懂课。",
    audience: "准备海外升学、国际学校入学或本科 / 研究生申请的学生",
    items: [
      {
        name: "IELTS",
        en: "雅思",
        level: "国际英语水平考试 · 学术类 / 培训类",
        audience: "目标英国、澳洲、加拿大、香港、新加坡等方向的学生。",
        foundation: "需要系统训练听说读写四项，尤其是写作 Task 1 / Task 2 和口语表达逻辑。",
        value: "是多国院校申请、签证和入学语言门槛的核心成绩。",
        parentNote: "雅思不是单纯背单词，关键是把英文输入、输出和考试评分标准对齐。",
        subjects: ["听力", "阅读", "写作", "口语", "词汇", "语法", "学术表达"],
      },
      {
        name: "TOEFL",
        en: "托福",
        level: "北美学术英语考试 · 机考综合能力",
        audience: "目标美国、加拿大本科或研究生申请的学生。",
        foundation: "需要较强的学术阅读、听讲记笔记、综合口语和综合写作能力。",
        value: "能证明学生是否具备进入英文大学课堂的语言能力。",
        parentNote: "托福更像模拟大学课堂，考的是能不能听懂、读懂并用英文整合表达。",
        subjects: ["阅读", "听力", "口语", "写作", "学术词汇", "笔记能力"],
      },
      {
        name: "SAT",
        en: "US College Entrance Exam",
        level: "美国本科入学标化 · 阅读写作 + 数学",
        audience: "目标美国本科，尤其希望用标化成绩增强竞争力的高中学生。",
        foundation: "需要英文阅读速度、语法判断、数据图表理解和数学规范答题能力。",
        value: "在部分学校恢复或重视标化的背景下，可作为学术能力的补强证据。",
        parentNote: "SAT 不是语言考试那么简单，它更像英文环境下的综合学术能力测试。",
        subjects: ["阅读与写作", "数学", "代数", "高阶数学", "数据分析", "语法"],
      },
      {
        name: "ACT",
        en: "American College Testing",
        level: "美国本科入学标化 · 多模块限时测试",
        audience: "目标美国本科，答题速度快、综合学科基础较好的学生。",
        foundation: "需要阅读、英文、数学和科学推理的快速处理能力。",
        value: "与 SAT 并列，可根据学生题型适配度选择更合适的标化路径。",
        parentNote: "ACT 节奏更快，适合反应速度和学科综合能力都不错的学生。",
        subjects: ["英语", "数学", "阅读", "科学推理", "写作选考"],
      },
      {
        name: "KET / PET / FCE",
        en: "Cambridge English",
        level: "剑桥英语等级考试 · A2-B2",
        audience: "低龄国际路线、体制内转轨或需要建立长期英文能力的学生。",
        foundation: "需要按级别逐步建立听说读写、词汇语法和日常交流能力。",
        value: "适合低龄阶段做英文能力分层，帮助后续衔接雅思、托福或国际课程。",
        parentNote: "剑桥英语更适合做长期地基，不急着冲高分，而是把语言能力一级级垫起来。",
        subjects: ["阅读", "写作", "听力", "口语", "语法", "词汇"],
      },
    ],
  },
  {
    id: "competition",
    title: "国际学术竞赛",
    icon: "trophy",
    summary: "有余力时，再把学科兴趣做深。",
    audience: "学有余力、冲刺顶尖名校或需要学术亮点的学生",
    items: [
      {
        name: "AMC",
        en: "American Mathematics Competitions",
        level: "美国数学竞赛 · AMC 8 / 10 / 12",
        audience: "数学基础较好，准备通过竞赛证明数理能力的初高中学生。",
        foundation: "需要代数、几何、数论、组合和概率基础，并熟悉竞赛题型。",
        value: "是通往 AIME 的起点，也是美本理工方向常见的数学能力证明。",
        parentNote: "AMC 适合先试水数学竞赛，再根据成绩决定是否冲 AIME 或更高阶竞赛。",
        subjects: ["代数", "几何", "数论", "组合", "概率", "逻辑推理"],
      },
      {
        name: "Euclid",
        en: "Waterloo Euclid Contest",
        level: "加拿大滑铁卢数学竞赛 · 高中高阶",
        audience: "目标加拿大、北美理工或数学方向，具备较强证明与解题能力的学生。",
        foundation: "需要函数、几何、数列、组合和证明书写能力。",
        value: "滑铁卢等北美理工院校认可度高，能体现数学深度与表达能力。",
        parentNote: "Euclid 更看重完整推理过程，不只是算出答案，适合数学表达能力强的学生。",
        subjects: ["函数", "几何", "数列", "组合", "证明", "概率"],
      },
      {
        name: "UKMT",
        en: "UK Mathematics Trust",
        level: "英国数学竞赛体系 · Junior / Intermediate / Senior",
        audience: "英国体系学生，或希望用数学竞赛补充申请材料的中学生。",
        foundation: "需要扎实校内数学基础，并适应英国竞赛的逻辑与题目表达。",
        value: "覆盖年龄段完整，适合作为英国数学竞赛路径的长期训练主线。",
        parentNote: "UKMT 可以从低龄一路往上走，适合长期培养数学兴趣和竞赛感觉。",
        subjects: ["数感", "代数", "几何", "组合", "逻辑", "问题解决"],
      },
      {
        name: "BPhO",
        en: "British Physics Olympiad",
        level: "英国物理奥赛 · 高中高阶",
        audience: "目标物理、工程、自然科学方向，物理基础强的高中学生。",
        foundation: "需要力学、电磁学、热学、波动和实验分析基础。",
        value: "能展示物理建模、推导和复杂问题解决能力，是理工申请的强背书。",
        parentNote: "BPhO 难度高，适合真正愿意钻物理的孩子，不建议只为了凑活动参加。",
        subjects: ["力学", "电磁学", "热学", "波动", "近代物理", "实验分析"],
      },
      {
        name: "Physics Bowl",
        en: "美国物理碗",
        level: "美国物理竞赛 · Division 1 / Division 2",
        audience: "学过高中物理，希望用竞赛成绩验证知识广度和反应速度的学生。",
        foundation: "需要覆盖力、电、热、光、近代物理等模块，并具备限时答题能力。",
        value: "题量与节奏强，适合检验物理知识覆盖面和快速判断能力。",
        parentNote: "物理碗更考速度和覆盖面，适合基础面广、刷题效率高的学生。",
        subjects: ["力学", "电磁学", "热学", "光学", "近代物理", "天体物理"],
      },
      {
        name: "UKChO",
        en: "UK Chemistry Olympiad",
        level: "英国化学奥赛 · 高中高阶",
        audience: "目标化学、医学、材料、生化方向，化学基础强的高中学生。",
        foundation: "需要无机、有机、物化、实验和计算题基础。",
        value: "能体现化学原理理解和综合推理能力，对理科申请有含金量。",
        parentNote: "UKChO 不只是背知识点，更看化学逻辑和陌生题推理。",
        subjects: ["无机化学", "有机化学", "物理化学", "化学计算", "实验分析"],
      },
      {
        name: "BBO",
        en: "British Biology Olympiad",
        level: "英国生物奥赛 · 高中高阶",
        audience: "目标生物、医学、心理、生命科学方向的学生。",
        foundation: "需要细胞、生理、遗传、生态和实验数据分析基础。",
        value: "能帮助学生展示生命科学方向兴趣和知识广度。",
        parentNote: "BBO 适合已经对生命科学有兴趣的学生，用竞赛把兴趣变成申请证据。",
        subjects: ["细胞生物", "遗传", "生理", "生态", "进化", "实验数据"],
      },
      {
        name: "John Locke 写作",
        en: "Essay Competition",
        level: "国际学术论文竞赛 · 中学生写作",
        audience: "人文社科、经济、哲学、政治等方向，有阅读和论证能力的学生。",
        foundation: "需要英文阅读、资料检索、论点搭建和学术写作能力。",
        value: "能体现批判性思维、表达能力和专业兴趣，对文社科申请尤其有帮助。",
        parentNote: "这类论文竞赛不是套模板，关键是孩子有没有清楚观点和严谨论证。",
        subjects: ["哲学", "政治", "经济", "历史", "心理", "神学", "法律"],
      },
    ],
  },
  {
    id: "counseling",
    title: "升学与规划服务",
    icon: "user-check",
    summary: "把要做的事排清楚，家庭会更从容。",
    audience: "准备国际学校、海外本科或研究生申请的家庭",
    items: [
      {
        name: "名校 / 私校申请",
        en: "School & University Application",
        level: "申请规划服务 · 国际学校 / 私校 / 本科 / 研究生",
        audience: "目标明确但路径复杂，需要择校、材料和时间线统筹的家庭。",
        foundation: "需要梳理学生成绩、活动、语言、课程体系和目标地区。",
        value: "把择校、考试、文书、面试和材料节点整合成可执行计划。",
        parentNote: "申请不是最后一年才开始，越早把路径排清楚，家庭越少临时补救。",
        subjects: ["择校定位", "申请时间线", "文书规划", "面试辅导", "材料审核", "录取决策"],
      },
      {
        name: "学术规划",
        en: "Academic Planning",
        level: "长期学术路径 · 选课 / 考试 / 背景提升",
        audience: "不确定选什么课程、考什么试、如何安排竞赛和活动的学生。",
        foundation: "需要了解学生能力画像、目标专业、目标国家和当前校内进度。",
        value: "把课程、标化、竞赛、活动和申请目标放在一张长期路线图里。",
        parentNote: "学术规划的价值是少走弯路，不让孩子在不重要的事情上消耗太多时间。",
        subjects: ["课程选择", "标化安排", "竞赛路径", "背景提升", "时间管理", "阶段复盘"],
      },
      {
        name: "职业咨询",
        en: "Major & Career Direction",
        level: "专业方向探索 · 升学与职业联动",
        audience: "对专业方向不确定，或需要把兴趣转化成申请叙事的学生。",
        foundation: "需要梳理兴趣、能力、性格、过往项目和家庭期待。",
        value: "帮助学生理解专业对应的学习内容、职业路径和申请准备方式。",
        parentNote: "职业咨询不是替孩子决定未来，而是让选择更有依据。",
        subjects: ["兴趣测评", "专业探索", "职业路径", "项目建议", "申请叙事"],
      },
      {
        name: "一站式信息同步",
        en: "Family Coordination",
        level: "家庭陪伴服务 · 信息同步 / 资源对接 / 节点提醒",
        audience: "需要持续跟进课程、考试、申请和学校信息的家庭。",
        foundation: "需要建立学生档案、目标清单、阶段任务和沟通节奏。",
        value: "降低家庭信息差和执行压力，让关键节点有人提醒、有人跟进。",
        parentNote: "很多焦虑来自信息不对称，我们把事情拆清楚、同步好，家庭会稳很多。",
        subjects: ["学习档案", "节点提醒", "家校沟通", "资源对接", "进度复盘", "风险预警"],
      },
    ],
  },
];

/** 课程页底部说明：未列出的考试同样可定制开课 */
export const customCourseNote =
  "针对欧美留学的主流考试，菁仕均可按学生需求定制组建课程。未在上方列出的科目或考试，欢迎咨询。";
