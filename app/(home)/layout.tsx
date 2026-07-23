import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions, linkItems } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout
      {...baseOptions()}
      links={linkItems}
      style={{ '--spacing-fd-container': '1180px' } as React.CSSProperties}
    >
      {children}
    </HomeLayout>
  );
}
