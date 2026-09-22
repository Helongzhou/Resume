# Helong Zhou · Portfolio

个人简介与作品集站点（中英双语、SEO 友好、响应式）。

## 技术栈

- Next.js 16 (App Router)
- TypeScript + Tailwind CSS 4
- next-intl（中文 `/`，英文 `/en`）
- Framer Motion（中等动效，尊重 `prefers-reduced-motion`）

## 本地运行

```bash
cp .env.example .env.local
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

## 部署（腾讯云 CVM + Docker）

已准备 `Dockerfile` / `docker-compose.yml` / `scripts/deploy.sh`。默认对外端口 **3020**（避免与同机 DTC `:3000` 冲突）。正式域名：`https://zhouhelong.icedew.online`（Cloudflare 反代到本机 `:3020`）。

```bash
# 方式一：本地私钥文件
DEPLOY_HOST=root@111.229.225.2 \
DEPLOY_KEY=~/.ssh/你的私钥 \
NEXT_PUBLIC_SITE_URL=https://zhouhelong.icedew.online \
bash scripts/deploy.sh

# 方式二：私钥内容注入环境变量（Cloud Agent Secrets）
DEPLOY_HOST=root@111.229.225.2 \
DEPLOY_SSH_PRIVATE_KEY="$(cat ~/.ssh/你的私钥)" \
NEXT_PUBLIC_SITE_URL=https://zhouhelong.icedew.online \
bash scripts/deploy.sh
```

服务器需已安装 Docker（及 Compose）。安全组放行 TCP `3020`。

## 环境变量

| 变量 | 说明 |
|------|------|
| `NEXT_PUBLIC_SITE_URL` | 站点正式访问地址，用于 `canonical` / `sitemap` / `robots` |

## 主要路由

访问根路径 `/` 会进入中文首页 `/zh`（Next.js 16 + next-intl 下 `as-needed` 无前缀模式存在生产环境重定向环，故采用 `always` 前缀，SEO 仍配齐 `hreflang` / `x-default`）。

| 路径 | 说明 |
|------|------|
| `/zh` · `/en` | 首页（默认进入 `/zh`） |
| `/zh/experience` · `/en/experience` | 完整经历 |
| `/zh/projects/fbe-dtc` | DTC 独立站案例 |
| `/zh/projects/hypit-shorts` | Hypit 短视频预告 |
| `/zh/projects/creator-platform` | 达人平台预告 |

## 内容修改

- 站点常量：`src/content/site.ts`
- 作品：`src/content/projects.ts`
- 经历：`src/content/experience.ts`
- UI 文案：`messages/zh.json` · `messages/en.json`
