import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";
import { profile, siteUrl } from "@/data/portfolio";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: `${siteUrl}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: profile.name,
      url: siteUrl,
    },
    keywords: post.keywords.join(", "),
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-5 py-28 lg:px-8">
        <Link
          href="/blog"
          className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]"
        >
          Blog
        </Link>
        <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
          {post.description}
        </p>
        <div className="mt-10 grid gap-9">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold">{section.heading}</h2>
              <p className="mt-4 leading-8 text-[var(--muted)]">{section.body}</p>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
