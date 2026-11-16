import Link from 'next/link';
import {
  ArrowUpRight,
  Brain,
  CreditCard,
  LifeBuoy,
  Rocket,
  Server,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Kicker } from '@/components/brand/kicker';
import { LastVerified } from '@/components/brand/last-verified';
import { Status, type StatusState } from '@/components/brand/status';
import { SITE } from '@/lib/site';

type PathCluster = {
  kicker: string;
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
  links: [label: string, href: string][];
};

// Slugs are fixed by the information architecture (see content/docs/meta.json).
const clusters: PathCluster[] = [
  {
    kicker: 'Start',
    title: 'Getting started',
    href: '/docs/getting-started',
    description: 'Create an account, add funds to your wallet, and pick a product.',
    icon: Rocket,
    links: [
      ['Create an account', '/docs/getting-started/create-account'],
      ['Console tour', '/docs/getting-started/console-tour'],
      ['Choose a product', '/docs/getting-started/choose-a-product'],
    ],
  },
  {
    kicker: 'Compute',
    title: 'Bare metal',
    href: '/docs/bare-metal',
    description: 'Request access to a full node with your SSH public key.',
    icon: Server,
    links: [
      ['Request bare metal access', '/docs/bare-metal/request-access'],
      ['Connect with SSH', '/docs/bare-metal/connect-with-ssh'],
      ['Jupyter notebooks', '/docs/notebooks'],
    ],
  },
  {
    kicker: 'AI',
    title: 'AI inference and API',
    href: '/docs/inference',
    description: 'Use the model marketplace and playground, or call the API.',
    icon: Brain,
    links: [
      ['Models and budgets', '/docs/inference/models-and-budgets'],
      ['API overview', '/docs/api'],
      ['API keys', '/docs/api/authentication-and-keys'],
    ],
  },
  {
    kicker: 'Accounts',
    title: 'Accounts and access',
    href: '/docs/accounts/organizations-and-workspaces',
    description: 'Organizations, workspaces, members and roles.',
    icon: Users,
    links: [
      ['Users and access', '/docs/accounts/users-and-access'],
      ['Roles', '/docs/accounts/roles'],
    ],
  },
  {
    kicker: 'Billing',
    title: 'Billing and wallet',
    href: '/docs/billing',
    description: 'Fund your wallet and see how each product is billed.',
    icon: CreditCard,
    links: [
      ['Add funds', '/docs/billing/add-funds'],
      ['Minimum balance and budget alerts', '/docs/billing/autopay-and-alerts'],
      ['How usage is billed', '/docs/billing/how-usage-is-billed'],
    ],
  },
  {
    kicker: 'Help',
    title: 'Security and support',
    href: '/docs/support',
    description: 'Guidance for protecting your account, and where to get help.',
    icon: LifeBuoy,
    links: [
      ['Troubleshooting', '/docs/support/troubleshooting'],
      ['FAQ', '/docs/support/faq'],
      ['Security guidance', '/docs/security'],
    ],
  },
];

// A live product shows the Live badge. Other products show a plain note.
const statusItems: {
  name: string;
  state?: StatusState;
  note?: string;
  href: string;
}[] = [
  { name: 'Bare metal B300', state: 'live', href: '/docs/bare-metal' },
  {
    name: 'Jupyter notebooks',
    note: 'Allocation unavailable in the console',
    href: '/docs/notebooks',
  },
  { name: 'AI inference and API', state: 'live', href: '/docs/inference' },
  { name: 'Wallet', state: 'live', href: '/docs/billing' },
  {
    name: 'Reserved GPU clusters',
    note: 'Arranged with the Helios team',
    href: '/docs/bare-metal/reserved-clusters',
  },
  {
    name: 'GB300 NVL72',
    note: 'Contact the Helios team',
    href: '/docs/reference/product-status',
  },
];

