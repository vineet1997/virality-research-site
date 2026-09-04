import Link from 'next/link';

export function SiteHeader() {
  return <><div className="status-strip"><div className="frame status-strip__inner"><span className="status-dot" /><p><strong>Now exploring how things spread through people and networks</strong><span aria-hidden="true"> · </span>Updated 1 September 2026</p><Link href="/research">Open the notebook <span aria-hidden="true">→</span></Link></div></div><header className="site-header frame"><Link className="wordmark" href="/">Virality <span>Research</span></Link><nav aria-label="Primary navigation"><Link href="/research">Notebook</Link><Link href="/sources">Library</Link><Link href="/contribute">Improve the record</Link></nav></header></>;
}

export function SiteFooter() {
  return <footer className="site-footer frame"><p>Virality Research · A living public learning project by Vineet.</p><div><Link href="/research#updates">Updates</Link><Link href="/privacy">Privacy</Link></div></footer>;
}
