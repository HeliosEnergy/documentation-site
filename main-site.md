Of course. Here are the sections with code verbatim in snippets for how icons are added to the navbar, the full getting started page with its styling, how section titles appear in the navigation bar, and an overview of the custom styling.

### 1. How Icons are Added to the Navbar

Icons and other links are added to the navigation bar through a `links` property on the layout component. A shared configuration file defines the array of link items, which includes properties for the `icon`, `text`, and `url`.

The icons themselves are JSX elements, typically from an icon library like `lucide-react`.

#### **Shared Link Configuration (`apps/docs/lib/layout.shared.tsx`)**

This file defines the `linkItems` array that is reused across different layouts. Each object in the array can have an `icon` property.

```typescript
import { type LinkItemType } from 'fumadocs-ui/layouts/docs';
import { AlbumIcon, Heart, LayoutTemplate } from 'lucide-react';
import Image from 'next/image';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { FumadocsIcon } from '@/app/layout.client';
import Logo from '@/public/logo.png';

export const linkItems: LinkItemType[] = [
  {
    icon: <AlbumIcon />,
    text: 'Blog',
    url: '/blog',
    active: 'nested-url',
  },
  {
    text: 'Showcase',
    url: '/showcase',
    icon: <LayoutTemplate />,
    active: 'url',
  },
  {
    text: 'Sponsors',
    url: '/sponsors',
    icon: <Heart />,
  },
  {
    type: 'icon',
    url: 'https://github.com/fuma-nama/fumadocs',
    text: 'Github',
    icon: (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    external: true,
  },
];
```

#### **Home Page Layout (`apps/docs/app/(home)/layout.tsx`)**

The `linkItems` array is then passed to the `links` prop of the `<HomeLayout>` component.

```typescript
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions, linkItems } from '@/lib/layout.shared';
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from 'fumadocs-ui/layouts/home/navbar';
import Link from 'fumadocs-core/link';
import Image from 'next/image';
import Preview from '@/public/banner.png';
import { Book, ComponentIcon, Pencil, PlusIcon, Server } from 'lucide-react';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout
      {...baseOptions()}
      style={
        {
          '--spacing-fd-container': '1120px',
        } as object
      }
      links={[
        {
          type: 'menu',
          on: 'menu',
          text: 'Documentation',
          items: [
            {
              text: 'Getting Started',
              url: '/docs/ui',
              icon: <Book />,
            },
            {
              text: 'Components',
              url: '/docs/ui/components',
              icon: <ComponentIcon />,
            },
          ],
        },
        {
          type: 'custom',
          on: 'nav',
          children: (
            <NavbarMenu>
              <NavbarMenuTrigger>
                <Link href="/docs/ui">Documentation</Link>
              </NavbarMenuTrigger>
              <NavbarMenuContent className="text-[15px]">
                <NavbarMenuLink href="/docs/ui" className="md:row-span-2">
                  <div className="-mx-3 -mt-3">
                    <Image
                      src={Preview}
                      alt="Perview"
                      className="rounded-t-lg object-cover"
                      style={{
                        maskImage:
                          'linear-gradient(to bottom,white 60%,transparent)',
                      }}
                    />
                  </div>
                  <p className="font-medium">Getting Started</p>
                  <p className="text-fd-muted-foreground text-sm">
                    Learn to use Fumadocs on your docs site.
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink
                  href="/docs/ui/components"
                  className="lg:col-start-2"
                >
                  <ComponentIcon className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">Components</p>
                  <p className="text-fd-muted-foreground text-sm">
                    Add interactive experience to your docs.
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink
                  href="/docs/ui/openapi"
                  className="lg:col-start-2"
                >
                  <Server className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">OpenAPI</p>
                  <p className="text-fd-muted-foreground text-sm">
                    Generate interactive playgrounds and docs for your OpenAPI
                    schema.
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink
                  href="/docs/ui/markdown"
                  className="lg:col-start-3 lg:row-start-1"
                >
                  <Pencil className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">Markdown</p>
                  <p className="text-fd-muted-foreground text-sm">
                    Learn the writing format/syntax of Fumadocs.
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink
                  href="/docs/ui/manual-installation"
                  className="lg:col-start-3 lg:row-start-2"
                >
                  <PlusIcon className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">Manual Installation</p>
                  <p className="text-fd-muted-foreground text-sm">
                    Setup Fumadocs for your existing Next.js app.
                  </p>
                </NavbarMenuLink>
              </NavbarMenuContent>
            </NavbarMenu>
          ),
        },
        ...linkItems,
      ]}
      className="dark:bg-neutral-950 dark:[--color-fd-background:var(--color-neutral-950)]"
    >
      {children}
      <Footer />
    </HomeLayout>
  );
}
```

