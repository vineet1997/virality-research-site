import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '@/components/site-header';
import { NotebookPage } from '@/components/notebook-page';

export const metadata: Metadata = {
  title: 'Research Notebook',
  description: 'Source-linked reading notes, evidence records, and open questions from Virality Research.',
  openGraph: { title: 'Research Notebook', description: 'Source-linked reading notes, evidence records, and open questions from Virality Research.' },
};

export default function ResearchPage() { return <><SiteHeader /><NotebookPage /><SiteFooter /></>; }
