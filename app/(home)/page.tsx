import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Card, Cards } from 'fumadocs-ui/components/card';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center p-4 md:p-8">
      <div className="max-w-4xl w-full text-center">
        <h1 className="mb-4 text-5xl font-bold text-fd-foreground">Helios GPU Inference Platform</h1>
        <p className="mb-12 text-xl text-fd-muted-foreground">
          The easiest way to deploy and scale your AI models. Focus on your code, we handle the infrastructure.
        </p>

        <section className="mb-16 text-left">
          <h2 className="mb-6 text-3xl font-bold text-fd-foreground text-center">What is Helios?</h2>
          <p className="mb-8 text-lg text-fd-muted-foreground text-center">
            Helios is a cloud platform that lets you:
          </p>
          <Cards>
            <Card icon="⚡" title="Run Any Code" description="Deploy your models remotely within seconds." href="/docs/deployments" />
            <Card icon="📦" title="Container Environments" description="Define container environments in code or use pre-built backends." href="/docs/docker" />
            <Card icon="📈" title="Scale Horizontally" description="Scale out to thousands of containers with ease." href="/docs/deployments" />
            <Card icon="🧠" title="Attach GPUs" description="Access powerful GPUs with a single line of code." href="/docs/deployments" />
            <Card icon="🌐" title="Web Endpoints" description="Serve your functions as high-performance web endpoints." href="/docs/deployments" />
            <Card icon="⏰" title="Scheduled Jobs" description="Deploy and monitor persistent scheduled inference jobs." href="/docs/deployments" />
          </Cards>
        </section>

        <section className="mb-16 text-left">
          <h2 className="mb-6 text-3xl font-bold text-fd-foreground text-center">Getting Started</h2>
          <p className="mb-8 text-lg text-fd-muted-foreground text-center">
            The nicest thing about all of this is that **you don't have to set up any infrastructure.** Just:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-lg text-fd-muted-foreground mx-auto max-w-md">
            <li>Create an account at <Link href="https://helios.com" className="text-fd-foreground font-semibold underline">helios.com</Link></li>
            <li>Install the Helios CLI: <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded">pip install helios-cli</code></li>
            <li>Run <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded">helios login</code> to authenticate</li>
          </ol>
          <p className="mt-8 text-lg text-fd-muted-foreground text-center">
            …and you can start running jobs right away. Check out some of our simple getting started examples:
          </p>
          <Cards>
            <Card title="Hello, world!" description="Your first model deployment." href="/docs/getting-started" />
            <Card title="A simple web scraper" description="Deploy a web scraper on Helios." href="/docs/deployments" />
          </Cards>
        </section>

        <section className="mb-16 text-left">
          <h2 className="mb-6 text-3xl font-bold text-fd-foreground text-center">How does it work?</h2>
          <p className="mb-8 text-lg text-fd-muted-foreground text-center">
            Helios takes your code, puts it in a container, and executes it in our optimized cloud environment. We solve all the hard infrastructure problems for you, so you don't have to mess with Kubernetes, Docker, or even an AWS account.
          </p>
          <p className="text-lg text-fd-muted-foreground text-center">
            Helios currently supports Python, with plans to support other languages in the future.
          </p>
        </section>

        <section className="mb-16 text-left">
          <h2 className="mb-6 text-3xl font-bold text-fd-foreground text-center">Frequently Asked Questions</h2>
          <div className="text-left">
            <Accordions type="single">
              <Accordion title="What is Helios?">
                Helios is a cloud platform that provides easy and affordable access to GPU resources for AI inference.
              </Accordion>
              <Accordion title="What GPU models are available?">
                We offer a range of GPUs, including the NVIDIA A100, H100, and L40, to suit different performance and budget needs.
              </Accordion>
              <Accordion title="How am I billed?">
                You are billed per second for the time your container is running. You can track your usage in real-time from the billing dashboard.
              </Accordion>
            </Accordions>
          </div>
        </section>
      </div>
    </main>
  );
}