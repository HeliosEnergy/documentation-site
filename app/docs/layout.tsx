import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import {
  baseOptions,
  docsLinks,
  docsNav,
  docsSidebarBanner,
} from '@/lib/layout.shared';
import { source } from '@/lib/source';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      nav={docsNav()}
      links={docsLinks}
      sidebar={{
        tabs: false,
        defaultOpenLevel: 1,
        banner: docsSidebarBanner,
      }}
    >
      {children}
    </DocsLayout>
  );
}
