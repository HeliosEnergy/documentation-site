import type { SVGProps } from 'react';

/**
 * Helios sun mark — a solar disc with a corona aperture.
 * Uses currentColor so it inherits the solar primary in context.
 */
export function HeliosMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <radialGradient id="helios-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-solar-300)" />
          <stop offset="70%" stopColor="var(--color-solar-500)" />
          <stop offset="100%" stopColor="var(--color-solar-700)" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="6.5" fill="url(#helios-core)" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.9">
        <line x1="16" y1="2.5" x2="16" y2="6.5" />
        <line x1="16" y1="25.5" x2="16" y2="29.5" />
        <line x1="2.5" y1="16" x2="6.5" y2="16" />
        <line x1="25.5" y1="16" x2="29.5" y2="16" />
        <line x1="6.4" y1="6.4" x2="9.2" y2="9.2" />
        <line x1="22.8" y1="22.8" x2="25.6" y2="25.6" />
        <line x1="25.6" y1="6.4" x2="22.8" y2="9.2" />
        <line x1="9.2" y1="22.8" x2="6.4" y2="25.6" />
      </g>
    </svg>
  );
}

export function HeliosWordmark() {
  return (
    <span className="inline-flex items-center gap-2 font-semibold text-fd-foreground">
      <HeliosMark className="size-[22px] text-fd-primary" />
      <span className="text-[15px] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
        Helios
      </span>
    </span>
  );
}
