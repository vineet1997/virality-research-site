'use client';

import { useMemo, useState, type CSSProperties } from 'react';

import { NativeSelect } from '@/components/ui/native-select';

type NoteScope = 'empirical' | 'conceptual' | 'platform';

type ReadingNote = {
  id: string;
  kind: string;
  source: { id: string; title: string; url: string };
  scope: NoteScope;
  title: string;
  text: string;
};

const readingNotes: ReadingNote[] = [
  {
    id: '14',
    kind: 'Randomized field experiment',
    source: { id: 'S073', title: 'Selection Effects in Online Sharing', url: 'https://doi.org/10.1145/2482540.2482604' },
    scope: 'empirical',
    title: 'Quality per share and total reach can point in opposite directions.',
    text: 'Voluntary shares were slightly more effective per exposed peer, but automatic sharing produced far more total downstream claims because everyone shared. The setting was Facebook Offers, not general product adoption.',
  },
  {
    id: '13',
    kind: 'Randomized field experiment',
    source: { id: 'S070', title: 'Creating Social Contagion Through Viral Product Design', url: 'https://doi.org/10.1287/mnsc.1110.1421' },
    scope: 'empirical',
    title: 'A feature can win on volume even when it loses on conversion.',
    text: 'Personal invitations converted better per message, while automated broadcasts produced more total peer adoption because they happened much more often. The result comes from a short-run Facebook app experiment.',
  },
  {
    id: '12',
    kind: 'Prediction study',
    source: { id: 'S056', title: 'Can Cascades Be Predicted?', url: 'https://doi.org/10.1145/2566486.2567997' },
    scope: 'platform',
    title: 'Early tempo is a strong signal once a cascade has started.',
    text: 'For Facebook photos that had already received a few reshares, recent sharing tempo was especially useful for predicting continued growth. That is a forecasting result, not evidence that speeding a cascade up would cause virality.',
  },
  {
    id: '11',
    kind: 'Observational study',
    source: { id: 'S055', title: 'The Structural Virality of Online Diffusion', url: 'https://doi.org/10.1287/mnsc.2015.2158' },
    scope: 'empirical',
    title: 'Big reach can look like a broadcast or a chain reaction.',
    text: 'A large cascade may be a hub-driven burst or many generations of person-to-person spread. Its size alone does not reveal what kind of diffusion happened.',
  },
  {
    id: '10',
    kind: 'Observational study',
    source: { id: 'S054', title: 'The Structure of Online Diffusion Networks', url: 'https://doi.org/10.1145/2229012.2229058' },
    scope: 'empirical',
    title: 'Most observed cascades stop almost immediately.',
    text: 'Across seven online domains, 73–95% of observed cascades did not diffuse beyond their starting point. Rare spectacular outcomes are a poor picture of ordinary diffusion.',
  },
  {
    id: '09',
    kind: 'Observational study',
    source: { id: 'S052', title: 'The Dynamics of Viral Marketing', url: 'https://doi.org/10.1145/1232722.1232727' },
    scope: 'empirical',
    title: 'More recommendations are not an endlessly compounding lever.',
    text: 'In this retailer referral program, the association between incoming recommendations and purchases varied by product category and appeared to saturate. The incentives and recorded purchases make this an imperfect stand-in for ordinary word of mouth.',
  },
  {
    id: '08',
    kind: 'Theoretical model',
    source: { id: 'S020', title: 'Complex Contagions and the Weakness of Long Ties', url: 'https://doi.org/10.1086/521848' },
    scope: 'conceptual',
    title: 'A bridge needs enough width to carry social reinforcement.',
    text: 'Long ties can help simple contagions travel, yet fail for behaviours that need repeated affirmation. In the model, a bridge’s capacity for reinforcement matters as much as its reach.',
  },
  {
    id: '07',
    kind: 'Critical review',
    source: { id: 'S006', title: 'Innovation Diffusion and New Product Growth Models', url: 'https://doi.org/10.1016/j.ijresmar.2009.12.012' },
    scope: 'conceptual',
    title: '“Social influence” is not one mechanism.',
    text: 'Word of mouth, visible social signals, and network effects can all increase adoption through different routes. Treating them as a single viral force makes it difficult to know what is actually working.',
  },
  {
    id: '06',
    kind: 'Observational study',
    source: { id: 'S022', title: 'Structural Diversity in Social Contagion', url: 'https://doi.org/10.1073/pnas.1116502109' },
    scope: 'empirical',
    title: 'A varied audience can matter more than a large one.',
    text: 'Facebook invitation acceptance tracked the number of distinct social contexts around a recipient better than raw contact count. It is a predictive pattern, not a randomized test of diversity.',
  },
  {
    id: '05',
    kind: 'Quasi-experiment',
    source: { id: 'S029', title: 'Distinguishing Influence-Based Contagion from Homophily-Driven Diffusion', url: 'https://doi.org/10.1073/pnas.0908800106' },
    scope: 'empirical',
    title: 'Similar people can make influence look stronger than it is.',
    text: 'Friends adopting the same product can reflect influence, but also shared preferences and circumstances. In this study, better matching sharply reduced the apparent peer effect; the remainder was still an upper bound.',
  },
  {
    id: '04',
    kind: 'Randomized network experiment',
    source: { id: 'S021', title: 'The Spread of Behavior in an Online Social Network Experiment', url: 'https://doi.org/10.1126/science.1185231' },
    scope: 'empirical',
    title: 'More connections are not automatically better for spread.',
    text: 'For a low-cost registration behaviour, clustered networks spread adoption faster and farther than degree-matched random networks. The simplified experiment was designed to isolate topology, not recreate every real social relationship.',
  },
  {
    id: '03',
    kind: 'Randomized experiments',
    source: { id: 'S031', title: 'What Makes Online Content Viral?', url: 'https://doi.org/10.1509/jmr.10.0353' },
    scope: 'empirical',
    title: 'High-arousal feelings can make a story more shareable.',
    text: 'More amusing or anger-inducing story versions increased stated willingness to share in experiments. Those experiments measured intended sharing, rather than observed transmission in a live network.',
  },
  {
    id: '02',
    kind: 'Observational study',
    source: { id: 'S047', title: 'The Spread of True and False News Online', url: 'https://doi.org/10.1126/science.aap9559' },
    scope: 'empirical',
    title: 'Fast spread is a pattern, not yet an explanation.',
    text: 'In a fact-check-labeled Twitter sample, false stories traveled farther and faster than true stories. The study describes a striking pattern, but does not show that falsity itself caused the difference.',
  },
  {
    id: '01',
    kind: 'Platform case study',
    source: { id: 'S115', title: 'Deep Neural Networks for YouTube Recommendations', url: 'https://doi.org/10.1145/2959100.2959190' },
    scope: 'platform',
    title: 'Distribution systems decide what gets another chance to be seen.',
    text: 'YouTube’s recommender narrowed millions of videos to a few personalized candidates. It shows how ranking shapes exposure, but it is one dated platform architecture—not direct evidence of interpersonal virality.',
  },
];

