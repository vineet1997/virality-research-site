import Image from 'next/image';
import Link from 'next/link';
import { ReadingNotes } from '@/components/reading-notes';

export function NotebookPage() {
  return (
    <main className="frame notebook-page">
      <p className="kicker">Notebook / live research</p>
      <h1 className="page-title">The work in progress.</h1>
      <p className="page-intro">A public record of what I am reading, what it is making clearer, and where the answer is still not ready.</p>

      <section className="notebook-now" aria-labelledby="current-thread">
        <div>
          <span className="tag tag--amber">Current thread</span>
          <h2 id="current-thread">How people, networks, and products shape spread.</h2>
          <p>Economic diffusion, referral mechanisms, seeding, and platform network effects are often collapsed into one story about growth. This batch tests where that story holds—and where it does not.</p>
        </div>
        <div className="notebook-now__next">
          <span>Next meaningful gate</span>
          <p>Finish a bounded source batch before publishing a comparison note.</p>
        </div>
      </section>

      <section className="notebook-section" aria-labelledby="source-note-heading">
        <div className="section-label">From the reading</div>
        <div className="notebook-section__body">
          <h2 id="source-note-heading">One source at a time.</h2>
          <article className="notebook-source-note">
            <div className="notebook-source-note__cover"><Image alt="Cover of Diffusion of Innovations, Fifth Edition by Everett M. Rogers" height={760} src="/reading/diffusion-of-innovations.jpg" width={472} /></div>
            <div>
              <p className="tag">Source #011 · Reading now</p>
              <h3><em>Diffusion of Innovations</em><span>Everett M. Rogers · 2003</span></h3>
              <p>A foundational account of how new ideas move through communication channels, over time, within social systems.</p>
              <p className="notebook-source-note__note"><strong>Working note:</strong> spread is not a property of a message alone. It is shaped by people, relationships, and the setting around them.</p>
              <div className="notebook-source-note__links"><a className="text-link" href="https://www.simonandschuster.com/books/Diffusion-of-Innovations-5th-Edition/Everett-M-Rogers/9780743222099" rel="noreferrer" target="_blank">Read the source <span aria-hidden="true">↗</span></a><Link className="text-link" href="/sources">See it in the library <span aria-hidden="true">→</span></Link></div>
            </div>
          </article>
        </div>
      </section>

      <ReadingNotes />

    </main>
  );
}
