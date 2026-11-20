import { notFound } from 'next/navigation';
import { renderOg } from '@/lib/og';
import { source } from '@/lib/source';

export const runtime = 'nodejs';
export const revalidate = false;

export function generateStaticParams() {
  return source.generateParams();
}

/** Per-page Open Graph image: /og/<docs slug>. An empty slug is the docs overview. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();
  return renderOg({ title: page.data.title, kicker: 'Helios Docs' });
}


