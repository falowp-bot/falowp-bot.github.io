import { SiteHeader } from "@/components/site-header";
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <div className="docs-shell site-shell"><SiteHeader />{children}</div>;
}
