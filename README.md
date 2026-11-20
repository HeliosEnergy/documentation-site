# Helios documentation

Source for the Helios customer documentation: how to use the Helios console
(bare metal GPU access, Jupyter notebooks, AI inference and API, wallet and
billing, accounts and support). Built with Next.js 15, Fumadocs and Tailwind 4.

This repository is public. Read [Content rules](#content-rules) before you edit.

## Run locally

Requires Node.js 20 or later and npm.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build, also generates the search index and llms files
npm run start   # serve the production build
npm run lint
```

Set `NEXT_PUBLIC_SITE_URL` to the public origin of the deployment so the
sitemap, canonical URLs, Open Graph tags and `/llms.txt` use absolute URLs.
If it is unset, `lib/site.ts` falls back to a placeholder.

## Layout

```
content/docs/        MDX pages. One folder per sidebar section, each with a meta.json
content/docs/meta.json   Root sidebar order, with ---Section--- separators
app/                 Routes: home page, docs, search API, sitemap, robots, llms.txt, llms-full.txt
components/brand/    Logo, Status, LastVerified, footer, table wrapper
lib/                 Site constants (site.ts), layout config, content source, llms text
public/logos/        Brand logos
mdx-components.tsx   Components available in MDX without imports
```

Generated, not committed: `.source/` (content index) and `.next/`.

## Add a page

1. Create `content/docs/<section>/<slug>.mdx` with frontmatter:

   ```mdx
   ---
   title: Request bare metal access
   description: One plain, factual sentence of 160 characters or fewer.
   ---
   ```

   `description` is used for the meta description, search and `/llms.txt`.
2. Open the page with one or two sentences that answer the question directly.
3. Add the slug to that folder's `meta.json` `pages` array (order is sidebar order).
4. Run `npm run dev` and check the page, then `npm run build`.

Pages are also served as plain Markdown at `<page URL>.mdx`, and every page is
listed in `/llms.txt` with its full text in `/llms-full.txt`.

### MDX components

Available in every page with no import:

- `Callout` (`type="info"`, `"warn"`, `"error"`), `Cards` / `Card`, `Steps` / `Step`,
  `Tabs` / `Tab`, `Accordions` / `Accordion`, fenced code blocks with `title=`, plain Markdown tables.
- `<Status state="live" />` or `"unavailable"`: a labelled availability badge.
- `<LastVerified date="YYYY-MM-DD" />`: add only after checking the page against the product.

Do not use raw HTML tables, emoji, or raw Tailwind in MDX.

## Content rules

- Document only what a customer can do in the console today, and verify each
  fact against the product before you write it.
- Link to https://www.helios.co/pricing for prices. Do not put prices, secrets
  or tokens in this repository.
- Mark products that are not available with `Status`.
- Link only to destinations that exist: `console.helios.co` and the helios.co
  pages for pricing, clusters, colocation, contact, FAQ and terms.

Open an issue or pull request on a branch. Do not commit to `main` directly.
