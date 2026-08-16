import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.resolve(process.argv[2] ?? process.env.FEEDBACK_CSV ?? "");
const supplementalSourcePaths = process.argv.slice(3).map((value) => path.resolve(value));

if (!process.argv[2] && !process.env.FEEDBACK_CSV) {
  console.error(
    '用法：node scripts/generate-teacher-feedback.mjs "/absolute/path/to/feedback.csv" ["/absolute/path/to/respondent_detail.csv" ...]',
  );
  process.exit(1);
}

if (!fs.existsSync(sourcePath)) {
  console.error(`找不到问卷文件：${sourcePath}`);
  process.exit(1);
}

for (const supplementalSourcePath of supplementalSourcePaths) {
  if (!fs.existsSync(supplementalSourcePath)) {
    console.error(`找不到补充反馈文件：${supplementalSourcePath}`);
    process.exit(1);
  }
}

const teacherSource = fs.readFileSync(
  path.join(projectRoot, "src/data/teachers.ts"),
  "utf8",
);
const publicTeacherNames = [
  ...teacherSource.matchAll(/^\s*name:\s*"([^"]+)",?$/gm),
].map((match) => match[1]);
const publicTeacherSet = new Set(publicTeacherNames);

const teacherAliases = new Map([
  ["Valentina 林", "Valentina Lin"],
  ["Valentina林", "Valentina Lin"],
  ["ValentinaLin", "Valentina Lin"],
]);

const axisDefinitions = {
  classStyle: {
    header: "【学生】上课风格",
    left: "风趣幽默",
    right: "严肃认真",
  },
  teachingPace: {
    header: "【学生】教学节奏",
    left: "高效紧凑",
    right: "稳扎稳打",
  },
  classroomInteraction: {
    header: "【学生】课堂互动",
    left: "讲授主导型",
    right: "互动引导型",
  },
};

