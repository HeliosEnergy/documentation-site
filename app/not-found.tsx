import Link from 'next/link';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { Kicker } from '@/components/brand/kicker';
import { baseOptions, homeLinks } from '@/lib/layout.shared';

export const metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <HomeLayout {...baseOptions({ kicker: true })} links={homeLinks}>
      <div
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-[88rem] px-6 py-24 md:px-8"
      >
        <Kicker>Error 404</Kicker>
        <h1 className="mt-4 max-w-3xl text-balance font-heading text-[clamp(2.25rem,1.5rem+3.5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.03em]">
          This page does not exist
        </h1>
        <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-fd-muted-foreground">
          The link may be out of date, or the page may have moved. Start from
          the docs home, or contact support.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/docs" className="helios-btn helios-btn--primary">
            Read docs
          </Link>
          <Link href="/docs/support" className="helios-btn helios-btn--outline">
            Support
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
}
