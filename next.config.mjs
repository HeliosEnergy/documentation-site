import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** Redirects for URLs that moved, so existing links keep working. */
const oldSlugRedirects = [
  ['/docs/workspaces', '/docs/accounts/organizations-and-workspaces'],
  ['/docs/dashboard', '/docs/getting-started/console-tour'],
  ['/docs/deployments', '/docs/reference/product-status'],
  ['/docs/docker', '/docs/reference/product-status'],
  ['/docs/troubleshooting', '/docs/support/troubleshooting'],
  ['/docs/placeholders', '/docs'],
  ['/docs/test', '/docs'],
];

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Clickjacking: no framing. A frame-ancestors-only CSP does not restrict scripts or styles.
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      // Raw Markdown for any page: /docs/billing.mdx and the docs root /docs.mdx
      {
        source: '/docs.mdx',
        destination: '/llms.mdx',
      },
      {
        source: '/docs/:path*.mdx',
        destination: '/llms.mdx/:path*',
      },
    ];
  },
  async redirects() {
    return oldSlugRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default withMDX(config);
