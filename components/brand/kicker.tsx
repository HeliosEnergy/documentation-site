import { cn } from '@/lib/cn';

export function Kicker({
  children,
  className,
  as: Tag = 'p',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'p' | 'span' | 'div';
}) {
  return <Tag className={cn('kicker', className)}>{children}</Tag>;
}
