import { Children, isValidElement } from 'react';
import type { ReactNode, TableHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

function textOf(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return textOf(node.props.children);
  }
  return '';
}

/** Collect the header cell text of the first row, so each table region gets a distinct name. */
function headerLabel(children: ReactNode): string {
  const cells: string[] = [];
  const walk = (node: ReactNode, inHead: boolean) => {
    Children.forEach(node, (child) => {
      if (!isValidElement<{ children?: ReactNode }>(child)) return;
      const type = child.type;
      if (type === 'thead') walk(child.props.children, true);
      else if (inHead && type === 'th') cells.push(textOf(child.props.children).trim());
      else if (inHead) walk(child.props.children, true);
    });
  };
  walk(children, false);
  const names = cells.filter(Boolean);
  return names.length ? `Table: ${names.join(', ')}` : 'Table';
}

/**
 * Markdown table wrapper. Wide tables scroll inside this region (never the page),
 * and the region is keyboard-focusable so keyboard users can scroll it.
 */
export function Table({
  className,
  children,
  ...props
}: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div
      role="region"
      aria-label={headerLabel(children)}
      tabIndex={0}
      className="helios-table-wrap prose-no-margin relative my-6 max-w-full overflow-x-auto rounded-xl border border-fd-border bg-fd-card"
    >
      <table className={cn('my-0', className)} {...props}>
        {children}
      </table>
    </div>
  );
}
