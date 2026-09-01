'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

type Phase = {
  id: string;
  number: string;
  title: string;
  state: 'Complete' | 'In progress' | 'Next' | 'Later';
  summary: string;
  detail: string;
};

const phases: Phase[] = [
  { id: 'discovery', number: '01', title: 'Discovery', state: 'Complete', summary: 'Finding, screening, and organising the reading universe.', detail: '542 candidate results were reviewed and a 140-source catalogue was created.' },
  { id: 'ingestion', number: '02', title: 'Ingestion', state: 'In progress', summary: 'Turning lawful source material into reviewable records.', detail: 'This is the active phase. Each source is extracted once, mapped into sections, and checked before it enters the evidence record.' },
  { id: 'evidence', number: '03', title: 'Evidence', state: 'Next', summary: 'Comparing verified source-level findings across themes.', detail: 'This phase will test agreements, disagreements, limitations, and boundary conditions across multiple sources.' },
  { id: 'treatise', number: '04', title: 'Treatise', state: 'Later', summary: 'Writing the source-linked public guide.', detail: 'Writing begins after there is enough verified material to make cross-source claims responsibly.' },
];

export function ProjectProgress() {
  const [selectedId, setSelectedId] = useState('ingestion');
  const selected = phases.find((phase) => phase.id === selectedId) ?? phases[1];

  return (
    <section className="project-progress frame section-rule" aria-labelledby="progress-heading">
      <div className="section-label">Research progress</div>
      <div className="project-progress__body">
        <h2 id="progress-heading">Where the project is now.</h2>
        <p className="project-progress__intro">The project moves from a reading universe to verified evidence, then to cross-source synthesis. Select a stage to see what it means.</p>
        <div className="progress-stages" aria-label="Project stages">
          {phases.map((phase) => (
            <Button
              aria-pressed={phase.id === selected.id}
              className="progress-stage"
              key={phase.id}
              onClick={() => setSelectedId(phase.id)}
              type="button"
              variant="ghost"
            >
              <span>{phase.number}</span><strong>{phase.title}</strong><em>{phase.state}</em>
            </Button>
          ))}
        </div>
        <div className="progress-detail" aria-live="polite">
          <div><span className={`tag progress-state progress-state--${selected.state.toLowerCase().replaceAll(' ', '-')}`}>{selected.state}</span><h3>{selected.title}</h3><p>{selected.detail}</p></div>
          {selected.id === 'ingestion' ? <div className="ingestion-progress"><div className="ingestion-progress__heading"><span>Essential sources entered</span><strong>25 of 43</strong></div><div className="ingestion-meter" aria-label="25 of 43 essential sources have entered the workflow"><span style={{ width: '58.14%' }} /></div><div className="ingestion-stats"><p><strong>23</strong><span>machine-readable sources processed</span></p><p><strong>2</strong><span>image-only sources in the OCR backlog</span></p><p><strong>18</strong><span>essential sources yet to enter a corpus stage</span></p><p><strong>132</strong><span>reviewed evidence cards so far</span></p></div></div> : <div className="phase-summary"><p>{selected.summary}</p><span>Not a project completion score</span></div>}
        </div>
      </div>
    </section>
  );
}
