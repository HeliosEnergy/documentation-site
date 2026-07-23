# Helios Documentation — Improvement Plan

The site now runs on Fumadocs (Next.js) with a clean, professional theme and the
official Helios logo. `/` redirects to `/docs`. This plan covers what to improve
next, ordered by impact. It's informed by the existing pages and
`documentation_questionnaire.md`.

## 1. Fix correctness gaps (do first)

These undermine trust and are quick wins.

- **Dead links & placeholders.** `Sign up here` points to `#`; the demo video is a
  placeholder. Replace with real URLs (or remove until ready).
- **Confirm product facts.** The CLI (`helios-cli`), the Python decorator API
  (`@app.endpoint`), GPU names (H100/A100/L40), and per-second billing are stated in
  content — verify each against the actual product before publishing.
- **Broken external references.** GitHub nav points at the org (`/HeliosEnergy`); point
  it at the real public repo(s) or remove.

## 2. Information architecture

Current nav is a flat list. Group into sections so readers can find things:

- **Get started** — Overview, Quickstart, Core concepts
- **Guides** — Deploy a container, Bring your own Docker image, Web endpoints,
  Scheduled jobs, Scaling & concurrency, Secrets & storage
- **Reference** — CLI reference, Python SDK / API reference, GPU types & specs,
  Limits & quotas, Error codes
- **Account** — Workspaces & roles, Billing, Security
- **Help** — Troubleshooting, FAQ, Support

Implement via nested folders in `content/docs/` each with a `_meta.json`.

## 3. Content depth (biggest gap)

Most pages are short. Priorities:

- **End-to-end Quickstart** with a single copy-pasteable example that actually runs
  (install → login → deploy → call the endpoint → see output), with expected output
  shown at each step.
- **CLI reference** — every command, flags, and examples (auto-generate from
  `--help` if possible).
- **API / SDK reference** — the `helios.App`, decorators, GPU options, return types.
  Consider generating from docstrings.
- **Concepts** — what a deployment/container/workspace/endpoint actually is, and how
  billing maps to runtime.
- **Guides** — one task per page, each self-contained and outcome-oriented.

## 4. Craft & consistency

- **Sentence-case headings** throughout (some pages use Title Case).
- **Consistent callout usage** — `Callout` (info/warn/error) is now standardized;
  keep it (don't reintroduce `Banner` for inline notes).
- **Code blocks** — add language tags for highlighting; show expected output; prefer
  runnable snippets over fragments.
- **Screenshots** — the dashboard/annotated-view placeholders need real, annotated
  images (light + dark if possible).

## 5. Discoverability & SEO

- Add per-page `title` + `description` frontmatter everywhere (drives search + social).
- Add Open Graph / metadata in the docs layout.
- `llms.txt` / `llms-full.txt` routes already exist — keep them current as content grows.
- Wire up sitemap + robots.

## 6. Feedback loop

- Add a "Was this page helpful?" / "Edit this page on GitHub" affordance per page.
- Use `documentation_questionnaire.md` to collect structured feedback from FE/BE
  engineers, then close the loop on the highest-frequency gaps.

## 7. Deploy & operations

- The repo has a `.vercel/` project — confirm the production deploy target and
  connect the `redesign/*` branch preview.
- Add CI: build + link-check on PRs so broken links never ship.

---

### Suggested sequence

1. Section 1 (correctness) + Section 2 (IA) — 1 short pass.
2. Section 3 Quickstart + CLI reference — highest reader value.
3. Section 3 remaining guides + Section 4 craft — ongoing.
4. Sections 5–7 — once content stabilizes.
