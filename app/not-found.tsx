import Link from 'next/link';
import { SiteFooter, SiteHeader } from '@/components/site-header';

export default function NotFound() { return <><SiteHeader /><main className="frame page not-found"><p className="kicker">Record not found / 404</p><h1 className="page-title">This page has not entered the record.</h1><p className="page-intro">Try the research journal, the method, or the source catalogue.</p><Link className="button button--ink" href="/">Return home →</Link></main><SiteFooter /></>; }
