/**
 * Single source for site-wide URLs and boilerplate.
 *
 * TODO: set NEXT_PUBLIC_SITE_URL to the production origin before launch.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://documentation.heliosenergy.io'
).replace(/\/+$/, '');

export const SITE = {
  name: 'Helios Docs',
  title: 'Helios Documentation',
  url: siteUrl,
  description:
    'Documentation for the Helios console: bare metal GPU access, Jupyter notebooks, AI inference and API, wallet and billing, accounts and support.',
  company: 'https://www.helios.co',
  pricing: 'https://www.helios.co/pricing',
  terms: 'https://www.helios.co/tnc',
  contact: 'https://www.helios.co/contact',
  console: 'https://console.helios.co/',
  github: 'https://github.com/HeliosEnergy/documentation-site',
  githubBranch: 'main',
  boilerplate:
    'Helios builds GPU cloud clusters and high-density colocation for AI workloads.',
} as const;

/** Absolute URL for a site path. */
export function absoluteUrl(path = '/') {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Open Graph image size. */
export const ogSize = { width: 1200, height: 630 } as const;
