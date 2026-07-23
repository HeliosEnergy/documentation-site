import Image from 'next/image';

/**
 * Official Helios wordmark. Swaps black/white by theme (Fumadocs sets
 * `.dark` on <html>). Aspect ratio ~3.9:1 (source is 4000x1024).
 */
export function HeliosWordmark() {
  return (
    <span className="inline-flex items-center" aria-label="Helios">
      <Image
        src="/logos/logo-black.png"
        alt="Helios"
        width={4000}
        height={1024}
        priority
        className="block h-[26px] w-auto dark:hidden"
      />
      <Image
        src="/logos/logo-white.png"
        alt="Helios"
        width={4000}
        height={1024}
        priority
        className="hidden h-[26px] w-auto dark:block"
      />
    </span>
  );
}
