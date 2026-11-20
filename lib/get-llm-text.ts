import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { InferPageType } from 'fumadocs-core/source';
import { source } from '@/lib/source';
import { absoluteUrl } from '@/lib/site';

type Page = InferPageType<typeof source>;

async function readRaw(page: Page): Promise<string> {
  const file =
    (page as { absolutePath?: string }).absolutePath ??
    join(process.cwd(), 'content/docs', page.path);
  return readFile(file, 'utf8');
}

function attr(attrs: string, name: string): string | undefined {
  const m = attrs.match(new RegExp(`${name}=(?:"([^"]*)"|'([^']*)'|\\{["'\`]([^"'\`]*)["'\`]\\})`));
  return m?.[1] ?? m?.[2] ?? m?.[3];
}

const CALLOUT_LABEL: Record<string, string> = {
  info: 'Note',
  warn: 'Warning',
  warning: 'Warning',
  error: 'Important',
  success: 'Done',
};

function transformProse(text: string): string {
  let out = text;
  out = out.replace(/^\s*(import|export)\s.+$/gm, '');
  out = out.replace(/<Status\b([^>]*)\/>/g, (_m, a: string) => {
    const s = attr(a, 'state') ?? 'live';
    const label = s === 'unavailable' ? 'Not available' : 'Live';
    return `Status: ${label}`;
  });
  out = out.replace(/<LastVerified\b([^>]*)\/>/g, (_m, a: string) => `Last verified: ${attr(a, 'date') ?? ''}`);
  out = out.replace(/<Callout\b([^>]*)>([\s\S]*?)<\/Callout>/g, (_m, a: string, body: string) => {
    const label = CALLOUT_LABEL[attr(a, 'type') ?? 'info'] ?? 'Note';
    const title = attr(a, 'title');
    const lines = [`**${label}${title ? `: ${title}` : ''}**`, '', ...body.trim().split('\n')];
    return `\n\n${lines.map((l) => `> ${l.trim()}`.trimEnd()).join('\n')}\n\n`;
  });
  out = out.replace(/<Card\b([^>]*?)\/>/g, (_m, a: string) => {
    const title = attr(a, 'title') ?? '';
    const href = attr(a, 'href');
    const desc = attr(a, 'description');
    return `- ${href ? `[${title}](${href})` : title}${desc ? `: ${desc}` : ''}`;
  });
  out = out.replace(/<Card\b([^>]*)>([\s\S]*?)<\/Card>/g, (_m, a: string, body: string) => {
    const title = attr(a, 'title') ?? '';
    const href = attr(a, 'href');
    return `- ${href ? `[${title}](${href})` : title}: ${body.trim().replace(/\s+/g, ' ')}`;
  });
  out = out.replace(/<Tab\b([^>]*)>/g, (_m, a: string) => `**${attr(a, 'value') ?? 'Tab'}**\n`);
  out = out.replace(/<Accordion\b([^>]*)>/g, (_m, a: string) => `**${attr(a, 'title') ?? ''}**\n`);
  out = out.replace(/<\/?(Cards|Tabs|Tab|Steps|Step|Accordions|Accordion)\b[^>]*>/g, '');
  // Absolute links for readers outside the site; trim list indentation left by JSX.
  out = out.replace(/\]\((\/[^)]*)\)/g, (_m, path: string) => `](${absoluteUrl(path)})`);
  out = out.replace(/^[ \t]+(- \[)/gm, '$1');
  return out.replace(/\n{3,}/g, '\n\n');
}

/** Convert page source (MDX) into plain Markdown: no frontmatter, no imports, components flattened to text. */
export function mdxToMarkdown(raw: string): string {
  const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
  // Leave fenced code untouched.
  const parts = body.split(/(```[\s\S]*?```)/g);
  return parts
    .map((p, i) => (i % 2 === 1 ? p : transformProse(p)))
    .join('')
    .trim();
}

export async function getLLMText(page: Page): Promise<string> {
  const markdown = mdxToMarkdown(await readRaw(page));
  const description = page.data.description ? `\n${page.data.description}\n` : '';
  return `# ${page.data.title}
URL: ${absoluteUrl(page.url)}
${description}
${markdown}
`;
}
