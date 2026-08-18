import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/about";
import { Games } from "@/components/games";
import { Hero } from "@/components/hero";
import { LatestContent } from "@/components/latest-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Socials } from "@/components/socials";
import { fetchLatestContent } from "@/lib/content";

export const Route = createFileRoute("/")({
  loader: () => fetchLatestContent(),
  component: Home,
});

function Home() {
  const content = Route.useLoaderData();

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Games />
        <LatestContent data={content} />
        <Socials />
      </main>
      <SiteFooter />
    </>
  );
}