export function ReadingNotes() {
  const [scope, setScope] = useState<'all' | NoteScope>('all');
  const [order, setOrder] = useState<'newest' | 'oldest'>('newest');

  const visibleNotes = useMemo(() => {
    const filtered = scope === 'all' ? readingNotes : readingNotes.filter((note) => note.scope === scope);
    return order === 'newest' ? filtered : [...filtered].reverse();
  }, [order, scope]);

  const latest = readingNotes[0];

  return (
    <section className="notebook-section notebook-reading-notes" id="updates" aria-labelledby="reading-notes-heading">
      <div className="section-label">Thoughts from the reading</div>
      <div className="notebook-section__body">
        <h2 id="reading-notes-heading">A pile of working notes.</h2>

        <article className="featured-note">
          <div className="featured-note__meta">
            <span>Latest note</span>
            <span>{latest.kind}</span>
            <a href={latest.source.url} rel="noreferrer" target="_blank">{latest.source.id} · {latest.source.title}</a>
          </div>
          <h3>{latest.title}</h3>
          <p>{latest.text}</p>
          <a className="text-link" href={latest.source.url} rel="noreferrer" target="_blank">Open the original source <span aria-hidden="true">↗</span></a>
        </article>

        <div className="note-pile-toolbar">
          <p>Note pile <span>{visibleNotes.length}</span></p>
          <div>
            <label>
              Show
              <NativeSelect aria-label="Filter reading notes" onChange={(event) => setScope(event.target.value as 'all' | NoteScope)} size="sm" value={scope}>
                <option value="all">All notes</option>
                <option value="empirical">Empirical studies</option>
                <option value="conceptual">Models &amp; reviews</option>
                <option value="platform">Platform cases</option>
              </NativeSelect>
            </label>
            <label>
              Sort
              <NativeSelect aria-label="Sort reading notes" onChange={(event) => setOrder(event.target.value as 'newest' | 'oldest')} size="sm" value={order}>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </NativeSelect>
            </label>
          </div>
        </div>

        <div className="note-pile" aria-live="polite">
          {visibleNotes.map((note, index) => (
            <article className="note-slip" key={note.id} style={{ '--note-index': index } as CSSProperties}>
              <div className="note-slip__meta">
                <span>{note.id}</span>
                <span>{note.kind}</span>
                <a href={note.source.url} rel="noreferrer" target="_blank">{note.source.id} · {note.source.title}</a>
              </div>
              <h3>{note.title}</h3>
              <p>{note.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
