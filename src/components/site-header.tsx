"use client";

import { Separator } from "@heroui/react/separator";
import { Surface } from "@heroui/react/surface";
import { Toolbar } from "@heroui/react/toolbar";
import { buttonVariants } from "@heroui/styles";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { DocsSearch } from "./docs-search";

function GitHubIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4 18 4.3 18 4.3c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v4.3c0 .4.2.7.8.6A12 12 0 0 0 12 .3Z" /></svg>;
}

export function SiteHeader() {
  const pathname = usePathname();
  const pluginActive = pathname.startsWith("/docs/plugins");
  const docsActive = pathname.startsWith("/docs") && !pluginActive;

  return <header className="site-header">
    <Surface variant="default" className="site-header-surface">
      <Toolbar className="site-header-toolbar" aria-label="网站导航">
        <div className="header-primary">
          <Link href="/" className="brand-link"><span className="brand-mark"><Sparkles className="size-5" /></span><span className="brand-copy"><strong>小花落</strong></span></Link>
          <nav className="desktop-nav" aria-label="主导航">
            <Link className="header-nav-link" data-active={docsActive} href="/docs">文档</Link>
            <Link className="header-nav-link" data-active={pluginActive} href="/docs/plugins">插件</Link>
          </nav>
        </div>

        <div className="header-actions">
          <DocsSearch />
          <Separator className="header-separator" orientation="vertical" />
          <a className={buttonVariants({ variant: "ghost", size: "sm", isIconOnly: true })} href="https://github.com/falowp-bot" target="_blank" rel="noreferrer" aria-label="打开 GitHub 项目"><GitHubIcon className="size-4" /></a>
          <ThemeToggle />
        </div>
      </Toolbar>
    </Surface>
  </header>;
}
