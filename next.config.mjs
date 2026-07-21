import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 仓库目录名为中文，显式锁定根目录避免 Next 误判工作区根
  outputFileTracingRoot: __dirname,
  // public 静态资源默认只有 max-age=60，服务器带宽仅 4Mbps，
  // 必须为图片配置长缓存，否则每次访问都重新下载全部图片
  async headers() {
    return [
      {
        source: "/:path*.webp",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/:path*.(png|jpg|jpeg|svg|ico|woff2?)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
