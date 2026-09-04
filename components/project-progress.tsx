'use client';

import { useState } from 'react';

type Stage = {
  id: string;
  number: string;
  title: string;
  detail: string;
  state: 'Complete' | 'Current' | 'Next' | 'Later';
  panelTitle: string;
  panelBody: string;
  facts: Array<{ value: string; label: string }>;
};

const stages: Stage[] = [
  {
    id: 'field', number: '01', title: 'Map the field', detail: '542 leads reviewed · 140 sources catalogued', state: 'Complete',
    panelTitle: 'Discovering everything written on virality and then shortlisting some to read.',
    panelBody: 'It creates a reading universe broad enough to challenge the usual viral-post explanations but small enough for me to actually go through it.',
    facts: [{ value: '542', label: 'candidate leads reviewed' }, { value: '140', label: 'sources catalogued' }, { value: '30', label: 'books on the long-form shelf' }],
  },
  {
    id: 'records', number: '02', title: 'Build source records', detail: 'Read, extract, check, and retain the limits of each source.', state: 'Current',
    panelTitle: 'Turn the reading into a record that can be questioned.',
    panelBody: 'Each source is extracted once, mapped into its relevant sections, and checked before it can inform the wider analysis.',
    facts: [{ value: '25 / 43', label: 'essential sources entered' }, { value: '132', label: 'source-level evidence cards reviewed' }, { value: '18', label: 'essential sources still to enter' }],
  },
  {
    id: 'evidence', number: '03', title: 'Compare the evidence', detail: 'Look for patterns, disagreements, and conditions across sources.', state: 'Next',
    panelTitle: 'Ask what remains true when sources are put beside each other.',
    panelBody: 'This stage looks for agreement, disagreement, limitations, and boundary conditions. It keeps causal findings separate from correlations, practitioner frameworks, and anecdotes.',
    facts: [{ value: 'Across', label: 'different disciplines and media' }, { value: 'Against', label: 'contrary and null findings' }, { value: 'With', label: 'limits kept beside the claim' }],
  },
  {
    id: 'guides', number: '04', title: 'Publish the guides', detail: 'Fundamentals that travel, plus channel-specific guidance.', state: 'Later',
    panelTitle: 'Make the useful parts public without pretending the answer is final.',
    panelBody: 'The aim is a source-linked treatise, durable fundamentals of virality, and channel-specific guides that make clear where platforms and contexts change the answer.',
    facts: [{ value: 'Fundamentals', label: 'that travel across contexts' }, { value: 'Guides', label: 'for channel-specific conditions' }, { value: 'Sources', label: 'linked back to the record' }],
  },
];

export function ProjectProgress() {
  const [selectedId, setSelectedId] = useState('records');
  const selected = stages.find((stage) => stage.id === selectedId) ?? stages[1];

  return (
    <section className="project-progress frame section-rule" aria-labelledby="progress-heading">
      <div className="section-label">Project status</div>
      <div className="project-progress__body">
        <h2 id="progress-heading">My flow from mapping the ecosystem to reading all the shortlisted sources and beyond.</h2>
        <div className="research-route__guide" id="research-route-help"><span>Research flow</span><b aria-hidden="true">01 → 02 → 03 → 04</b></div>
        <div aria-describedby="research-route-help" className="research-route" role="tablist" aria-label="Research stages">
          {stages.map((stage) => (
            <button
              aria-controls={`stage-panel-${stage.id}`}
              aria-selected={stage.id === selected.id}
              className={`research-route__stage${stage.id === selected.id ? ' research-route__stage--selected' : ''}`}
              id={`stage-tab-${stage.id}`}
              key={stage.number}
              onClick={() => setSelectedId(stage.id)}
              role="tab"
              type="button"
            >
              <span className="research-route__number">{stage.number}</span>
              <div><strong>{stage.title}</strong><p>{stage.detail}</p></div>
              <em>{stage.state}</em>
            </button>
          ))}
        </div>
        <div aria-labelledby={`stage-tab-${selected.id}`} className="current-work" id={`stage-panel-${selected.id}`} role="tabpanel">
          <div><span className="tag">Selected stage / {selected.state}</span><h3>{selected.panelTitle}</h3><p>{selected.panelBody}</p></div>
          <dl className="current-work__stats">
            {selected.facts.map((fact) => <div key={fact.value}><dt>{fact.value}</dt><dd>{fact.label}</dd></div>)}
          </dl>
        </div>
      </div>
    </section>
  );
}
