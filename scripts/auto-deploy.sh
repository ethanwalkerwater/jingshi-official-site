#!/usr/bin/env bash
# 官网自动部署：宝塔「计划任务」每 5 分钟跑一次（见 docs/服务器自动部署.md）。
# 远端 main 有新提交才拉代码、构建、重启；没有就直接退出。传 --force 不管有没有新提交都重新构建一次。
# 先构建到 .next-build，成功了才换成 .next 再重启：构建失败时线上照常运行。
# 服务器本地配置放在仓库根目录的 .deploy.env（不进 Git）：NODE_BIN=node 所在目录，RESTART_CMD=重启网站的命令。
set -euo pipefail
cd "$(dirname "$0")/.."
[ -f .deploy.env ] && . ./.deploy.env
export PATH="${NODE_BIN:+$NODE_BIN:}$PATH"

exec 9>/tmp/jingshi-site-deploy.lock
flock -n 9 || exit 0 # 上一次还没跑完

git fetch --quiet
if [ "$(git rev-parse HEAD)" = "$(git rev-parse '@{u}')" ] && [ "${1:-}" != "--force" ]; then
  exit 0
fi

lock_before=$(git rev-parse HEAD:package-lock.json)
git pull --ff-only --quiet
if [ ! -d node_modules ] || [ "$(git rev-parse HEAD:package-lock.json)" != "$lock_before" ]; then
  npm ci --no-audit --no-fund
fi

rm -rf .next-build
NEXT_DIST_DIR=.next-build npm run build
rm -rf .next-old
[ -d .next ] && mv .next .next-old
mv .next-build .next
eval "${RESTART_CMD:?.deploy.env 里没有 RESTART_CMD}"
echo "$(date '+%F %T') 已部署 $(git log -1 --format='%h %s')"
