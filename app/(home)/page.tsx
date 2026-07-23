import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import Link from 'next/link';
import {
  Cpu,
  Boxes,
  Network,
  Globe,
  Clock,
  Terminal,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { HeliosMark } from '@/components/logo';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      <Hero />
      <SpecRail />
      <Capabilities />
      <HowItWorks />
      <CodeShowcase />
      <Faq />
      <FinalCta />
    </main>
  );
}

/* ------------------------------------------------------------------ Hero */

function Hero() {
  return (
    <section className="relative isolate border-b helios-hairline">
      {/* instrument grid + solar corona */}
      <div className="pointer-events-none absolute inset-0 -z-10 helios-grid-bg" aria-hidden />
      <div
        className="helios-corona helios-corona-pulse pointer-events-none -z-10"
        aria-hidden
        style={{
          top: '-320px',
          left: '50%',
          width: '900px',
          height: '900px',
          transform: 'translateX(-50%)',
        }}
      />

      <div className="mx-auto w-full max-w-5xl px-6 pt-24 pb-20 text-center md:pt-32 md:pb-28">
        <p className="helios-mono-label helios-rise mb-8 text-fd-muted-foreground">
          <span className="text-fd-primary">Helios</span> · GPU Inference Cloud
        </p>

        <h1
          className="helios-display helios-rise mx-auto max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] font-extrabold text-[color:var(--helios-hero-ink)]"
          style={{ animationDelay: '80ms' }}
        >
          Deploy any model to
          <br className="hidden sm:block" /> on-demand GPUs{' '}
          <span className="text-fd-primary helios-glow-text">in seconds.</span>
        </h1>

        <p
          className="helios-rise mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-[color:var(--helios-hero-sub)] md:text-xl"
          style={{ animationDelay: '160ms' }}
        >
          Helios turns raw GPU power into a single command. Push a container, attach an
          H100, and serve it as a high-performance web endpoint — no Kubernetes, no cloud
          accounts, no cold-start pain.
        </p>

        <div
          className="helios-rise mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: '240ms' }}
        >
          <Link
            href="/docs/getting-started"
            className="group inline-flex items-center gap-2 rounded-xl bg-fd-primary px-6 py-3 text-[15px] font-semibold text-fd-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
          >
            Get started
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/docs/deployments"
            className="inline-flex items-center gap-2 rounded-xl border helios-hairline bg-fd-card/60 px-6 py-3 text-[15px] font-semibold text-fd-foreground backdrop-blur transition-colors hover:bg-fd-accent"
          >
            Deploy a container
          </Link>
        </div>

        {/* CLI proof */}
        <div
          className="helios-rise mx-auto mt-14 max-w-xl overflow-hidden rounded-xl border helios-hairline bg-fd-card/70 text-left shadow-sm backdrop-blur"
          style={{ animationDelay: '320ms' }}
        >
          <div className="flex items-center gap-2 border-b helios-hairline px-4 py-2.5 text-fd-muted-foreground">
            <Terminal className="size-3.5" />
            <span className="helios-mono-label !text-[0.62rem] !tracking-[0.16em]">
              helios-cli
            </span>
          </div>
          <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-relaxed">
            <code>
              <span className="text-fd-muted-foreground">$ </span>pip install helios-cli
              {'\n'}
              <span className="text-fd-muted-foreground">$ </span>helios login
              {'\n'}
              <span className="text-fd-muted-foreground">$ </span>helios deploy{' '}
              <span className="text-fd-primary">myrepo/llm:latest</span> --gpu h100
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Spec rail */

const SPECS = [
  'NVIDIA H100',
  'A100',
  'L40',
  'per-second billing',
  'sub-second cold starts',
  'autoscaling',
];

function SpecRail() {
  return (
    <section className="border-b helios-hairline bg-fd-muted/40">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-5">
        {SPECS.map((s) => (
          <span
            key={s}
            className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-fd-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- Capabilities */

const FEATURES = [
  {
    icon: Cpu,
    title: 'Run any code',
    body: 'Deploy your models and functions remotely and have them running within seconds.',
  },
  {
    icon: Boxes,
    title: 'Container environments',
    body: 'Define environments in code, or bring a pre-built backend. Reproducible every run.',
  },
  {
    icon: Network,
    title: 'Scale horizontally',
    body: 'Fan out to thousands of containers, then back to zero. You only pay for what runs.',
  },
  {
    icon: Globe,
    title: 'Web endpoints',
    body: 'Serve any function as a low-latency HTTPS endpoint with a single decorator.',
  },
  {
    icon: Clock,
    title: 'Scheduled jobs',
    body: 'Run and monitor persistent, scheduled inference jobs on a cron you control.',
  },
  {
    icon: Layers,
    title: 'Secrets & storage',
    body: 'Attach environment variables, secrets, and persistent volumes to any deployment.',
  },
];

function Capabilities() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24 md:py-28">
      <div className="max-w-2xl">
        <h2 className="helios-display text-[clamp(2rem,4vw,3rem)] font-bold text-fd-foreground">
          Everything between your model and production.
        </h2>
        <p className="mt-4 text-lg text-fd-muted-foreground">
          Helios solves the hard infrastructure problems — orchestration, scaling, GPU
          scheduling — so you ship code, not clusters.
        </p>
      </div>

      {/* Featured GPU panel */}
      <div className="relative mt-12 overflow-hidden rounded-2xl border helios-hairline bg-fd-card">
        <div
          className="helios-corona pointer-events-none"
          aria-hidden
          style={{ top: '-140px', right: '-120px', width: '440px', height: '440px', opacity: 0.5 }}
        />
        <div className="relative grid gap-8 p-8 md:grid-cols-2 md:p-12">
          <div>
            <div className="flex size-11 items-center justify-center rounded-xl bg-fd-primary/12 text-fd-primary">
              <Cpu className="size-5" />
            </div>
            <h3 className="helios-display mt-5 text-2xl font-bold text-fd-foreground">
              Attach a GPU with one line
            </h3>
            <p className="mt-3 max-w-md text-fd-muted-foreground">
              Access the most powerful accelerators on demand. Pick the card that fits your
              workload and budget — Helios handles provisioning, drivers, and teardown.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-2.5">
            {[
              ['NVIDIA H100', '80 GB · training + heavy inference'],
              ['NVIDIA A100', '40/80 GB · balanced throughput'],
              ['NVIDIA L40', 'cost-effective serving'],
            ].map(([name, note]) => (
              <div
                key={name}
                className="flex items-baseline justify-between gap-4 rounded-lg border helios-hairline bg-fd-background/60 px-4 py-3"
              >
                <span className="font-mono text-sm font-medium text-fd-foreground">{name}</span>
                <span className="text-right text-xs text-fd-muted-foreground">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Capability sheet */}
      <div className="mt-4 grid overflow-hidden rounded-2xl border helios-hairline sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="group border-b border-r helios-hairline p-7 transition-colors last:border-r-0 hover:bg-fd-muted/50"
          >
            <Icon className="size-5 text-fd-primary transition-transform duration-200 group-hover:-translate-y-0.5" />
            <h3 className="mt-4 text-base font-semibold text-fd-foreground">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-fd-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- How it works */

const STEPS = [
  {
    n: '01',
    title: 'Package your code',
    body: 'Point Helios at a Docker image or define the environment inline. We build it into a reproducible container.',
  },
  {
    n: '02',
    title: 'Attach GPUs & scale',
    body: 'Choose an accelerator and concurrency. Helios schedules containers across the fleet and scales with demand.',
  },
  {
    n: '03',
    title: 'Serve & monitor',
    body: 'Expose a web endpoint or scheduled job, then watch logs, latency, and spend in real time.',
  },
];

function HowItWorks() {
  return (
    <section className="border-y helios-hairline bg-fd-muted/30">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-28">
        <h2 className="helios-display max-w-2xl text-[clamp(2rem,4vw,3rem)] font-bold text-fd-foreground">
          From container to live endpoint in three steps.
        </h2>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border helios-hairline bg-[var(--helios-hairline)] md:grid-cols-3">
          {STEPS.map(({ n, title, body }) => (
            <div key={n} className="bg-fd-background p-8">
              <span className="font-mono text-sm font-medium text-fd-primary">{n}</span>
              <h3 className="mt-4 text-lg font-semibold text-fd-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fd-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Code showcase */

function CodeShowcase() {
  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-28">
      <div>
        <h2 className="helios-display text-[clamp(2rem,4vw,3rem)] font-bold text-fd-foreground">
          Infrastructure that reads like code.
        </h2>
        <p className="mt-4 text-lg text-fd-muted-foreground">
          Helios currently supports Python, with more languages on the way. Decorate a
          function, declare the GPU, and deploy — the platform handles the rest.
        </p>
        <Link
          href="/docs/getting-started"
          className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-fd-primary hover:underline"
        >
          Read the quickstart
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border helios-hairline bg-fd-card shadow-sm">
        <div className="flex items-center gap-2 border-b helios-hairline px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-fd-primary/70" />
          <span className="size-2.5 rounded-full bg-fd-muted-foreground/40" />
          <span className="size-2.5 rounded-full bg-fd-muted-foreground/40" />
          <span className="ml-2 font-mono text-[0.68rem] tracking-wide text-fd-muted-foreground">
            main.py
          </span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.7]">
          <code>
            <span className="text-fd-muted-foreground">import</span> helios{'\n\n'}
            app = helios.App(<span className="text-fd-primary">&quot;summarizer&quot;</span>){'\n\n'}
            <span className="text-fd-muted-foreground">@app.endpoint</span>(gpu=
            <span className="text-fd-primary">&quot;h100&quot;</span>){'\n'}
            <span className="text-fd-muted-foreground">def</span> generate(prompt: str):{'\n'}
            {'    '}model = load_model(){'\n'}
            {'    '}<span className="text-fd-muted-foreground">return</span> model(prompt)
          </code>
        </pre>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- FAQ */

function Faq() {
  return (
    <section className="border-t helios-hairline bg-fd-muted/30">
      <div className="mx-auto w-full max-w-3xl px-6 py-24 md:py-28">
        <h2 className="helios-display text-center text-[clamp(2rem,4vw,3rem)] font-bold text-fd-foreground">
          Frequently asked questions
        </h2>
        <div className="mt-10">
          <Accordions type="single">
            <Accordion title="What is Helios?">
              Helios is a cloud platform that provides easy, affordable access to GPU
              resources for AI inference — deploy any container, attach a GPU, and serve it
              without managing infrastructure.
            </Accordion>
            <Accordion title="Which GPUs are available?">
              A range of NVIDIA accelerators including the H100, A100, and L40, so you can
              match performance to budget for both training and inference.
            </Accordion>
            <Accordion title="How am I billed?">
              You are billed per second for the time your container runs. Usage and spend
              are visible in real time from the billing dashboard.
            </Accordion>
            <Accordion title="Do I need to know Kubernetes or Docker?">
              No Kubernetes and no cloud account required. Basic Docker familiarity helps,
              but Helios can also build environments directly from your code.
            </Accordion>
          </Accordions>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Final CTA */

function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden border-t helios-hairline">
      <div
        className="helios-corona helios-corona-pulse pointer-events-none -z-10"
        aria-hidden
        style={{
          bottom: '-420px',
          left: '50%',
          width: '820px',
          height: '820px',
          transform: 'translateX(-50%)',
        }}
      />
      <div className="mx-auto w-full max-w-3xl px-6 py-28 text-center">
        <HeliosMark className="mx-auto size-10 text-fd-primary" />
        <h2 className="helios-display mt-6 text-[clamp(2.2rem,5vw,4rem)] font-extrabold text-[color:var(--helios-hero-ink)]">
          Put the sun to work.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-[color:var(--helios-hero-sub)]">
          Spin up your first GPU deployment in minutes. New accounts start with free
          credits.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/docs/getting-started"
            className="group inline-flex items-center gap-2 rounded-xl bg-fd-primary px-6 py-3 text-[15px] font-semibold text-fd-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
          >
            Start building
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-xl border helios-hairline px-6 py-3 text-[15px] font-semibold text-fd-foreground transition-colors hover:bg-fd-accent"
          >
            Browse the docs
          </Link>
        </div>
      </div>
    </section>
  );
}
