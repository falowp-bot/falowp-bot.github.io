# falowp-bot-docs

小花落官方网站与帮助文档，发布地址为 <https://falowp-bot.github.io/>。

## 技术栈

- Next.js 16
- React 19
- HeroUI 3
- Fumadocs Core + MDX
- Tailwind CSS 4
- TypeScript 6

## 本地开发

```bash
pnpm install
pnpm dev
```

## 检查与构建

```bash
pnpm lint
pnpm typecheck
pnpm build
```

静态站点输出到 `out/`，可直接部署到 GitHub Pages。

## 文档版本

站点从 `NEXT_PUBLIC_FALOWP_VERSION` 读取统一版本标记。本地构建可直接设置该变量；GitHub Pages 从仓库变量 `FALOWP_VERSION` 注入。正文中的 Gradle 示例统一读取项目的 `falowpVersion` 属性。
