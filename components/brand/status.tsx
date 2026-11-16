import { Ban } from 'lucide-react';
import { cn } from '@/lib/cn';

export type StatusState = 'live' | 'unavailable';

const base =
  'helios-badge inline-flex items-center gap-1.5 rounded-[20px] px-2.5 py-0.5 align-middle font-label text-[11px] font-bold uppercase leading-[1.3] tracking-[0.08em] not-prose';

/**
 * Availability badge. Meaning is carried by the text label, the shape
 * (filled / dashed outline / solid outline) and an icon, never by hue alone.
 * No green, no blue.
 */
export function Status({
  state = 'live',
  className,
}: {
  state?: StatusState;
  className?: string;
}) {
  if (state === 'unavailable') {
    return (
      <span
        className={cn(
          base,
          'border border-solid border-fd-muted-foreground text-fd-muted-foreground',
          className,
        )}
      >
        <Ban aria-hidden className="size-3" />
        <span className="sr-only">Status: </span>
        Not available
      </span>
    );
  }
  return (
    <span
      className={cn(base, 'bg-fd-foreground text-fd-background', className)}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-fd-background" />
      <span className="sr-only">Status: </span>
      Live
    </span>
  );
}
