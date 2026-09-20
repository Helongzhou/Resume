export const siteConfig = {
  name: {
    zh: "周何龙",
    en: "Helong Zhou",
  },
  title: {
    zh: "全栈开发 · 前端架构",
    en: "Full-Stack · Frontend Architecture",
  },
  email: "zhouhlwork@foxmail.com",
  github: "https://github.com/Helongzhou",
  githubLabel: "Helongzhou",
  location: {
    zh: "广州 · 深圳",
    en: "Guangzhou · Shenzhen",
  },
  yearsExperience: 12,
} as const;

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}
