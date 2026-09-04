import Link from 'next/link';
import { HeroNetwork } from '@/components/hero-network';
import { ProjectProgress } from '@/components/project-progress';
import { ReadingNow } from '@/components/reading-now';

const questions = [
  'Why do people voluntarily pass some information along?',
  'How does an idea move between social groups?',
  'Is adopting a product different from sharing a story?',
  'Where do people end and algorithms begin?',
];

export default function Home() {
  return (
    <main>
      <div className="status-strip"><div className="frame status-strip__inner"><span className="status-dot" /><p><strong>Now exploring how things spread through people and networks</strong><span aria-hidden="true"> · </span>Updated 1 September 2026</p><Link href="/research">Open the notebook <span aria-hidden="true">→</span></Link></div></div>
      <header className="site-header frame"><Link className="wordmark" href="/">Virality <span>Research</span></Link><nav aria-label="Primary navigation"><Link href="/research">Notebook</Link><Link href="/sources">Library</Link><Link href="/contribute">Improve the record</Link></nav></header>
      <section className="hero frame"><div className="hero__eyebrow">A public learning project</div><div className="hero__grid"><div className="hero__statement"><h1>What makes <span aria-hidden="true" className="hero__rotator"><span className="hero__rotator-track"><span>information</span><span>ideas</span><span>behaviours</span><span>culture</span><span>products</span><span>information</span></span></span><span className="sr-only"> information, ideas, behaviours, culture, and products </span>spread?</h1></div><HeroNetwork /></div></section>
      <section className="origin frame section-rule"><div className="section-label">Origin</div><div className="origin__content"><h2>A familiar mystery, examined carefully.</h2><p>I build products and write online. Like most people who make things, I hope the work will occasionally reach the people it is for. Usually it doesn’t travel very far.</p><p>Once a LinkedIn post of mine reached roughly 200,000 views. I still couldn’t say exactly why. At first, I thought the answer was simply algorithmic opacity.</p><p>But I started noticing that some songs, games, phrases, and stories had travelled between childhoods and communities long before digital feeds existed, while others didn’t. That suggests there may be fundamentals to virality beyond channel-specific nuances.</p><p>I’m going to read books and research papers on this topic and see if I can find them.</p></div></section>
      <ReadingNow />
      <ProjectProgress />
      <section className="questions frame section-rule"><div className="section-label">The inquiry</div><div className="questions__body"><h2>Four questions hold the work together.</h2><div className="question-grid">{questions.map((question, index) => <article key={question}><span>0{index + 1}</span><p>{question}</p></article>)}</div><Link className="text-link" href="/research">Explore the current questions <span aria-hidden="true">→</span></Link></div></section>
      <section className="participation frame section-rule"><div className="section-label">Take part</div><div className="participation__body"><h2>Help make the inquiry better.</h2><div className="participation__cards"><article><span className="card-number">01</span><h3>Share an observation or question</h3><p>Tell me about something you have seen travel through a community, childhood, product, or feed.</p><Link href="/contribute#observation">Share thoughtfully <span aria-hidden="true">→</span></Link></article><article><span className="card-number">02</span><h3>Improve the research</h3><p>Suggest a primary source, offer contrary evidence, or flag an error in the public record.</p><Link href="/contribute#research">Contribute to the record <span aria-hidden="true">→</span></Link></article></div></div></section>
      <footer className="site-footer frame"><p>Virality Research · A living public learning project by Vineet.</p><div><Link href="/research#updates">Updates</Link><Link href="/privacy">Privacy</Link></div></footer>
    </main>
  );
}