### 2. Full Getting Started Page and Card Styling

The "Quick Start" page is an MDX file that uses special components like `<Cards>` and `<Card>`. The icons are passed directly to the `<Card>` component as a JSX prop.

#### **Getting Started Page (`apps/docs/content/docs/ui/index.mdx`)**

This is the full content of the main getting started page. Notice how `lucide-react` icons are imported and passed to the `icon` prop of the `<Card>` component.

```markdown
---
title: Quick Start
description: Getting Started with Fumadocs
icon: Album
---

## Introduction

Fumadocs <span className='text-fd-muted-foreground text-sm'>(Foo-ma docs)</span> is a **documentation framework**, designed to be fast, flexible,
and composes seamlessly into your React framework.

Fumadocs has different parts:

<Cards>

<Card icon={<CpuIcon className="text-purple-300" />} title='Fumadocs Core'>

Handles most of the logic, including document search, content source adapters, and Markdown extensions.

</Card>

<Card icon={<PanelsTopLeft className="text-blue-300" />} title='Fumadocs UI'>

The default theme of Fumadocs offers a beautiful look for documentation sites and interactive components.

</Card>

<Card icon={<Database />} title='Content Source'>

The source of your content, can be a CMS or local data layers like [Fumadocs MDX](/docs/mdx) (the official content source).

</Card>

<Card icon={<Terminal />} title='Fumadocs CLI'>

A command line tool to install UI components and automate things, useful for customizing layouts.

</Card>

</Cards>

<Callout title="Want to learn more?">
  Read our in-depth [What is Fumadocs](/docs/ui/what-is-fumadocs) introduction.
</Callout>

### Terminology

**Markdown/MDX:** Markdown is a markup language for creating formatted text. Fumadocs natively supports Markdown and MDX (superset of Markdown).

**[Bun](https://bun.sh):** A JavaScript runtime, we use it for running scripts.

Some basic knowledge of React.js would be useful for further customisations.

## Automatic Installation

A minimum version of Node.js 20 required.

```bash tab="npm"
npm create fumadocs-app
```

```bash tab="pnpm"
pnpm create fumadocs-app
```

```bash tab="yarn"
yarn create fumadocs-app
```

```bash tab="bun"
bun create fumadocs-app
```

It will ask you the built-in template to use:

- **React.js framework**: Next.js, Waku, React Router, Tanstack Start.
- **Content source**: Fumadocs MDX.

A new fumadocs app should be initialized. Now you can start hacking!

<Callout title='From Existing Codebase?'>

    You can follow the [Manual Installation](/docs/ui/manual-installation) guide to get started.

</Callout>

### Enjoy!

Create your first MDX file in the docs folder.

```mdx title="content/docs/index.mdx"
---
title: Hello World
---

