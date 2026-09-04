import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Research Method',
  description: 'How Virality Research builds a careful, source-linked public record.',
};

export default function MethodPage() { redirect('/research'); }
