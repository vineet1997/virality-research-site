import type { Metadata, Viewport } from 'next';
import { DM_Mono, DM_Sans, Instrument_Serif } from 'next/font/google';
import './globals.css';
import './home.css';
import './workspace.css';

const display = Instrument_Serif({ variable: '--font-display', subsets: ['latin'], weight: '400' });
const sans = DM_Sans({ variable: '--font-sans', subsets: ['latin'], weight: ['400', '500', '700'] });
const mono = DM_Mono({ variable: '--font-mono', subsets: ['latin'], weight: ['400', '500'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://virality.vineet.cc'),
  title: { default: 'What Makes Things Spread? · Virality Research', template: '%s · Virality Research' },
  description: 'A public, source-linked research project investigating why information, ideas, culture, and products spread.',
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: ['/favicon.svg'],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Virality Research',
    title: 'What makes things spread?',
    description: 'A public, source-linked research project investigating why information, ideas, culture, and products spread.',
    images: [{ url: '/og-whatsapp.jpg', width: 1200, height: 630, type: 'image/jpeg', alt: 'Virality Research — an illustrated network spreading across paper.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What makes things spread?',
    description: 'A public, source-linked research project investigating why information, ideas, culture, and products spread.',
    images: ['/og-whatsapp.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#173f36',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
