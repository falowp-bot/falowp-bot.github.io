import { Alert } from "@heroui/react/alert";
import { Breadcrumbs } from "@heroui/react/breadcrumbs";
import { Chip } from "@heroui/react/chip";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsSidebar } from "@/components/docs-sidebar";
import { source } from "@/lib/source";
import { siteConfig } from "@/lib/site-config";

type PageProps = { params: Promise<{ slug?: string[] }> };
const mdxComponents = {
  Callout: ({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "warning" | "success" }) => <Alert className="callout" status={type === "info" ? "default" : type}><Alert.Indicator /><Alert.Content>{children}</Alert.Content></Alert>,
  Lead: ({ children }: { children: React.ReactNode }) => <p className="docs-lead">{children}</p>,
  Version: () => <Chip size="sm" variant="soft" className="version-badge"><Chip.Label>文档版本 {siteConfig.docsVersion}</Chip.Label></Chip>,
};

export function generateStaticParams() { return source.generateParams(); }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug ?? []);
  return page ? { title: page.data.title, description: page.data.description } : {};
}

export default async function DocsPage({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug ?? []);
  if (!page) notFound();
  const MDX = page.data.body;
  const currentPath = `/docs${slug?.length ? `/${slug.join("/")}` : ""}`;
  return <div className="docs-layout"><DocsSidebar currentPath={currentPath} /><article className="docs-article">
    <div className="docs-breadcrumb-row"><Breadcrumbs><Breadcrumbs.Item href="/docs">文档</Breadcrumbs.Item>{currentPath !== "/docs" && <Breadcrumbs.Item>{page.data.title}</Breadcrumbs.Item>}</Breadcrumbs></div>
    <MDX components={mdxComponents} />
  </article>
    <aside className="docs-toc"><p className="docs-nav-title">本页内容</p>{page.data.toc.map((item) => <a key={item.url} href={item.url}>{item.title}</a>)}</aside>
  </div>;
}
