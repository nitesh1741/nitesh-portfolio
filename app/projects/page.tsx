import type { Metadata } from "next";
import Link from "next/link";
import { projects, siteUrl } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Backend, Cloud, and Agentic AI Projects",
  description:
    "Case studies from Nitesh Kumar Mehta covering Agentic AI, LangChain, RAG, Next.js, Python, Redis, PostgreSQL, and scalable backend architecture.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Backend, Cloud, and Agentic AI Projects",
    url: `${siteUrl}/projects`,
    hasPart: projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.name,
      url: `${siteUrl}/projects/${project.slug}`,
      description: project.seoDescription,
    })),
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="mx-auto max-w-6xl px-5 py-28 lg:px-8">
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
          Projects
        </p>
        <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
          Backend, cloud, and Agentic AI engineering case studies.
        </h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 premium-card"
            >
              <h2 className="text-2xl font-bold text-[var(--foreground)]">
                <Link href={`/projects/${project.slug}`}>{project.name}</Link>
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                {project.seoDescription}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1 text-xs font-bold text-[var(--muted)]"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
