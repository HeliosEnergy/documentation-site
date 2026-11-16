import { statSync } from 'node:fs';
import { join } from 'node:path';
import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

/** Last-modified time of a content file, or undefined if it cannot be read. */
function modified(path: string): Date | undefined {
  try {
    return statSync(join(process.cwd(), 'content', 'docs', path)).mtime;
  } catch {
    return undefined;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/') },
    ...source.getPages().map((page) => ({
      url: absoluteUrl(page.url),
      lastModified: modified(page.path),
    })),
  ];
}
