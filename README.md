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

页面和依赖示例中的版本号统一使用 `${VERSION}` 占位，发布文档时不需要配置额外的版本变量。
