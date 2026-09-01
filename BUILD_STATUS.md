# Build status

Last updated: 1 September 2026

## Completed in the first build

- Separate public-site workspace created, with no private research artifacts included.
- Runtime migrated from the Cloudflare-only Vinext/Sites scaffold to standard Next.js App Router for Vercel.
- `vercel.json` explicitly overrides the former Vite framework and `dist` output-directory settings.
- App routes: Home, Research, Method, Sources, Contribute, Corrections, Privacy, journal entries, and 404.
- Warm field-journal design system with responsive layouts and reduced-motion support.
- Public 140-source metadata snapshot generated from the approved catalogue, with state labels derived from project status records.
- Source search, four filters, DOI copying, and lawful canonical links.
- Share-preview image and global social metadata.
- Vercel-compatible production build passes.

## Decisions still needed before a public launch

- Confirm the production domain (`virality.vineet.cc` is the current recommendation).
- Confirm the contribution email address and GitHub issue-tracker URL.
- Confirm LinkedIn, X, RSS, and public-repository destinations.
- Review every public research sentence and complete the independent launch audit.
