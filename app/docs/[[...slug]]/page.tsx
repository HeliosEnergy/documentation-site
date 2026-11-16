import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/mdx-components';
import { LLMCopyButton, ViewOptions } from '@/components/page-actions';
import { SITE, ogSize } from '@/lib/site';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;
  // `/docs` has no trailing segment, so `.mdx` must be appended to `/docs`, which next.config rewrites.
  const markdownUrl = `${page.url}.mdx`;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle id="main-content" tabIndex={-1}>
        {page.data.title}
      </DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <div className="helios-page-actions flex flex-row flex-wrap items-center gap-2 border-b pt-2 pb-6">
        <LLMCopyButton markdownUrl={markdownUrl} />
        <ViewOptions
          markdownUrl={markdownUrl}
          githubUrl={`${SITE.github}/blob/${SITE.githubBranch}/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/docs/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const isRoot = page.slugs.length === 0;
  const title = page.data.title;
  const description = page.data.description ?? SITE.description;
  const image = {
    url: page.slugs.length ? `/og/${page.slugs.join('/')}` : '/og',
    width: ogSize.width,
    height: ogSize.height,
    alt: title,
  };

  return {
    // The docs overview uses the site default title.
    title: isRoot ? { absolute: `${title} | ${SITE.name}` } : title,
    description,
    alternates: { canonical: page.url },
    openGraph: {
      type: 'article',
      title,
      description,
      url: page.url,
      siteName: SITE.name,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
  };
}
