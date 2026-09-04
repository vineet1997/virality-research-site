import Image from 'next/image';
import Link from 'next/link';

export function ReadingNow() {
  return (
    <section className="reading-now frame section-rule" aria-labelledby="reading-now-heading">
      <div className="section-label">From the desk</div>
      <div className="reading-now__body">
        <h2 id="reading-now-heading">Reading now.</h2>
        <article className="reading-now__card">
          <div className="reading-now__cover">
            <Image alt="Cover of Diffusion of Innovations, Fifth Edition by Everett M. Rogers" height={760} priority src="/reading/diffusion-of-innovations.jpg" width={472} />
          </div>
          <div className="reading-now__source">
            <p className="reading-now__eyebrow">Source #011</p>
            <h3><em>Diffusion of Innovations</em><span>Fifth edition</span></h3>
            <p className="reading-now__meta">Everett M. Rogers · 2003 · Book</p>
            <p className="reading-now__why">A foundational account of how new ideas move through communication channels, over time, within social systems.</p>
            <a className="text-link" href="https://www.simonandschuster.com/books/Diffusion-of-Innovations-5th-Edition/Everett-M-Rogers/9780743222099" rel="noreferrer" target="_blank">Read the source <span aria-hidden="true">↗</span></a>
          </div>
          <div className="reading-now__note">
            <div className="reading-now__note-meta">
              <span>Latest note</span>
              <span>Randomized field experiment</span>
              <a href="https://doi.org/10.1145/2482540.2482604" rel="noreferrer" target="_blank">S073 · Selection Effects in Online Sharing</a>
            </div>
            <h3>Quality per share and total reach can point in opposite directions.</h3>
            <p>Voluntary shares were slightly more effective per exposed peer, but automatic sharing produced far more downstream claims because everyone shared.</p>
            <Link className="text-link" href="/research#updates">Open the note pile <span aria-hidden="true">→</span></Link>
          </div>
        </article>
      </div>
    </section>
  );
}
