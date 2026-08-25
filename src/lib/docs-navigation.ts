import type { LucideIcon } from "lucide-react";
import { BookOpen, Bot, Boxes, Cable, Compass } from "lucide-react";

export type DocsNavItem = { href: string; label: string };
export type DocsNavGroup = { title: string; icon: LucideIcon; prefixes: string[]; items: DocsNavItem[] };

export const docsNavigation: DocsNavGroup[] = [
  { title: "快速开始", icon: Compass, prefixes: ["/docs/getting-started", "/docs/configuration"], items: [
    { href: "/docs", label: "文档首页" }, { href: "/docs/getting-started/installation", label: "安装与启动" },
    { href: "/docs/getting-started/first-plugin", label: "创建插件" }, { href: "/docs/configuration", label: "配置文件" },
  ]},
  { title: "开发指南", icon: Bot, prefixes: ["/docs/system"], items: [
    { href: "/docs/system", label: "核心概念" }, { href: "/docs/system/message-matching", label: "消息处理" },
    { href: "/docs/system/events", label: "事件" }, { href: "/docs/system/hooks", label: "Hook" },
    { href: "/docs/system/scheduling", label: "定时任务" }, { href: "/docs/system/help", label: "帮助系统" },
  ]},
  { title: "平台接入", icon: Cable, prefixes: ["/docs/adapters"], items: [
    { href: "/docs/adapters", label: "适配器概览" }, { href: "/docs/adapters/napcat", label: "NapCat" },
    { href: "/docs/adapters/official-qq", label: "QQ 官方机器人" }, { href: "/docs/adapters/telegram", label: "Telegram" },
  ]},
  { title: "功能扩展", icon: Boxes, prefixes: ["/docs/plugins", "/docs/utilities", "/docs/tools"], items: [
    { href: "/docs/plugins", label: "官方插件" }, { href: "/docs/plugins/user-auth", label: "用户与权限" },
    { href: "/docs/utilities/database", label: "数据库" }, { href: "/docs/plugins/ai", label: "AI 对话" },
    { href: "/docs/plugins/bilibili", label: "Bilibili" }, { href: "/docs/utilities", label: "服务组件" },
  ]},
  { title: "参考", icon: BookOpen, prefixes: ["/docs/tutorials", "/docs/reference"], items: [
    { href: "/docs/tutorials/production-plugin", label: "完整插件示例" }, { href: "/docs/reference/troubleshooting", label: "排错参考" },
  ]},
];

const hiddenSearchPages: DocsNavItem[] = [
  { href: "/docs/getting-started/architecture", label: "启动流程" }, { href: "/docs/system/plugin-lifecycle", label: "插件生命周期" },
  { href: "/docs/system/receive-message", label: "接收消息" }, { href: "/docs/system/send-message", label: "发送消息" },
  { href: "/docs/tools/config-resources", label: "配置与资源" }, { href: "/docs/tools/web", label: "WebClient 与 WebServer" },
  { href: "/docs/tools/webdriver", label: "Webdriver" }, { href: "/docs/tools/cache-json-image", label: "缓存、JSON 与图片" },
  { href: "/docs/plugins/community", label: "社区功能" }, { href: "/docs/tools", label: "基础工具" },
  { href: "/docs/utilities/minio", label: "MinIO" }, { href: "/docs/utilities/services", label: "审核、翻译与桌面" },
];

export const docsSearchPages = [
  ...docsNavigation.flatMap((group) => group.items.map((item) => ({ ...item, group: group.title }))),
  ...hiddenSearchPages.map((item) => ({ ...item, group: "详细参考" })),
];
