import Image from 'next/image';

export function LibraryIntro() {
  return (
    <section className="library-feature" aria-labelledby="library-feature-heading">
      <div className="library-feature__cover"><Image alt="Cover of Diffusion of Innovations, Fifth Edition by Everett M. Rogers" height={760} src="/reading/diffusion-of-innovations.jpg" width={472} /></div>
      <div className="library-feature__copy">
        <p className="tag">Chapter 6 reviewed · Source #011</p>
        <h2 id="library-feature-heading"><em>Diffusion of Innovations</em><span>Everett M. Rogers · 2003</span></h2>
        <p>The latest book reading pairs Rogers’ adoption attributes with chapters 3 and 13 of Andrew Chen’s The Cold Start Problem. A chapter review does not mean the whole book has been deep-read. Every library entry links back to the original source.</p>
      </div>
      <div className="library-feature__guide">
        <span>Browse by lens</span>
        <p>Diffusion &amp; adoption<br />Network structure<br />Content sharing<br />Platform effects<br />Attention &amp; media</p>
      </div>
    </section>
  );
}
