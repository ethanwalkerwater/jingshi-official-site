/**
 * 站点全局信息 —— 品牌、理念、校区、联系方式、配图。
 *
 * 配图说明：images 里目前用的是占位大图（Unsplash），你可以替换成菁仕自己的实拍照片，
 * 只需把对应的 url 改成你上传到 /public/images 下的文件路径（如 "/images/hero.jpg"）。
 * 即使图片加载失败，页面也会优雅地回退到墨绿底色，不影响整体观感。
 */

export const site = {
  name: "菁仕教育",
  nameEn: "KING'S ACADEMY",
  /** 主标语 */
  slogan: "让最优秀的老师，带学生走向优秀",
  /** 副标语 */
  subSlogan: "精英式陪伴成长 · 一站式国际教育与留学规划",
  /** 备案/版权信息（占位，后续替换） */
  copyright: "上海菁仕教育科技有限公司",
  /** 联系方式 */
  contact: {
    phone: "+86 158 0063 3202",
    wechat: "KingsAcademySH",
    wechatQr: "/images/wechat-qr.png",
  },
} as const;

export const images = {
  /** 首页 Hero 大图（菁仕自有图，全站仅此处使用一次） */
  hero: "/bg.webp",
} as const;

/** 教育理念 —— 四个支柱 */
export const pillars = [
  {
    icon: "award",
    title: "名校师资",
    desc: "20+ 全职教师均毕业于牛津、剑桥、帝国理工、UCL、清华、北大等世界顶尖学府，平均教龄丰富、成功案例众多。",
  },
  {
    icon: "briefcase",
    title: "行业背景",
    desc: "老师们各自拥有金融、法律、计算机等行业背景，不只教知识，更能言传身教、启迪心灵，传递真实的学术与职业视野。",
  },
  {
    icon: "users",
    title: "精品小班 · 1v1",
    desc: "专注精品小班与一对一定制课程，因材施教，深度陪伴每一位学生，直到送他们进入最心仪的高等学府。",
  },
  {
    icon: "world",
    title: "一站式资源",
    desc: "与英美顶尖私立高中、海外名校及上海各国际学校保持良好合作，为家庭提供一站式信息同步与全天候响应，对接稀缺资源。",
  },
] as const;

/** 关键数字（占位，可按真实数据调整） */
export const stats = [
  { value: "20+", label: "全职名校师资" },
  { value: "4", label: "上海校区" },
  { value: "10+", label: "国际课程 & 竞赛体系" },
  { value: "一站式", label: "留学规划服务" },
] as const;

export interface Campus {
  name: string;
  address: string;
}

/** 校区信息 */
export const campuses: Campus[] = [
  { name: "杨浦校区", address: "上海市杨浦区国霞路 60 号君庭广场 A 座 3N" },
  { name: "文定校区", address: "上海市徐汇区文定路 218 号徐家汇德 B 座 4 楼 408" },
  { name: "松江校区", address: "上海市松江区荣北路 551 弄 1 号楼 102 室" },
  { name: "徐汇校区", address: "上海市徐汇区龙兰路 277 号东航·滨江中心 T2 座 703/704 室" },
];
