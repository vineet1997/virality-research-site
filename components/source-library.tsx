'use client';

import { useMemo, useState } from 'react';
import { Check, Copy, ExternalLink, Shuffle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { NativeSelect } from '@/components/ui/native-select';

export type SourceRecord = { id: string; title: string; authors: string; year: number; venue: string; sourceType: string; topic: string; whyItMatters: string; url: string; doi: string | null; state: string; accessNote: string; lastReviewed: string | null; };

type ViewMode = 'gallery' | 'list';
type Collection = 'all' | 'start';

const foundationalIds = new Set(['S002', 'S006', 'S011', 'S013', 'S014', 'S017', 'S018', 'S020', 'S021', 'S031', 'S047', 'S070']);
const pathways = [
  { label: 'Why people share', query: 'sharing' },
  { label: 'Networks & cascades', query: 'network' },
  { label: 'Referral loops', query: 'referral' },
  { label: 'Algorithms & attention', query: 'algorithm' },
];

function posterTheme(topic: string) {
  if (/(network|cascade|threshold|contagion|tie)/i.test(topic)) return 'source-poster--network';
  if (/(referral|growth|product|adoption|platform strategy)/i.test(topic)) return 'source-poster--growth';
  if (/(algorithm|attention|feed|discovery|search)/i.test(topic)) return 'source-poster--algorithm';
  if (/(emotion|content|identity|meme|message)/i.test(topic)) return 'source-poster--sharing';
  return 'source-poster--field';
}

export function SourceLibrary({ sources }: { sources: SourceRecord[] }) {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('All topics');
  const [type, setType] = useState('All types');
  const [state, setState] = useState('All states');
  const [period, setPeriod] = useState('Any period');
  const [collection, setCollection] = useState<Collection>('all');
  const [view, setView] = useState<ViewMode>('gallery');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const topics = useMemo(() => [...new Set(sources.map((source) => source.topic))].sort(), [sources]);
  const types = useMemo(() => [...new Set(sources.map((source) => source.sourceType))].sort(), [sources]);
  const filtered = useMemo(() => sources.filter((source) => {
    const value = [source.title, source.authors, source.topic, source.venue, source.whyItMatters, source.doi ?? '', source.id].join(' ').toLowerCase();
    const matchesPeriod = period === 'Any period' || (period === '2020–2026' && source.year >= 2020) || (period === '2000–2019' && source.year >= 2000 && source.year < 2020) || (period === 'Before 2000' && source.year < 2000);
    return value.includes(query.toLowerCase())
      && (collection === 'all' || foundationalIds.has(source.id))
      && (topic === 'All topics' || source.topic === topic)
      && (type === 'All types' || source.sourceType === type)
      && (state === 'All states' || source.state === state)
      && matchesPeriod;
  }), [sources, query, collection, topic, type, state, period]);

  const selected = sources.find((source) => source.id === selectedId) ?? null;
  const hasFilters = query || topic !== 'All topics' || type !== 'All types' || state !== 'All states' || period !== 'Any period' || collection !== 'all';

  function choosePath(nextQuery: string) {
    setCollection('all');
    setQuery(nextQuery);
    setSelectedId(null);
  }

  function clearFilters() {
    setQuery('');
    setTopic('All topics');
    setType('All types');
    setState('All states');
    setPeriod('Any period');
    setCollection('all');
    setSelectedId(null);
  }

  function surpriseMe() {
    const pool = filtered.length ? filtered : sources;
    const currentIndex = pool.findIndex((source) => source.id === selectedId);
    setSelectedId(pool[(currentIndex + 1) % pool.length].id);
    setView('gallery');
  }

  async function copy(value: string, id: string) {
    await navigator.clipboard.writeText(value);
    setCopied(id);
    window.setTimeout(() => setCopied(null), 1800);
  }

  return (
    <div className="source-library">
      <div className="source-explorer-intro">
        <div>
          <p className="source-explorer-intro__label">Find a way in</p>
          <p>Browse the collection as a visual shelf, take a question-led path, or switch to a compact research list.</p>
        </div>
        <button className="source-surprise" onClick={surpriseMe} type="button"><Shuffle size={14} /> Surprise me</button>
      </div>

      <div className="source-controls">
        <div className="search-label">
          <span>Search the library</span>
          <Input value={query} onChange={(event) => { setCollection('all'); setQuery(event.target.value); }} placeholder="Title, author, topic, DOI—or “networks”, “referrals”, “algorithms”…" />
        </div>
        <div className="source-paths" aria-label="Browse by research question">
          <button aria-pressed={collection === 'start'} onClick={() => { setCollection('start'); setQuery(''); setSelectedId(null); }} type="button">Start here <span>12 foundations</span></button>
          {pathways.map((path) => <button aria-pressed={collection === 'all' && query === path.query} key={path.label} onClick={() => choosePath(path.query)} type="button">{path.label}</button>)}
        </div>
        <div className="filter-grid">
          <NativeSelect aria-label="Filter by topic" value={topic} onChange={(event) => setTopic(event.target.value)}><option>All topics</option>{topics.map((item) => <option key={item}>{item}</option>)}</NativeSelect>
          <NativeSelect aria-label="Filter by source type" value={type} onChange={(event) => setType(event.target.value)}><option>All types</option>{types.map((item) => <option key={item}>{item}</option>)}</NativeSelect>
          <NativeSelect aria-label="Filter by research state" value={state} onChange={(event) => setState(event.target.value)}><option>All states</option>{['Catalogued', 'Evidence reviewed', 'Metadata only', 'Deferred'].map((item) => <option key={item}>{item}</option>)}</NativeSelect>
          <NativeSelect aria-label="Filter by publication period" value={period} onChange={(event) => setPeriod(event.target.value)}><option>Any period</option><option>2020–2026</option><option>2000–2019</option><option>Before 2000</option></NativeSelect>
        </div>
      </div>

      <div className="source-library__toolbar">
        <p className="result-count">{filtered.length} {filtered.length === 1 ? 'source' : 'sources'} {collection === 'start' ? 'in the starting shelf' : 'shown'}</p>
        <div className="source-view-toggle" aria-label="Choose library view">
          <button aria-pressed={view === 'gallery'} onClick={() => setView('gallery')} type="button">Gallery</button>
          <button aria-pressed={view === 'list'} onClick={() => setView('list')} type="button">List</button>
          {hasFilters && <button className="source-clear" onClick={clearFilters} type="button">Clear filters</button>}
        </div>
      </div>

      {selected && (
        <aside className="source-spotlight" aria-label={'Selected source: ' + selected.title}>
          <div><span className="tag">Source spotlight</span><span>{selected.id} · {selected.sourceType} · {selected.year}</span></div>
          <h2>{selected.title}</h2>
          <p>{selected.whyItMatters}</p>
          <div><button onClick={() => setSelectedId(null)} type="button">Close</button><a href={selected.url} rel="noreferrer" target="_blank">Open original source <ExternalLink size={14} /></a></div>
        </aside>
      )}

      {view === 'gallery' && filtered.length > 0 && (
        <div className="source-gallery">
          {filtered.map((source) => (
            <article className={['source-poster', posterTheme(source.topic), selectedId === source.id ? 'source-poster--selected' : ''].filter(Boolean).join(' ')} key={source.id}>
              <div className="source-poster__meta"><span>{source.id}</span><span>{source.state}</span></div>
              <div className="source-poster__body">
                <p>{source.sourceType} · {source.year}</p>
                <h2>{source.title}</h2>
                <p className="source-poster__authors">{source.authors}</p>
              </div>
              <div className="source-poster__foot"><span>{source.topic}</span><button onClick={() => setSelectedId(source.id)} type="button">{selectedId === source.id ? 'In view' : 'Why this source'}</button></div>
            </article>
          ))}
        </div>
      )}

      {view === 'list' && filtered.length > 0 && (
        <div className="source-results">
          {filtered.map((source) => (
            <article className="source-card" key={source.id}>
              <div className="source-card__meta"><span>{source.id}</span><span className={'state state--' + source.state.toLowerCase().replaceAll(' ', '-')}>{source.state}</span></div>
              <h2>{source.title}</h2>
              <p className="source-card__authors">{source.authors} · {source.year}</p>
              <p className="source-card__venue">{source.venue} · {source.sourceType} · {source.topic}</p>
              <p className="source-card__why">{source.whyItMatters}</p>
              <div className="source-card__foot"><span>{source.accessNote}</span><div>{source.doi && <button className="copy-button" onClick={() => copy(source.doi!, source.id)} aria-label={'Copy DOI for ' + source.title}>{copied === source.id ? <Check size={14} /> : <Copy size={14} />} {copied === source.id ? 'Copied' : 'DOI'}</button>}<a href={source.url} rel="noreferrer" target="_blank">Open source <ExternalLink size={14} /></a></div></div>
            </article>
          ))}
        </div>
      )}

      {filtered.length === 0 && <div className="empty-state"><h2>Nothing matches that path yet.</h2><p>Try another question, clear a filter, or search by author, title, topic, or DOI.</p><button className="text-link" onClick={clearFilters} type="button">Show the full library →</button></div>}
    </div>
  );
}
