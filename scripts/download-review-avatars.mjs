import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(projectRoot, "public/avatars/thumbs");
await fs.mkdir(outputDir, { recursive: true });

for (let index = 1; index <= 24; index += 1) {
  const fileName = `${String(index).padStart(2, "0")}.svg`;
  const target = path.join(outputDir, fileName);
  const url = `https://api.dicebear.com/10.x/thumbs/svg?seed=jingshi-student-${index}&backgroundType=solid`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`头像下载失败 (${response.status})：${url}`);
  }
  await fs.writeFile(target, await response.text());
}

console.log(`已将 24 个 DiceBear Thumbs 头像保存到 ${outputDir}`);
