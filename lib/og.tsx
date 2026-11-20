import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ogSize } from '@/lib/site';

/**
 * Brand card: black canvas, white lockup, one orange rule. System sans is used
 * because next/og cannot load WOFF2 and the brand TTFs are not in the repo.
 */
export async function renderOg({
  title,
  kicker,
}: {
  title: string;
  kicker: string;
}) {
  const logo = await readFile(
    join(process.cwd(), 'public/logos/logo-white.png'),
  );
  const shown = title.length > 70 ? `${title.slice(0, 67)}...` : title;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#000000',
          color: '#FAFAFA',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${logo.toString('base64')}`}
          height={56}
          width={219}
          alt="Helios logo"
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#A1A1A1',
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              maxWidth: 1000,
            }}
          >
            {shown}
          </div>
        </div>
        <div style={{ height: 4, width: 96, background: '#FF9147' }} />
      </div>
    ),
    ogSize,
  );
}
