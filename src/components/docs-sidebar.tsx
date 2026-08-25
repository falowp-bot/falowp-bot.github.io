"use client";

import { Accordion } from "@heroui/react/accordion";
import { Drawer } from "@heroui/react/drawer";
import { BookOpenText, ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { docsNavigation } from "@/lib/docs-navigation";

function groupFor(path: string) {
  return docsNavigation.findIndex((group, index) => index === 0
    ? path === "/docs" || group.prefixes.some((prefix) => path.startsWith(prefix))
    : group.prefixes.some((prefix) => path.startsWith(prefix)));
}

function Navigation({ currentPath, onNavigate }: { currentPath: string; onNavigate?: () => void }) {
  const currentGroup = useMemo(() => Math.max(0, groupFor(currentPath)), [currentPath]);

  return <Accordion
    aria-label="文档分组"
    className="docs-nav-accordion"
    defaultExpandedKeys={[String(currentGroup)]}
    variant="default"
  >
    {docsNavigation.map(({ title, icon: Icon, items }, index) => <Accordion.Item id={String(index)} key={title}>
      <Accordion.Heading>
        <Accordion.Trigger>
          <span className="docs-nav-group-label"><span className="docs-nav-group-icon"><Icon className="size-4" /></span>{title}</span>
          <Accordion.Indicator />
        </Accordion.Trigger>
      </Accordion.Heading>
      <Accordion.Panel>
        <Accordion.Body>
          <nav className="docs-nav-links">{items.map(({ href, label }) => {
            const active = currentPath === href;
            return <Link key={href} href={href} onClick={onNavigate} aria-current={active ? "page" : undefined} className={`docs-nav-link ${active ? "docs-nav-link-active" : ""}`}>
              <span>{label}</span><ChevronRight className="size-3.5" />
            </Link>;
          })}</nav>
        </Accordion.Body>
      </Accordion.Panel>
    </Accordion.Item>)}
  </Accordion>;
}

export function DocsSidebar({ currentPath }: { currentPath: string }) {
  return <>
    <Drawer>
      <Drawer.Trigger className="docs-mobile-trigger"><Menu className="size-4" />浏览文档</Drawer.Trigger>
      <Drawer.Backdrop variant="blur">
        <Drawer.Content placement="left" className="docs-mobile-drawer">
          <Drawer.Dialog>
            {({ close }) => <>
              <Drawer.Header>
                <Drawer.Heading>文档目录</Drawer.Heading>
                <Drawer.CloseTrigger />
              </Drawer.Header>
              <Drawer.Body><Navigation key={currentPath} currentPath={currentPath} onNavigate={close} /></Drawer.Body>
            </>}
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>

    <aside className="docs-sidebar" aria-label="文档导航">
      <div className="docs-sidebar-heading"><span className="docs-sidebar-heading-icon"><BookOpenText className="size-4" /></span><span>文档目录</span></div>
      <Navigation key={currentPath} currentPath={currentPath} />
    </aside>
  </>;
}
