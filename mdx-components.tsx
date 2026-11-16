import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import type { MDXComponents } from 'mdx/types';
import { Status } from '@/components/brand/status';
import { LastVerified } from '@/components/brand/last-verified';
import { Table } from '@/components/brand/table';

/**
 * MDX components available in every page without imports.
 *
 * Fumadocs defaults: Callout, Cards, Card, code blocks, headings, tables.
 * Added here: Steps/Step, Tabs/Tab, Accordions/Accordion (not in the defaults),
 * and the Helios components Status and LastVerified.
 */
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    table: Table,
    Steps,
    Step,
    Tabs,
    Tab,
    Accordions,
    Accordion,
    Status,
    LastVerified,
    ...components,
  };
}
