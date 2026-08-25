import { Card, CardContent, CardFooter, CardHeader } from "@heroui/react/card";
import { Chip } from "@heroui/react/chip";
import { buttonVariants } from "@heroui/styles";
import { ArrowRight, Bot, Braces, Check, CircleCheck, Clock3, MessageCircleMore, Plug, Send, Zap } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site-config";

const platforms = [
  { label: "NapCat", icon: Bot },
  { label: "QQ 官方", icon: MessageCircleMore },
  { label: "Telegram", icon: Send },
];

const shortcuts = [
  { label: "消息处理", href: "/docs/system/message-matching", icon: MessageCircleMore },
  { label: "事件与 Hook", href: "/docs/system/hooks", icon: Zap },
  { label: "定时任务", href: "/docs/system/scheduling", icon: Clock3 },
  { label: "平台接入", href: "/docs/adapters", icon: Plug },
];

export default function Home() {
  return <div className="site-shell home-shell">
    <SiteHeader />
    <main className="home-main">
      <section className="home-viewport">
        <div className="home-hero-copy">
          <Chip size="md" variant="soft" className="home-kicker"><span className="home-kicker-dot" /><Chip.Label>小花落开发文档</Chip.Label></Chip>
          <h1 className="hero-title">从一条消息，<span>构建完整机器人。</span></h1>
          <p className="home-hero-description">统一消息、事件、Hook、任务与平台适配，在清晰的 Kotlin 开发模型中完成机器人能力。</p>
          <div className="home-hero-actions">
            <Link href="/docs" className={buttonVariants({ variant: "primary", size: "lg" })}>开始阅读 <ArrowRight className="size-4" /></Link>
            <Link href="/docs/plugins" className={buttonVariants({ variant: "secondary", size: "lg" })}>浏览插件</Link>
          </div>
          <div className="home-meta"><span><Check className="size-3.5" />Java 25</span><span><Check className="size-3.5" />Kotlin 2.x</span><span><Check className="size-3.5" />Apache-2.0</span></div>
          <nav className="home-shortcuts" aria-label="常用文档">
            {shortcuts.map(({ label, href, icon: Icon }) => <Link key={href} href={href}><span><Icon className="size-4" /></span><strong>{label}</strong><ArrowRight className="size-3.5" /></Link>)}
          </nav>
        </div>

        <Card className="home-preview" variant="default">
          <CardHeader className="preview-header">
            <div className="preview-title"><span><Braces className="size-4" /></span><div><small>第一个插件</small><strong>HelloPlugin.kt</strong></div></div>
            <Chip color="success" size="sm" variant="soft"><CircleCheck className="size-3.5" /><Chip.Label>就绪</Chip.Label></Chip>
          </CardHeader>
          <CardContent className="preview-editor p-0">
            <div className="editor-line"><span /><span /><span /><small>Kotlin</small></div>
            <pre><code><span className="code-muted">01</span>  <span className="code-purple">message</span>(<span className="code-green">&quot;你好，小花落&quot;</span>) {`{\n`}<span className="code-muted">02</span>    <span className="code-blue">reply</span>(<span className="code-green">&quot;嗯，收到啦。&quot;</span>){`\n`}<span className="code-muted">03</span>  {`}`} {`\n\n`}<span className="code-muted">04</span>  <span className="code-purple">implementation</span>({`\n`}<span className="code-muted">05</span>    <span className="code-green">&quot;falowp-bot-system:{siteConfig.docsVersion}&quot;</span>{`\n`}<span className="code-muted">06</span>  )</code></pre>
          </CardContent>
          <CardFooter className="preview-footer">{platforms.map(({ label, icon: Icon }) => <span key={label}><Icon className="size-3.5" />{label}</span>)}</CardFooter>
        </Card>
      </section>
    </main>
  </div>;
}
