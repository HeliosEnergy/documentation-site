import { source } from '@/lib/source';
import { SITE, absoluteUrl } from '@/lib/site';

// Generated at build time and cached.
export const revalidate = false;

export function GET() {
  const pages = [...source.getPages()].sort((a, b) =>
    a.url.localeCompare(b.url),
  );

  const lines = [
    `# ${SITE.title}`,
    '',
    `> ${SITE.description}`,
    '',
    'Each page is also available as plain Markdown by adding .mdx to its URL. The full text of every page is at ' +
      absoluteUrl('/llms-full.txt') +
      '.',
    '',
    '## Pages',
    '',
    ...pages.map((p) => {
      const d = p.data.description ? `: ${p.data.description}` : '';
      return `- [${p.data.title}](${absoluteUrl(p.url)})${d}`;
    }),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
