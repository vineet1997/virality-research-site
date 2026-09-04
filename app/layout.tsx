import type { Metadata } from 'next';
import { DM_Mono, DM_Sans, Instrument_Serif } from 'next/font/google';
import './globals.css';
import './home.css';
import './workspace.css';

const display = Instrument_Serif({ variable: '--font-display', subsets: ['latin'], weight: '400' });
const sans = DM_Sans({ variable: '--font-sans', subsets: ['latin'], weight: ['400', '500', '700'] });
const mono = DM_Mono({ variable: '--font-mono', subsets: ['latin'], weight: ['400', '500'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://virality-research-site.vercel.app'),
  title: { default: 'Virality Research', template: '%s · Virality Research' },
  description: 'A public, source-linked learning project about why some information, ideas, behaviours, culture, and products travel farther and faster than others.',
  openGraph: { title: 'Virality Research', description: 'Why do some things spread? A public, source-linked learning project by Vineet.', images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Why do some things spread? A public learning project by Vineet.' }] },
  twitter: { card: 'summary_large_image', title: 'Virality Research', description: 'Why do some things spread? A public, source-linked learning project by Vineet.', images: ['/og.jpg'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
