import Link from 'next/link';
import { Logo } from './logo';
import { SITE } from '@/lib/site';

const cols = [
  {
    head: 'Docs',
    links: [
      { label: 'Overview', href: '/docs' },
      { label: 'Getting started', href: '/docs/getting-started' },
      { label: 'Support', href: '/docs/support' },
    ],
  },
  {
    head: 'Helios',
    links: [
      { label: 'helios.co', href: SITE.company, external: true },
      { label: 'Terms', href: SITE.terms, external: true },
      { label: 'Contact', href: SITE.contact, external: true },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer border-t border-fd-border bg-fd-background">
      <div className="mx-auto flex w-full max-w-[88rem] flex-col gap-10 px-6 py-12 md:flex-row md:justify-between md:px-8">
        <div className="max-w-sm">
          <Logo height={24} />
          <p className="mt-4 text-sm text-fd-muted-foreground">
            {SITE.boilerplate}
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-10">
          {cols.map((c) => (
            <div key={c.head}>
              <p className="kicker mb-3">{c.head}</p>
              <ul className="space-y-1 text-sm">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {'external' in l ? (
                      <a
                        href={l.href}
                        rel="noopener"
                        className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-fd-border">
        <p className="kicker mx-auto w-full max-w-[88rem] px-6 py-4 md:px-8">
          &copy; {new Date().getFullYear()} Helios Cloud Inc.
        </p>
      </div>
    </footer>
  );
}
