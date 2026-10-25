import Image from 'next/image';
import Link from 'next/link';
import readingUpdate from '@/data/reading-update.json';

export function ReadingNow() {
  const latest = readingUpdate[0];
  return (
    <section className="reading-now frame section-rule" aria-labelledby="reading-now-heading">
      <div className="section-label">From the desk</div>
      <div className="reading-now__body">
        <h2 id="reading-now-heading">Recently on the desk.</h2>
        <article className="reading-now__card">
          <div className="reading-now__cover">
            <Image alt="Cover of Diffusion of Innovations, Fifth Edition by Everett M. Rogers" height={760} priority src="/reading/diffusion-of-innovations.jpg" width={472} />
          </div>
          <div className="reading-now__source">
            <p className="reading-now__eyebrow">Source #011 · Chapter 6 reviewed</p>
            <h3><em>Diffusion of Innovations</em><span>Fifth edition</span></h3>
            <p className="reading-now__meta">Everett M. Rogers · 2003 · Book</p>
            <p className="reading-now__why">The latest reading looks at perceived product advantage, fit, trial, and visible results, alongside selected chapters from Andrew Chen’s The Cold Start Problem.</p>
            <a className="text-link" href="https://www.simonandschuster.com/books/Diffusion-of-Innovations-5th-Edition/Everett-M-Rogers/9780743222099" rel="noreferrer" target="_blank">Read the source <span aria-hidden="true">↗</span></a>
          </div>
          <div className="reading-now__note">
            <div className="reading-now__note-meta">
              <span>Latest note</span>
              <span>{latest.kind}</span>
              <a href={latest.source.url} rel="noreferrer" target="_blank">{latest.source.id} · {latest.source.title}</a>
            </div>
            <h3>{latest.title}</h3>
            <p>{latest.text}</p>
            <Link className="text-link" href="/research#updates">Open the note pile <span aria-hidden="true">→</span></Link>
          </div>
        </article>
      </div>
    </section>
  );
}
