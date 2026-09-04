import sources from '@/data/public-sources.json';
import { SiteFooter, SiteHeader } from '@/components/site-header';
import { LibraryIntro } from '@/components/library-intro';
import { SourceLibrary, type SourceRecord } from '@/components/source-library';

export default function SourcesPage() { return <><SiteHeader /><main className="frame library-page"><p className="kicker">Library / public source shelf</p><h1 className="page-title">The library.</h1><p className="page-intro">The books, papers, reviews, and cases behind the work—kept public as a shelf to explore, not as proof of a finished answer.</p><LibraryIntro /><section className="source-note"><span className="tag">How to read a source</span><p><strong>Evidence reviewed</strong> means source-level material has been verified against the original. It does not mean the project has published a cross-source conclusion. <strong>Metadata only</strong> means the catalogue record is public, while full-text claims are not available. <strong>Deferred</strong> records await suitable processing.</p></section><SourceLibrary sources={sources as SourceRecord[]} /></main><SiteFooter /></>; }
