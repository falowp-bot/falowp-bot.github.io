"use client";

import { Button } from "@heroui/react/button";
import { Kbd } from "@heroui/react/kbd";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { docsSearchPages as pages } from "@/lib/docs-navigation";

export function DocsSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const results = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase("zh-CN");
    return keyword ? pages.filter((page) => `${page.group} ${page.label}`.toLocaleLowerCase("zh-CN").includes(keyword)) : pages.slice(0, 8);
  }, [query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.key === "/" || (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey))) && !(event.target instanceof HTMLInputElement)) {
        event.preventDefault(); setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => { if (open) requestAnimationFrame(() => inputRef.current?.focus()); }, [open]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  const go = (href: string) => { setOpen(false); setQuery(""); setActiveIndex(0); router.push(href); };
  const dialog = open ? createPortal(<div className="search-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
    <section className="search-dialog" role="dialog" aria-modal="true" aria-label="搜索文档">
      <div className="search-input-row"><Search className="size-4" /><input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }} onKeyDown={(event) => {
        if (event.key === "ArrowDown") { event.preventDefault(); setActiveIndex((index) => Math.min(index + 1, results.length - 1)); }
        if (event.key === "ArrowUp") { event.preventDefault(); setActiveIndex((index) => Math.max(index - 1, 0)); }
        if (event.key === "Enter" && results[activeIndex]) { event.preventDefault(); go(results[activeIndex].href); }
      }} placeholder="搜索文档" /><button onClick={() => setOpen(false)} aria-label="关闭搜索"><X className="size-4" /></button></div>
      <div className="search-results">{results.length ? results.map((page, index) => <button key={page.href} data-active={index === activeIndex} onMouseEnter={() => setActiveIndex(index)} onClick={() => go(page.href)}><span>{page.label}</span><small>{page.group}</small></button>) : <p>没有找到相关页面</p>}</div>
      <footer><span><Kbd><Kbd.Abbr keyValue="up" /><Kbd.Abbr keyValue="down" /></Kbd> 选择</span><span><Kbd><Kbd.Abbr keyValue="enter" /></Kbd> 打开</span><span><Kbd><Kbd.Abbr keyValue="escape" /></Kbd> 关闭</span></footer>
    </section>
  </div>, document.body) : null;
  return <>
    <Button className="docs-search-trigger" onPress={() => setOpen(true)} aria-label="搜索文档" size="sm" variant="tertiary">
      <Search className="size-4" /><span>搜索文档</span><Kbd><Kbd.Abbr keyValue="command" /><Kbd.Content>K</Kbd.Content></Kbd>
    </Button>
    {dialog}
  </>;
}
