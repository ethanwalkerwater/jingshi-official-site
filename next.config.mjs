import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 仓库目录名为中文，显式锁定根目录避免 Next 误判工作区根
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
