import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.resolve(process.argv[2] ?? "");
const period = String(process.argv[3] ?? "").trim();

if (!process.argv[2] || !period) {
  console.error(
    '用法：node scripts/generate-teacher-monthly-feedback.mjs "/absolute/path/to/teacher_summary.csv" "2026年8月"',
  );
  process.exit(1);
}

if (!fs.existsSync(sourcePath)) {
  console.error(`找不到月度汇总文件：${sourcePath}`);
  process.exit(1);
}

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

    if (char === '"') quoted = true;
    else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") field += char;
  }

  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const teacherSource = fs.readFileSync(
  path.join(projectRoot, "src/data/teachers.ts"),
  "utf8",
);
const publicTeacherNames = [
  ...teacherSource.matchAll(/^\s*name:\s*"([^"]+)",?$/gm),
].map((match) => match[1]);

const teacherAliases = new Map([
  ["ValentinaLin", "Valentina Lin"],
  ["Valentina 林", "Valentina Lin"],
]);

function normalizeTeacherName(value) {
  const raw = String(value ?? "").trim();
  return teacherAliases.get(raw) ?? raw;
}

const themeDefinitions = [
  {
    pattern: /已经很好了，没有需要提升的/,
    summary: "整体表现获得认可，暂无明确改进项",
  },
  {
    pattern: /更个性化地了解(?:我|孩子)的学习习惯与心理状态/,
    summary: "更个性化地关注学习习惯与心理状态",
  },
  {
    pattern: /更灵活地调整教学节奏，适应(?:我|孩子)的学习状态/,
    summary: "更灵活地调整教学节奏",
  },
  {
    pattern: /更能激发(?:我|孩子)的学习主动性与自信心/,
    summary: "进一步激发学习主动性与自信心",
  },
  {
    pattern: /课后能主动提供学习反馈和阶段性总结/,
    summary: "加强课后学习反馈与阶段性总结",
  },
  {
    pattern: /更得体的着装形象与职业气质/,
    summary: "提升着装形象与职业气质",
  },
];

function extractThemes(value) {
  const source = String(value ?? "");
  return themeDefinitions
    .filter((theme) => theme.pattern.test(source))
    .map((theme) => theme.summary);
}

const rows = parseCsv(fs.readFileSync(sourcePath, "utf8"));
const headers = rows.shift().map((value) =>
  String(value ?? "").replace(/^\uFEFF/, "").trim(),
);
const columnIndex = new Map(headers.map((header, index) => [header, index]));

function requireColumn(header) {
  const index = columnIndex.get(header);
  if (index === undefined) throw new Error(`月度汇总中缺少字段：${header}`);
  return index;
}

const columns = {
  teacher: requireColumn("teacher"),
  coverageRate: requireColumn("coverage_rate"),
  improvement: requireColumn("metric_learning_effect_total_normalized_avg"),
  improvementCount: requireColumn("metric_learning_effect_total_value_count"),
  improvementScale: requireColumn("metric_learning_effect_total_scale_max"),
  responsibility: requireColumn("metric_responsibility_total_normalized_avg"),
  responsibilityCount: requireColumn("metric_responsibility_total_value_count"),
  charisma: requireColumn("metric_charisma_total_normalized_avg"),
  charismaCount: requireColumn("metric_charisma_total_value_count"),
  studentFeedbackCount: requireColumn("text_improvement_student_count_matched"),
  studentSamples: requireColumn("text_improvement_student_samples_matched"),
  parentFeedbackCount: requireColumn("text_improvement_parent_count_matched"),
  parentSamples: requireColumn("text_improvement_parent_samples_matched"),
};

function finiteNumber(row, column, label, teacher) {
  const value = Number(row[column]);
  if (!Number.isFinite(value)) {
    throw new Error(`${teacher} 的 ${label} 不是有效数字`);
  }
  return value;
}

const summaryRowsByTeacher = new Map(
  rows.map((row) => [normalizeTeacherName(row[columns.teacher]), row]),
);

const generatedData = Object.fromEntries(
  publicTeacherNames.map((teacher) => {
    const row = summaryRowsByTeacher.get(teacher);
    if (!row) throw new Error(`月度汇总中缺少官网老师：${teacher}`);

    const responseCount = finiteNumber(
      row,
      columns.improvementCount,
      "有效评分数",
      teacher,
    );
    const responsibilityCount = finiteNumber(
      row,
      columns.responsibilityCount,
      "责任心评分数",
      teacher,
    );
    const charismaCount = finiteNumber(
      row,
      columns.charismaCount,
      "个人魅力评分数",
      teacher,
    );
    if (!responseCount || responseCount !== responsibilityCount || responseCount !== charismaCount) {
      throw new Error(`${teacher} 的三项评分样本数不一致或为 0`);
    }
    if (finiteNumber(row, columns.improvementScale, "评分上限", teacher) !== 5) {
      throw new Error(`${teacher} 的评分量表不是 5 分制`);
    }

    const ratings = {
      improvement: finiteNumber(row, columns.improvement, "学习提升", teacher),
      responsibility: finiteNumber(
        row,
        columns.responsibility,
        "责任心与服务态度",
        teacher,
      ),
      charisma: finiteNumber(row, columns.charisma, "个人魅力", teacher),
    };

    return [
      teacher,
      {
        period,
        responseCount,
        coverageRate: finiteNumber(row, columns.coverageRate, "覆盖率", teacher),
        studentFeedbackCount: finiteNumber(
          row,
          columns.studentFeedbackCount,
          "学生文字反馈数",
          teacher,
        ),
        parentFeedbackCount: finiteNumber(
          row,
          columns.parentFeedbackCount,
          "家长文字反馈数",
          teacher,
        ),
        ratings,
        overall: Number(
          (
            (ratings.improvement + ratings.responsibility + ratings.charisma) /
            3
          ).toFixed(6),
        ),
        studentThemes: extractThemes(row[columns.studentSamples]),
        parentThemes: extractThemes(row[columns.parentSamples]),
      },
    ];
  }),
);

const output = `/**
 * 此文件由 scripts/generate-teacher-monthly-feedback.mjs 自动生成。
 * 数据源：${path.basename(sourcePath)}（${period}）。
 * 请勿手工编辑。
 */
import type { TeacherMonthlyFeedback } from "./teachers";

export const teacherMonthlyFeedbackByName: Record<string, TeacherMonthlyFeedback> =
  ${JSON.stringify(generatedData, null, 2)};
`;

const outputPath = path.join(
  projectRoot,
  "src/data/teacher-monthly-feedback.generated.ts",
);
fs.writeFileSync(outputPath, output);

console.log(
  `已生成 ${path.relative(projectRoot, outputPath)}：${publicTeacherNames.length} 位官网老师，数据期 ${period}。`,
);