function parseCsv(source) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];

    if (quoted) {
      if (char === '"' && source[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }

  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function normalizeTeacherName(value) {
  const raw = String(value ?? "").trim();
  return teacherAliases.get(raw) ?? raw;
}

function normalizeOption(value) {
  return String(value ?? "").trim().split(" - ")[0];
}

function redactReview(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g, "[联系方式已隐藏]")
    .replace(/(?<!\d)1[3-9]\d{9}(?!\d)/g, "[联系方式已隐藏]")
    .replace(/https?:\/\/\S+/gi, "[链接已隐藏]")
    .replace(
      /(微信|WeChat|vx|wx)\s*[:：号]?\s*[A-Za-z0-9_-]{5,}/gi,
      "$1：[联系方式已隐藏]",
    );
}

function replaceLiteral(value, search, replacement) {
  const target = String(search ?? "").trim();
  if (target.length < 2) return value;
  return value.replaceAll(target, replacement);
}

function redactStudentName(value, studentName, normalizedStudentName, reviewerType) {
  const replacement =
    reviewerType === "parent"
      ? "孩子"
      : reviewerType === "student"
        ? "我"
        : "学员";
  const candidates = new Set(
    [studentName, normalizedStudentName]
      .flatMap((name) => {
        const raw = String(name ?? "").trim();
        return [raw, raw.replace(/\s+/g, "")];
      })
      .filter((name) => name.length >= 2),
  );
  let redacted = value;
  for (const candidate of candidates) {
    redacted = replaceLiteral(redacted, candidate, replacement);
  }
  return redacted;
}

const emptyFeedbackPattern =
  /^(?:无|暂无|没有|不知道|没啥|无建议|暂无建议|没有建议|none|n\/?a)[\s。！!？?]*$/i;

function normalizeSupplementalReview(value) {
  return String(value ?? "")
    .split(/\s*\|\s*/)
    .map(redactReview)
    .filter((part) => part && !emptyFeedbackPattern.test(part))
    .join("；");
}

/**
 * 月度问卷的自由文本是「改进建议」，不是全部都适合公开。
 * 只收录有实质教学信息的文本，排除空答、测试文本、辱骂、刷屏和与教学无关内容。
 */
function isPublishableSupplementalReview(content) {
  if (content.length < 6 || content.length > 280) return false;
  if (emptyFeedbackPattern.test(content)) return false;
  if (
    /(?:1111|nigger|bitch|cnm|nbkls|sigma|CASN|生日快乐|橙汁|毯子|空调太冷|请我吃饭|维尼the pooh|夸爆|夸完|累死了|少给他排点课)/i.test(
      content,
    )
  ) {
    return false;
  }
  const emojiCount = [...content].filter((char) => /\p{Extended_Pictographic}/u.test(char))
    .length;
  if (emojiCount > 4) return false;
  return /(?:老师|教学|课程|课后|备课|课件|学习|提升|提高|成绩|规划|节奏|主动性|督促|考试|满意|讲得|挺好)/.test(
    content,
  );
}

const compoundSurnames = [
  "欧阳",
  "司马",
  "上官",
  "诸葛",
  "东方",
  "皇甫",
  "尉迟",
  "公孙",
  "慕容",
  "司徒",
  "司空",
  "夏侯",
];

function anonymizeReviewer(value, reviewerType) {
  const raw = String(value ?? "").trim();
  const isParent = reviewerType === "parent";
  if (!raw) return isParent ? "学生家长" : "匿名同学";
  if (/家长|妈妈|爸爸|母亲|父亲/.test(raw)) return "学生家长";

  const chinese = raw.match(/[\u3400-\u9fff]+/)?.[0];
  if (chinese) {
    const compound = compoundSurnames.find((surname) =>
      chinese.startsWith(surname),
    );
    const anonymizedName = `${compound ?? chinese[0]}同学`;
    return isParent ? `${anonymizedName}家长` : anonymizedName;
  }

  const initial = raw.match(/[A-Za-z]/)?.[0]?.toUpperCase();
  if (!initial) return isParent ? "学生家长" : "匿名同学";
  return isParent ? `${initial} 同学家长` : `${initial} 同学`;
}

function formatMonth(value) {
  const match = String(value ?? "").match(/(\d{4})[/-](\d{1,2})/);
  return match ? `${match[1]}年${Number(match[2])}月` : "";
}

function timestamp(value) {
  const normalized = String(value ?? "").trim().replaceAll("/", "-");
  const parsed = Date.parse(normalized);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function stableHash(value) {
  return createHash("sha256").update(value).digest("hex");
}

function avatarPath(studentName) {
  const avatarNumber =
    (Number.parseInt(stableHash(studentName || "anonymous").slice(0, 8), 16) %
      24) +
    1;
  return `/avatars/thumbs/${String(avatarNumber).padStart(2, "0")}.svg`;
}

const rows = parseCsv(fs.readFileSync(sourcePath, "utf8"));
const headers = rows.shift().map((value) =>
  String(value ?? "").replace(/^\uFEFF/, "").trim(),
);
const columnIndex = new Map(headers.map((header, index) => [header, index]));

function requireColumn(header) {
  const index = columnIndex.get(header);
  if (index === undefined) {
    throw new Error(`问卷中缺少字段：${header}`);
  }
  return index;
}

const columns = {
  id: requireColumn("自动编号"),
  submittedAt: requireColumn("提交时间"),
  teacher: requireColumn("您本次评价的老师姓名："),
  student: requireColumn("您的姓名："),
  review: requireColumn("【推荐度】推荐原因"),
  ...Object.fromEntries(
    Object.entries(axisDefinitions).map(([key, definition]) => [
      key,
      requireColumn(definition.header),
    ]),
  ),
};

const reviewerTypeColumn = columnIndex.get("你的身份");
const reviewerSignalColumns = {
  student: headers.flatMap((header, index) =>
    /^【(?:学生|学员)】/.test(header) ? [index] : [],
  ),
  parent: headers.flatMap((header, index) =>
    /^【家长】/.test(header) ? [index] : [],
  ),
};

function detectReviewerType(row) {
  const explicitType =
    reviewerTypeColumn === undefined
      ? ""
      : String(row[reviewerTypeColumn] ?? "").trim();
  if (/家长|妈妈|爸爸|母亲|父亲/.test(explicitType)) return "parent";
  if (/学生|学员/.test(explicitType)) return "student";

  const hasStudentSignal = reviewerSignalColumns.student.some((index) =>
    String(row[index] ?? "").trim(),
  );
  const hasParentSignal = reviewerSignalColumns.parent.some((index) =>
    String(row[index] ?? "").trim(),
  );
  if (hasParentSignal && !hasStudentSignal) return "parent";
  if (hasStudentSignal && !hasParentSignal) return "student";
  return "anonymous";
}

function detectSupplementalReviewerType(value) {
  const sourceIdentities = String(value ?? "");
  const isParent = /家长|监护人/.test(sourceIdentities);
  const isStudent = /学生|学员/.test(sourceIdentities);
  if (isParent && !isStudent) return "parent";
  if (isStudent && !isParent) return "student";
  return "anonymous";
}

const rawByTeacher = new Map(
  publicTeacherNames.map((teacher) => [
    teacher,
    {
      axes: Object.fromEntries(
        Object.keys(axisDefinitions).map((key) => [
          key,
          { left: 0, right: 0 },
        ]),
      ),
      reviews: [],
    },
  ]),
);

for (const row of rows) {
  const teacher = normalizeTeacherName(row[columns.teacher]);
  if (!publicTeacherSet.has(teacher)) continue;
  const teacherData = rawByTeacher.get(teacher);

  for (const [key, definition] of Object.entries(axisDefinitions)) {
    const option = normalizeOption(row[columns[key]]);
    if (option === definition.left) teacherData.axes[key].left += 1;
    if (option === definition.right) teacherData.axes[key].right += 1;
  }

  const content = redactReview(row[columns.review]);
  if (content.length < 4) continue;

  const studentName = String(row[columns.student] ?? "").trim();
  const submittedAt = String(row[columns.submittedAt] ?? "").trim();
  const reviewerType = detectReviewerType(row);
  teacherData.reviews.push({
    id: stableHash(
      `${teacher}|${row[columns.id] ?? ""}|${submittedAt}|${content}`,
    ).slice(0, 12),
    author: anonymizeReviewer(studentName, reviewerType),
    reviewerType,
    date: formatMonth(submittedAt),
    content,
    avatar: avatarPath(studentName),
    sortTime: timestamp(submittedAt),
  });
}

let supplementalPublishedCount = 0;
let supplementalRejectedCount = 0;

for (const supplementalSourcePath of supplementalSourcePaths) {
  const supplementalRows = parseCsv(
    fs.readFileSync(supplementalSourcePath, "utf8"),
  );
  const supplementalHeaders = supplementalRows.shift().map((value) =>
    String(value ?? "").replace(/^\uFEFF/, "").trim(),
  );
  const supplementalColumnIndex = new Map(
    supplementalHeaders.map((header, index) => [header, index]),
  );
  const supplementalColumn = (header) => {
    const index = supplementalColumnIndex.get(header);
    if (index === undefined) {
      throw new Error(
        `补充反馈文件 ${supplementalSourcePath} 缺少字段：${header}`,
      );
    }
    return index;
  };
  const supplementalColumns = {
    teacher: supplementalColumn("teacher"),
    student: supplementalColumn("student"),
    studentRawName: supplementalColumn("student_raw_name"),
    sourceIdentities: supplementalColumn("source_identities"),
    submittedAt: supplementalColumn("submitted_at"),
    matched: supplementalColumn("matched"),
    suggestion: supplementalColumn("text_suggestion"),
  };

  for (const row of supplementalRows) {
    const teacher = normalizeTeacherName(row[supplementalColumns.teacher]);
    const rawSuggestion = String(row[supplementalColumns.suggestion] ?? "").trim();
    if (!rawSuggestion) continue;
    if (
      !publicTeacherSet.has(teacher) ||
      !/^(?:1|true)$/i.test(String(row[supplementalColumns.matched] ?? "").trim())
    ) {
      supplementalRejectedCount += 1;
      continue;
    }

    const reviewerType = detectSupplementalReviewerType(
      row[supplementalColumns.sourceIdentities],
    );
    const studentName = String(
      row[supplementalColumns.studentRawName] ?? "",
    ).trim();
    const normalizedStudentName = String(
      row[supplementalColumns.student] ?? "",
    ).trim();
    const submittedAt = String(
      row[supplementalColumns.submittedAt] ?? "",
    ).trim();
    const content = redactStudentName(
      normalizeSupplementalReview(rawSuggestion),
      studentName,
      normalizedStudentName,
      reviewerType,
    );
    if (!isPublishableSupplementalReview(content)) {
      supplementalRejectedCount += 1;
      continue;
    }

    rawByTeacher.get(teacher).reviews.push({
      id: stableHash(
        `${teacher}|monthly|${submittedAt}|${normalizedStudentName}|${content}`,
      ).slice(0, 12),
      author:
        reviewerType === "anonymous"
          ? "匿名反馈"
          : anonymizeReviewer(studentName || normalizedStudentName, reviewerType),
      reviewerType,
      date: formatMonth(submittedAt),
      content,
      avatar: avatarPath(studentName || normalizedStudentName),
      sortTime: timestamp(submittedAt),
    });
    supplementalPublishedCount += 1;
  }
}

function buildAxis(axis) {
  const responseCount = axis.left + axis.right;
  if (!responseCount) return null;
  return {
    position: Math.round((axis.right / responseCount) * 100),
    responseCount,
  };
}

const generatedData = Object.fromEntries(
  publicTeacherNames.map((teacher) => {
    const raw = rawByTeacher.get(teacher);
    const seenReviewText = new Set();
    const reviews = raw.reviews
      .sort(
        (a, b) =>
          b.sortTime - a.sortTime || b.id.localeCompare(a.id, "zh-CN"),
      )
      .filter((review) => {
        if (seenReviewText.has(review.content)) return false;
        seenReviewText.add(review.content);
        return true;
      });

    return [
      teacher,
      {
        classStyle: buildAxis(raw.axes.classStyle),
        teachingPace: buildAxis(raw.axes.teachingPace),
        classroomInteraction: buildAxis(raw.axes.classroomInteraction),
        reviewCount: reviews.length,
        reviews: reviews.map(({ sortTime: _, ...review }) => review),
      },
    ];
  }),
);

const output = `/**
 * 此文件由 scripts/generate-teacher-feedback.mjs 自动生成。
 * 请勿手工编辑；更新方式见 docs/教师反馈数据维护.md。
 */
import type { TeacherFeedbackProfile } from "./teacher-feedback";

export const teacherFeedbackByName: Record<string, TeacherFeedbackProfile> =
  ${JSON.stringify(generatedData, null, 2)};
`;

const outputPath = path.join(
  projectRoot,
  "src/data/teacher-feedback.generated.ts",
);
fs.writeFileSync(outputPath, output);

const teacherWithPreferences = Object.values(generatedData).filter(
  (teacher) =>
    teacher.classStyle ||
    teacher.teachingPace ||
    teacher.classroomInteraction,
).length;
const publishedReviews = Object.values(generatedData).reduce(
  (sum, teacher) => sum + teacher.reviews.length,
  0,
);

console.log(
  `已生成 ${path.relative(projectRoot, outputPath)}：${teacherWithPreferences} 位老师有偏向数据，页面收录 ${publishedReviews} 条公开评价。`,
);
if (supplementalSourcePaths.length) {
  console.log(
    `月度补充反馈：收录 ${supplementalPublishedCount} 条，过滤 ${supplementalRejectedCount} 条。`,
  );
}
