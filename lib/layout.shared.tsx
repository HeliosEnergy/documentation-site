import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { LinkItemType } from 'fumadocs-ui/layouts/docs';
import { Logo } from '@/components/brand/logo';
import { SITE } from '@/lib/site';

/** Persistent primary call to action. The label is dark ink on the CTA fill (contrast), see global.css. */
export function ConsoleLoginLink({ className = '' }: { className?: string }) {
  return (
    <a
      href={SITE.console}
      rel="noopener"
      className={`helios-btn helios-btn--primary helios-btn--sm ${className}`}
    >
      Console login
    </a>
  );
}

function GitHubIcon() {
  return (
    <svg role="img" aria-hidden viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const githubLink: LinkItemType = {
  type: 'icon',
  url: SITE.github,
  label: 'Helios documentation on GitHub',
  text: 'GitHub',
  icon: <GitHubIcon />,
  external: true,
};

/** Home header links. Every destination exists. The solid CTA is last. */
export const homeLinks: LinkItemType[] = [
  { type: 'main', text: 'Docs', url: '/docs', active: 'nested-url' },
  { type: 'main', text: 'Pricing', url: SITE.pricing, external: true },
  { type: 'main', text: 'Support', url: '/docs/support', active: 'nested-url' },
  githubLink,
  { type: 'custom', secondary: true, children: <ConsoleLoginLink /> },
];

/** Docs layout links (shown in the sidebar and the mobile menu). */
export const docsLinks: LinkItemType[] = [
  { type: 'main', text: 'Pricing', url: SITE.pricing, external: true },
  githubLink,
];

export function baseOptions({
  kicker = false,
}: { kicker?: boolean } = {}): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Logo />
          {kicker && <span className="kicker ms-3 hidden sm:inline">Docs</span>}
        </>
      ),
      url: '/',
    },
    links: [],
  };
}

/**
 * Docs: the nav children render in the sidebar header (too narrow for logo + CTA at 268px)
 * and in the mobile top bar, so the header copy is mobile-only. On desktop the CTA lives in
 * the sidebar banner (see docsSidebarBanner).
 */
export function docsNav(): BaseLayoutProps['nav'] {
  return {
    ...baseOptions().nav,
    children: <ConsoleLoginLink className="ms-3 md:hidden" />,
  };
}

export const docsSidebarBanner = (
  <ConsoleLoginLink className="w-full" />
);
