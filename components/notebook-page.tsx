import Image from 'next/image';
import Link from 'next/link';
import { ReadingNotes } from '@/components/reading-notes';
import researchStatus from '@/data/research-status.json';

export function NotebookPage() {
  return (
    <main className="frame notebook-page">
      <p className="kicker">Notebook / live research</p>
      <h1 className="page-title">The work in progress.</h1>
      <p className="page-intro">A public record of what I am reading, what it is making clearer, and where the answer is still not ready.</p>

      <section className="notebook-now" aria-labelledby="current-thread">
        <div>
          <span className="tag tag--amber">Current thread</span>
          <h2 id="current-thread">{researchStatus.currentThread}.</h2>
          <p>The latest batch covers {researchStatus.recentPapers} papers and {researchStatus.recentChapters} chapters from {researchStatus.recentBooks} books: influencer models, referral acquisition, seeding, adoption attributes, and the move from standalone tools to networks.</p>
          <p>{researchStatus.reviewedCards} evidence cards reviewed · {researchStatus.essentialReviewed} of {researchStatus.essentialSources} essential sources have reviewed evidence · updated {researchStatus.updatedLabel}.</p>
        </div>
        <div className="notebook-now__next">
          <span>Next meaningful gate</span>
          <p>Test which seeding findings transfer from low-risk information sharing to adoption that needs social reinforcement. Three scanned sources still await OCR.</p>
        </div>
      </section>

      <section className="notebook-section" aria-labelledby="source-note-heading">
        <div className="section-label">From the reading</div>
        <div className="notebook-section__body">
          <h2 id="source-note-heading">One source at a time.</h2>
          <article className="notebook-source-note">
            <div className="notebook-source-note__cover"><Image alt="Cover of Diffusion of Innovations, Fifth Edition by Everett M. Rogers" height={760} src="/reading/diffusion-of-innovations.jpg" width={472} /></div>
            <div>
              <p className="tag">Source #011 · Chapter 6 reviewed</p>
              <h3><em>Diffusion of Innovations</em><span>Everett M. Rogers · 2003</span></h3>
              <p>A foundational account of how new ideas move through communication channels, over time, within social systems.</p>
              <p className="notebook-source-note__note"><strong>Working note:</strong> the potential adopter’s perceived advantage and fit matter in Rogers’ framework. Chapter 6 also cautions against explaining adoption only through innovations that already succeeded. This is scholarly synthesis, with its cited studies still needing separate evaluation.</p>
              <div className="notebook-source-note__links"><a className="text-link" href="https://www.simonandschuster.com/books/Diffusion-of-Innovations-5th-Edition/Everett-M-Rogers/9780743222099" rel="noreferrer" target="_blank">Read the source <span aria-hidden="true">↗</span></a><Link className="text-link" href="/sources">See it in the library <span aria-hidden="true">→</span></Link></div>
            </div>
          </article>
        </div>
      </section>

      <ReadingNotes />

    </main>
  );
}
