import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Corrections & Updates',
  description: 'Corrections and updates to the Virality Research public record.',
};

export default function CorrectionsPage() { redirect('/research#updates'); }
