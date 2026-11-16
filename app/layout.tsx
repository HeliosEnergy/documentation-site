import '@/app/global.css';
import type { Metadata, Viewport } from 'next';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter, Space_Grotesk, Space_Mono } from 'next/font/google';
import { SiteFooter } from '@/components/brand/site-footer';
import { SITE, absoluteUrl, siteUrl } from '@/lib/site';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
const grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});
const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-space-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    url: '/',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FBFAF9' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

// Minimal structured data: only facts already public on helios.co.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.company}/#organization`,
      name: 'Helios Cloud Inc.',
      url: SITE.company,
    },
    {
      '@type': 'WebSite',
      '@id': `${absoluteUrl('/')}#website`,
      name: SITE.title,
      url: absoluteUrl('/'),
      publisher: { '@id': `${SITE.company}/#organization` },
    },
  ],
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${grotesk.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <RootProvider>
          <div className="flex flex-1 flex-col">{children}</div>
          <SiteFooter />
        </RootProvider>
      </body>
    </html>
  );
}
