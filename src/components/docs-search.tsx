"use client";

import { Button } from "@heroui/react/button";
import { Kbd } from "@heroui/react/kbd";
import { AlignLeft, FileText, Hash, LoaderCircle, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import type { SortedResult } from "fumadocs-core/search";
import { useDocsSearch } from "fumadocs-core/search/client";
import { staticClient } from "fumadocs-core/search/client/orama-static";
import { docsSearchPages as pages } from "@/lib/docs-navigation";

const searchClient = staticClient({ from: "/api/search.json" });

function SearchText({ children }: { children: string }) {
  const value = children
    .replace(/<(?!\/?mark\b)[^>]+>/gi, "")
    .replace(/\\([`*_{}\[\]()#+\-.!])/g, "$1")
    .replace(/[`*_~]/g, "");

  return value.split(/(<mark>.*?<\/mark>)/gi).map((part, index) => {
    const match = part.match(/^<mark>(.*?)<\/mark>$/i);
    return match ? <mark key={index}>{match[1]}</mark> : part;
  });
}

function ResultIcon({ type }: { type: SortedResult["type"] }) {
  if (type === "heading") return <Hash className="size-4" />;
  if (type === "text") return <AlignLeft className="size-4" />;
  return <FileText className="size-4" />;
}

export function DocsSearch() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { search: query, setSearch: setQuery, query: searchQuery } = useDocsSearch({ client: searchClient, delayMs: 80 });
  const hasQuery = query.trim().length > 0;
  const results = hasQuery && !searchQuery.isLoading && Array.isArray(searchQuery.data) ? searchQuery.data.slice(0, 12) : [];
  const quickLinks = hasQuery ? [] : pages.slice(0, 8);
  const resultCount = hasQuery ? results.length : quickLinks.length;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.key === "/" || (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey))) && !(event.target instanceof HTMLInputElement)) {
        event.preventDefault(); setOpen(true);
      }
      if (event.key === "Escape") {
        setOpen(false);
        setQuery("");
        setActiveIndex(0);
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setQuery]);

  useEffect(() => { if (open) requestAnimationFrame(() => inputRef.current?.focus()); }, [open]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  useEffect(() => {
    resultsRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const close = () => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };
  const go = (href: string) => { close(); router.push(href); };
  const move = (direction: 1 | -1) => {
    if (!resultCount) return;
    setActiveIndex((index) => (index + direction + resultCount) % resultCount);
  };
  const activeHref = hasQuery ? results[activeIndex]?.url : quickLinks[activeIndex]?.href;

  const dialog = open ? createPortal(<div className="search-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
    <section className="search-dialog" role="dialog" aria-modal="true" aria-label="搜索文档">
      <div className="search-input-row"><Search className="size-4" /><input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }} onKeyDown={(event) => {
        if (event.key === "ArrowDown") { event.preventDefault(); move(1); }
        if (event.key === "ArrowUp") { event.preventDefault(); move(-1); }
        if (event.key === "Enter" && activeHref) { event.preventDefault(); go(activeHref); }
      }} placeholder="搜索标题、正文或 API" aria-label="搜索标题、正文或 API" /><button onClick={close} aria-label="关闭搜索"><X className="size-4" /></button></div>
      <div className="search-results" ref={resultsRef} aria-live="polite">
        {!hasQuery && <><div className="search-section-label">常用文档</div>{quickLinks.map((page, index) => <button key={page.href} data-index={index} data-active={index === activeIndex} onMouseEnter={() => setActiveIndex(index)} onClick={() => go(page.href)}><span className="search-result-icon"><FileText className="size-4" /></span><span className="search-result-copy"><strong>{page.label}</strong><small>{page.group}</small></span></button>)}</>}
        {hasQuery && searchQuery.isLoading && !results.length && <div className="search-state"><LoaderCircle className="size-4 animate-spin" />正在搜索文档</div>}
        {hasQuery && !searchQuery.isLoading && searchQuery.error && <div className="search-state search-state-error">搜索索引加载失败，请稍后重试</div>}
        {hasQuery && !searchQuery.isLoading && !searchQuery.error && !results.length && <div className="search-state"><Search className="size-5" /><strong>没有找到相关内容</strong><small>可以尝试模块名、API 名称或更短的关键词</small></div>}
        {hasQuery && results.length > 0 && <><div className="search-section-label"><span>搜索结果</span><small>{results.length} 条</small></div>{results.map((result, index) => <button key={result.id} data-index={index} data-active={index === activeIndex} onMouseEnter={() => setActiveIndex(index)} onClick={() => go(result.url)}>
          <span className="search-result-icon"><ResultIcon type={result.type} /></span>
          <span className="search-result-copy">
            {result.breadcrumbs?.length ? <small className="search-result-path">{result.breadcrumbs.join(" / ")}</small> : null}
            <strong><SearchText>{result.content}</SearchText></strong>
          </span>
          <small className="search-result-kind">{result.type === "page" ? "页面" : result.type === "heading" ? "章节" : "正文"}</small>
        </button>)}</>}
      </div>
      <footer>
        <span><Kbd><Kbd.Abbr keyValue="up" /><Kbd.Abbr keyValue="down" /></Kbd>选择</span>
        <span><Kbd><Kbd.Abbr keyValue="enter" /></Kbd>打开</span>
        <span><Kbd><Kbd.Abbr keyValue="escape" /></Kbd>关闭</span>
      </footer>
    </section>
  </div>, document.body) : null;
  return <>
    <Button ref={triggerRef} className="docs-search-trigger" onPress={() => setOpen(true)} aria-label="搜索文档" size="sm" variant="tertiary">
      <Search className="size-4" /><span>搜索文档</span><Kbd><Kbd.Abbr keyValue="command" /><Kbd.Content>K</Kbd.Content></Kbd>
    </Button>
    {dialog}
  </>;
}