## Yo what's up
```

Run the app in development mode and see http://localhost:3000/docs.

```npm
npm run dev
```

## FAQ

Some common questions you may encounter.

<Accordions>
  <Accordion id='upgrade-fumadocs' title="Getting error with missing APIs or bugs?">
    Make sure to upgrade Fumadocs when you've encountered any problems or trying out new features:

    ```bash title="pnpm"
    pnpm update -i -r --latest
    ```

  </Accordion>

  <Accordion id='change-base-url' title="How to change the base route of docs?">

    Routing is handled by your React framework, you need to change the routing structure first.

    For example, in Next.js, rename the route (`/docs/*` -> `/info/*`):

    <Files>
      <Folder name="app/docs" defaultOpen className="opacity-50" disabled>
        <File name="layout.tsx" />
      </Folder>
      <Folder name="app/info" defaultOpen>
        <File name="layout.tsx" />
      </Folder>
    </Files>

    Or rename from `/docs/*` to `/*` using a route group:

    <Files>
      <Folder name="app/(docs)" defaultOpen>
        <File name="layout.tsx" />
      </Folder>
    </Files>

    Finally, update the base URL of pages in `source.ts`:

```ts title="lib/source.ts"
import { loader } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/info', // to the new value [!code highlight]
});
```

  </Accordion>

    <Accordion id='multi-docs' title="How to implement multi-docs?">
        We recommend to use [Sidebar Tabs](/docs/ui/navigation/sidebar#sidebar-tabs).
    </Accordion>

</Accordions>

### For Vite

<Accordions>
  <Accordion id='vite-context-error' title="Getting error with React contexts?">

There's some weird pre-bundling problems with Vite: [#3910](https://github.com/vitejs/vite/issues/3910).
Make sure to exclude Fumadocs from pre-bundling and add it to `noExternal`:

```ts title="vite.config.ts"
import { defineConfig } from 'vite';

// add other Fumadocs deps as needed
const FumadocsDeps = ['fumadocs-core', 'fumadocs-ui'];

export default defineConfig({
  resolve: {
    noExternal: FumadocsDeps,
  },
  optimizeDeps: {
    exclude: FumadocsDeps,
  },
});
```

  </Accordion>
</Accordions>

### For Next.js

<Accordions>
  <Accordion id='node-23' title="Getting error on production build?">

    Node.js 23.1 might have problems with Next.js, see [#1021](https://github.com/fuma-nama/fumadocs/issues/1021). Make sure to change your Node.js version.

  </Accordion>
  <Accordion id='dynamic-route' title="It uses Dynamic Route, will it be poor in performance?">

    Next.js turns dynamic route into static routes when `generateStaticParams` is configured.
    Hence, it is as fast as static pages.

    You can [enable Static Exports](/docs/ui/static-export) on Next.js to get a static build output.

  </Accordion>
  <Accordion id='custom-layout-docs-page' title='How to create a page in /docs without docs layout?'>

    Same as managing layouts in Next.js App Router, remove the original MDX file from content directory (`/content/docs`).
    This ensures duplicated pages will not cause errors.

    Now, You can add the page to another route group, which isn't a descendant of docs layout.

    For example, to replace `/docs/test`:

    <Files>
      <File name="(home)/docs/test/page.tsx" />
      <Folder name="docs">
        <File name="layout.tsx" />
        <File name="[[...slug]]/page.tsx" />
      </Folder>
    </Files>

    For `/docs`, you need to change the catch-all route to be non-optional:

    <Files>
      <File name="(home)/docs/page.tsx" />
      <Folder name="docs" defaultOpen>
        <File name="layout.tsx" />
        <File name="[...slug]/page.tsx" />
      </Folder>
    </Files>

  </Accordion>

</Accordions>

## Learn More

New to here? Don't worry, we are welcome for your questions.

If you find anything confusing, please give your feedback on [Github Discussion](https://github.com/fuma-nama/fumadocs/discussions)!

### Writing Content

For authoring docs, make sure to read:

<Cards>
  <Card href="/docs/ui/markdown" title="Markdown">
    Fumadocs has some additional features for authoring content.
  </Card>
  <Card href="/docs/ui/navigation" title="Navigation">
    Learn how to customise navigation links and sidebar items.
  </Card>
  <Card href="/docs/ui/page-conventions" title="Page Slugs & Page Tree">
    Learn how to organise content.
  </Card>
  <Card
    href="/docs/ui/components"
    title="Components"
    description="See all available components to enhance your docs"
  />
</Cards>

### Special Needs

<Cards>
  <Card
    href="/docs/ui/static-export"
    title="Configure Static Export"
    description="Learn how to enable static export on your docs"
  />
  <Card
    href="/docs/ui/internationalization"
    title="Internationalization"
    description="Learn how to enable i18n"
  />
  <Card
    href="/docs/ui/theme"
    title="Color Themes"
    description="Add themes to Fumadocs UI"
  />
  <Card
    href="/docs/ui/components"
    title="Layouts"
    description="Customise your Fumadocs UI layouts"
  />
</Cards>
```

### 3. How Section Titles are Added to the Nav Bar (Sidebar)

The section titles in the sidebar (e.g., "---Introduction---") are not part of the top navigation bar but are separators in the sidebar navigation tree. They are defined in `meta.json` files using a special `---Title---` syntax within the `pages` array.

#### **Sidebar Configuration (`apps/docs/content/docs/ui/meta.json`)**

This file controls the order and structure of the sidebar for the `/docs/ui` section. The `---Title---` entries are rendered as non-clickable section headers.

```json
{
  "title": "Framework",
  "description": "The docs framework",
  "icon": "Building",
  "root": true,
  "pages": [
    "---Introduction---",
    "index",
    "what-is-fumadocs",
    "comparisons",
    "manual-installation",
    "---Writing---",
    "page-conventions",
    "markdown",
    "---Configurations---",
    "versioning",
    "static-export",
    "internationalization",
    "navigation",
    "search",
    "---UI---",
    "...(ui)",
    "---Automation---",
    "python",
    "typescript",
    "obsidian",
    "openapi",
    "---Others---",
    "...",
    "seo"
  ]
}
```

### 4. All Custom Styling

Custom styling is managed through a combination of a global CSS file that defines CSS variables and imports Tailwind CSS presets, and component-specific styles defined with `class-variance-authority`.

#### **Global Styles (`apps/docs/app/global.css`)**

This is the central file for styling. It imports Tailwind, Fumadocs UI presets, and defines custom CSS variables, keyframe animations, and styles for different color modes (`:root` and `.dark`).

```css
@import 'tailwindcss' source(none);
@import 'fumadocs-ui/css/neutral.css';
@import 'fumadocs-ui/css/preset.css';
@import 'fumadocs-twoslash/twoslash.css';
@import 'fumadocs-openapi/css/preset.css';

@source ".";
@source "../components";
@source "../content";
@plugin 'tailwindcss-animate';

@theme inline {
  --default-mono-font-family: var(--font-mono);
  --animate-marquee: marquee var(--duration) infinite linear;
  --animate-marquee-vertical: marquee-vertical var(--duration) linear infinite;

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-100% - var(--gap)));
    }
  }

  @keyframes marquee-vertical {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(calc(-100% - var(--gap)));
    }
  }

  @keyframes stroke {
    from {
      stroke-dasharray: 1000;
    }
    to {
      stroke-dasharray: 1000;
      stroke-dashoffset: 2000;
    }
  }

  --animate-stroke: stroke 5s linear infinite;

  --color-gradient-radial: radial-gradient(circle, var(--tw-gradient-stops));
  --color-repeat-gradient-to-r: repeating-linear-gradient(
    to right,
    var(--tw-gradient-stops)
  );
  --color-repeat-gradient-to-br: repeating-linear-gradient(
    to bottom right,
    var(--tw-gradient-stops)
  );
}

.ui {
  --color-fd-primary: var(--ui-color);
}

.headless {
  --color-fd-primary: var(--headless-color);
}

:root {
  --headless-color: hsl(250, 80%, 54%);
  --ui-color: hsl(220, 91%, 54%);
}

body {
  overscroll-behavior-y: none;
  background-color: var(--color-fd-background);
}

.dark {
  --headless-color: hsl(250 100% 80%);
  --ui-color: hsl(217 92% 76%);
}

@keyframes circuit_1 {
  0% {
    transform: translateY(-20px);
  }

  100% {
    transform: translateY(100px);
  }
}

@keyframes circuit_1_x_energy {
  0%,
  46% {
    opacity: 0;
    transform: translateX(-20px);
  }
  47%,
  70% {
    opacity: 100%;
  }
  100% {
    opacity: 0;
    transform: translateX(212px);
  }
}
```

#### **Custom Button Variants (`apps/docs/components/ui/button.tsx`)**

Component styles are defined using `class-variance-authority` (cva), allowing for different variants (e.g., `default`, `outline`, `ghost`) and sizes.

```typescript
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-fd-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-fd-background bg-gradient-to-b from-fd-primary to-fd-primary/60 text-fd-primary-foreground shadow-inner shadow-fd-background/20 hover:bg-fd-primary/90',
        outline: 'border hover:bg-fd-accent hover:text-fd-accent-foreground',
        grow: 'border bg-gradient-to-t from-fd-primary/10 shadow-inner shadow-fd-primary/10 hover:bg-fd-accent/50 hover:text-fd-accent-foreground',
        secondary:
          'border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent hover:text-fd-accent-foreground',
        ghost: 'hover:bg-fd-accent hover:text-fd-accent-foreground',
        link: 'text-fd-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        icon: 'p-1.5',
        sm: 'h-9 px-3',
        lg: 'h-11 px-6',
        xs: 'px-2 py-1.5 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export { buttonVariants };
```