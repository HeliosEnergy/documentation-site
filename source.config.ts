import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections#define-docs
//
// Note: fumadocs-mdx 11.10 has no `postprocess.includeProcessedMarkdown`
// option (it was ignored and `getText('processed')` never existed). The
// llms.txt / llms-full.txt / .mdx routes read page source through
// lib/get-llm-text.ts instead.
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema,
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    // High-contrast light theme keeps code tokens at 4.5:1 or better on white.
    rehypeCodeOptions: {
      themes: { light: 'github-light-high-contrast', dark: 'github-dark' },
    },
  },
});