export default function HomePage() {
  return (
    <div
      id="main-content"
      tabIndex={-1}
      className="mx-auto w-full max-w-[88rem] px-6 pb-24 md:px-8"
    >
      <section className="pt-16 pb-12 md:pt-24">
        <Kicker>Helios documentation</Kicker>
        <h1 className="mt-4 max-w-4xl text-balance font-heading text-[clamp(2.5rem,1.5rem+4.5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.03em]">
          Documentation for the Helios console
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-fd-muted-foreground md:text-xl">
          Request bare metal GPU access, use AI inference and the API, and
          manage your wallet and team. These pages cover what you can do in
          the console.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/docs"
            className="helios-btn helios-btn--primary helios-btn--glow"
          >
            Read docs
          </Link>
          <a
            href={SITE.contact}
            rel="noopener"
            className="helios-btn helios-btn--outline"
          >
            Talk to our team
          </a>
        </div>
      </section>

      <section aria-labelledby="start" className="grid gap-4 md:grid-cols-2">
        <h2 id="start" className="sr-only">
          Start here
        </h2>
        {[
          {
            k: 'Start',
            t: 'Quickstart',
            d: 'Create an account, add funds to your wallet, and pick a product.',
            h: '/docs/getting-started',
          },
          {
            k: 'Build',
            t: 'API overview',
            d: 'Create an API key and call the inference API.',
            h: '/docs/api',
          },
        ].map((c) => (
          <Link
            key={c.t}
            href={c.h}
            className="helios-card group flex min-h-44 flex-col p-8"
          >
            <Kicker>{c.k}</Kicker>
            <span className="mt-3 font-heading text-3xl font-semibold tracking-[-0.01em]">
              {c.t}
            </span>
            <span className="mt-2 max-w-md text-fd-muted-foreground">
              {c.d}
            </span>
            <ArrowUpRight
              aria-hidden
              className="mt-auto size-6 self-end text-helios-vivid"
            />
          </Link>
        ))}
      </section>

      <section aria-labelledby="paths" className="mt-20">
        <Kicker>Choose your path</Kicker>
        <h2
          id="paths"
          className="mt-3 font-heading text-3xl font-semibold tracking-[-0.01em]"
        >
          Find the right section
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clusters.map(
            ({ kicker, title, href, description, icon: Icon, links }) => (
              <div key={title} className="helios-card flex flex-col p-6">
                <Icon aria-hidden className="size-6 text-helios-vivid" />
                <p className="kicker mt-4">{kicker}</p>
                <h3 className="mt-1 font-heading text-xl font-semibold">
                  <Link
                    href={href}
                    className="underline decoration-fd-primary decoration-[1.5px] underline-offset-4 hover:decoration-2"
                  >
                    {title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-fd-muted-foreground">
                  {description}
                </p>
                <ul className="mt-3 space-y-0.5">
                  {links.map(([label, to]) => (
                    <li key={to}>
                      <Link
                        href={to}
                        className="flex min-h-11 items-center justify-between rounded-xl px-1 text-sm font-medium hover:underline decoration-fd-primary decoration-[1.5px] underline-offset-4"
                      >
                        {label}
                        <ArrowUpRight
                          aria-hidden
                          className="size-4 text-fd-muted-foreground"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          )}
        </div>
      </section>

      <section aria-labelledby="availability" className="helios-card mt-20 p-8">
        <Kicker>Availability</Kicker>
        <h2
          id="availability"
          className="mt-3 font-heading text-2xl font-semibold"
        >
          Product status
        </h2>
        <p className="mt-2 max-w-2xl text-fd-muted-foreground">
          What you can use in the console now, and which products are
          arranged with the Helios team.
        </p>
        <ul className="mt-6 grid gap-x-8 gap-y-1 sm:grid-cols-2">
          {statusItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex min-h-11 items-center justify-between gap-4 border-b border-fd-border py-2 font-medium hover:underline decoration-fd-primary decoration-[1.5px] underline-offset-4"
              >
                {item.name}
                {item.state ? (
                  <Status state={item.state} />
                ) : (
                  <span className="text-right text-sm font-normal text-fd-muted-foreground">
                    {item.note}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            href="/docs/reference/product-status"
            className="inline-flex min-h-11 items-center font-medium underline decoration-fd-primary decoration-[1.5px] underline-offset-4"
          >
            Full product status
          </Link>
          <LastVerified date="2026-11-17" className="mt-0" />
        </div>
      </section>

      <section
        aria-labelledby="support"
        className="mt-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <Kicker>Support</Kicker>
          <h2
            id="support"
            className="mt-3 font-heading text-2xl font-semibold"
          >
            Questions about your account or access
          </h2>
          <p className="mt-2 max-w-xl text-fd-muted-foreground">
            Search the docs first. If you cannot find the answer, the Support
            page explains how to reach the Helios team.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/docs/support" className="helios-btn helios-btn--outline">
            Support
          </Link>
          <Link
            href="/docs/support/troubleshooting"
            className="helios-btn helios-btn--ghost"
          >
            Troubleshooting
          </Link>
        </div>
      </section>
    </div>
  );
}
