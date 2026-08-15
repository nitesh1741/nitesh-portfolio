import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { profile, projects, siteUrl } from "@/data/portfolio";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: project.seoTitle,
    description: project.seoDescription,
    keywords: [
      ...project.keywords,
      "Nitesh Kumar Mehta",
      "Neetesh Mehta",
      "CHUBB India engineer",
      "Software engineer Nepal",
      "KIIT graduate",
    ],
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: project.seoTitle,
      description: project.seoDescription,
      url: `/projects/${project.slug}`,
      type: "article",
      authors: [profile.name],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: project.seoTitle,
    description: project.seoDescription,
    url: `${siteUrl}/projects/${project.slug}`,
    dateCreated: "2024-01-01",
    creator: {
      "@type": "Person",
      name: profile.name,
      alternateName: profile.alternateName,
      url: siteUrl,
      jobTitle: profile.role,
      worksFor: { "@type": "Organization", name: profile.currentCompany },
    },
    keywords: project.keywords.join(", "),
    programmingLanguage: project.stack,
    about: {
      "@type": "SoftwareApplication",
      name: project.name,
      applicationCategory: "DeveloperApplication",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${siteUrl}/projects` },
      { "@type": "ListItem", position: 3, name: project.name, item: `${siteUrl}/projects/${project.slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article className="mx-auto max-w-4xl px-5 py-28 lg:px-8">
        <Link
          href="/projects"
          className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]"
        >
          Projects
        </Link>
        <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
          {project.name}
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          by{" "}
          <a href={siteUrl} className="underline underline-offset-2 hover:text-[var(--accent)]">
            {profile.name}
          </a>
        </p>
        <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
          {project.seoDescription}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--muted)]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-12 grid gap-6">
          <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-2xl font-bold">Engineering challenge</h2>
            <p className="mt-4 leading-8 text-[var(--muted)]">{project.challenge}</p>
          </section>
          <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-2xl font-bold">Technical solution</h2>
            <p className="mt-4 leading-8 text-[var(--muted)]">{project.solution}</p>
          </section>
          <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-2xl font-bold">Measured outcome</h2>
            <p className="mt-4 leading-8 text-[var(--muted)]">{project.outcome}</p>
          </section>
        </div>
      </article>
    </main>
  );
}
