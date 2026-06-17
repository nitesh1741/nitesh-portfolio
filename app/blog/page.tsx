import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { siteUrl } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Backend Engineering and Agentic AI Blog",
  description:
    "Technical articles by Nitesh Kumar Mehta on .NET microservices, Redis caching, Kafka, Azure observability, LangChain, RAG, and Agentic AI.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Backend Engineering and Agentic AI Blog",
    url: `${siteUrl}/blog`,
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${siteUrl}/blog/${post.slug}`,
      description: post.description,
      datePublished: post.date,
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
          Blog
        </p>
        <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
          Backend engineering, cloud systems, and Agentic AI notes.
        </h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 premium-card"
            >
              <p className="font-mono text-xs font-semibold text-[var(--muted)]">
                {post.date}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-[var(--foreground)]">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                {post.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
