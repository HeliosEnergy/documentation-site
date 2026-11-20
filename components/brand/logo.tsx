import Image from 'next/image';
import { cn } from '@/lib/cn';

const RATIO = 4000 / 1024;

/**
 * Helios lockup. Two images swapped by theme; the hidden one is display:none,
 * so assistive tech exposes a single "Helios logo".
 */
export function Logo({
  height = 24,
  className,
}: {
  height?: number;
  className?: string;
}) {
  const width = Math.round(height * RATIO);
  const style = { height, width: 'auto' } as const;
  return (
    <span className={cn('inline-flex shrink-0 items-center', className)}>
      <Image
        src="/logos/logo-black.png"
        alt="Helios logo"
        width={width}
        height={height}
        style={style}
        className="shrink-0 dark:hidden"
      />
      <Image
        src="/logos/logo-white.png"
        alt="Helios logo"
        width={width}
        height={height}
        style={style}
        className="hidden shrink-0 dark:block"
      />
    </span>
  );
}
