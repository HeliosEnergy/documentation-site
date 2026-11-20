import { cn } from '@/lib/cn';

/** "Last verified" stamp. The date is a claim: only set it after checking the page against the product. */
export function LastVerified({
  date,
  className,
}: {
  date: string;
  className?: string;
}) {
  const d = new Date(`${date}T00:00:00Z`);
  const valid = !Number.isNaN(d.getTime());
  // Fixed locale and UTC avoid hydration mismatches.
  const text = valid
    ? d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
      })
    : date;
  return (
    <p className={cn('kicker not-prose mt-8', className)}>
      Last verified{' '}
      {valid ? <time dateTime={date}>{text}</time> : <span>{text}</span>}
    </p>
  );
}
