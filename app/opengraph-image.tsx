import { renderOg } from '@/lib/og';
import { ogSize } from '@/lib/site';

export const runtime = 'nodejs';
export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'Helios documentation';

export default function OpenGraphImage() {
  return renderOg({ title: 'Helios Documentation', kicker: 'Docs' });
}
