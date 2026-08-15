# SEO Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every page and component of the portfolio fully SEO-optimised to rank for name variants (Nitesh, Neetesh, Nitesh Mehta, Nitesh Kumar Mehta), locations (Sunsari, Nepal, Bhokraha, Hyderabad), employer (CHUBB India), and all education institutions.

**Architecture:** Five layers — (1) data model extensions for SEO fields, (2) global metadata + geo meta tags in layout, (3) enriched + new JSON-LD schemas on every page, (4) keyword-woven visible text in components, (5) sitemap freshness. All content stays in `data/portfolio.ts`; pages and components read from it.

**Tech Stack:** Next.js 16.2.7 App Router, React 19, TypeScript 5 strict, Tailwind CSS 4. No test runner — validation via `npm run lint` and `npm run build`, plus Google Rich Results Test URL checks at the end.

**Spec:** Approved in-chat design (2026-08-15 SEO overhaul conversation).

## Global Constraints

- TypeScript strict mode — no `any`, no implicit types.
- All personal content lives in `data/portfolio.ts` or `data/blog.ts` — never hard-coded in pages/components.
- Import with `@/` alias (e.g. `import { profile } from "@/data/portfolio"`).
- Tailwind v4 — no `tailwind.config.js`; utility classes only.
- No external component libraries.
- File names: kebab-case.
- Run `npm run lint` after every task before committing.
- Commit style: `feat: <short description>` or `fix: <short description>`.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `types/portfolio.ts` | Modify | Add `alternateName`, `homeLocation`, `birthPlace`, `faqItems` fields to `Profile` type |
| `data/portfolio.ts` | Modify | Populate new fields; expand global keyword list on `profile` |
| `app/layout.tsx` | Modify | 50-term keyword list, geo meta tags (`geo.region`, `geo.placename`) |
| `app/page.tsx` | Modify | Enrich Person JSON-LD; add WebSite, FAQPage, ItemList JSON-LD blocks |
| `app/projects/page.tsx` | Modify | Add BreadcrumbList JSON-LD; surface author in metadata keywords |
| `app/projects/[slug]/page.tsx` | Modify | Add BreadcrumbList; enrich CreativeWork with `creator`, `dateCreated` |
| `app/blog/page.tsx` | Modify | Add BreadcrumbList; add `author` to Blog schema |
| `app/blog/[slug]/page.tsx` | Modify | Add BreadcrumbList; enrich BlogPosting with `image`, `publisher`, `mainEntityOfPage` |
| `app/sitemap.ts` | Modify | Use `new Date()` for lastModified; tune priorities |
| `components/about-section.tsx` | Modify | Add origin + location sentence from `profile.originSentence` |
| `components/site-footer.tsx` | Modify | Add full-name + location + origin attribution line |

---

### Task 1: Extend `types/portfolio.ts` with SEO fields

**Files:**
- Modify: `types/portfolio.ts`

**Interfaces:**
- Produces: `Profile` type with `alternateName: string[]`, `homeLocation: { city: string; district: string; country: string }`, `birthPlace: { city: string; district: string; country: string }`, `faqItems: { question: string; answer: string }[]`, `originSentence: string`, `seoKeywords: string[]`

- [ ] **Step 1: Open `types/portfolio.ts` and add the `Profile` type**

The file currently has no `Profile` type (the `profile` export in `data/portfolio.ts` is an inline object). Add it now so the data file can be typed:

```typescript
// Add after the existing types in types/portfolio.ts

export type FaqItem = {
  question: string;
  answer: string;
};

export type GeoLocation = {
  city: string;
  district: string;
  country: string;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  origin: string;
  currentCompany: string;
  intro: string;
  summary: string;
  interests: string[];
  expertise: string[];
  email: string;
  linkedin: string;
  github: string;
  githubSecondary: string;
  resume: string;
  // SEO additions
  alternateName: string[];
  homeLocation: GeoLocation;
  birthPlace: GeoLocation;
  faqItems: FaqItem[];
  originSentence: string;
  seoKeywords: string[];
};
```

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: no errors (the new types are not yet consumed anywhere).

- [ ] **Step 3: Commit**

```bash
git add types/portfolio.ts
git commit -m "feat: add Profile type with SEO fields to types/portfolio.ts"
```

---

### Task 2: Populate SEO data in `data/portfolio.ts`

**Files:**
- Modify: `data/portfolio.ts`

**Interfaces:**
- Consumes: `Profile`, `FaqItem`, `GeoLocation` from `types/portfolio.ts`
- Produces: `profile` object with all SEO fields populated; used by layout, page, and components in Tasks 3–9

- [ ] **Step 1: Add the new type imports to `data/portfolio.ts`**

Replace the existing import line:

```typescript
import type {
  Education,
  Experience,
  FaqItem,
  GeoLocation,
  Metric,
  NavItem,
  Profile,
  Project,
  SkillGroup,
} from "@/types/portfolio";
```

- [ ] **Step 2: Add type annotation to the `profile` export and populate all SEO fields**

Replace the existing `export const profile = { ... }` block with:

```typescript
export const profile: Profile = {
  name: "Nitesh Kumar Mehta",
  role: ".NET Backend & Agentic AI Engineer",
  location: "Hyderabad, Telangana, India",
  origin: "Sunsari, Nepal",
  currentCompany: "CHUBB India",
  intro:
    "Software engineer building .NET microservices, Azure event pipelines, Kafka workflows, Redis caching systems, and practical Agentic AI applications.",
  summary:
    "I build distributed backend systems that stay reliable under production load. At Chubb, I engineered .NET Core microservices processing 5,000+ insurance claims per hour, reduced database load by 60% with Redis and in-memory caching, and shipped event-driven pipelines on Kafka and Azure Service Bus with observability built in.",
  interests: ["Distributed Systems", "Cloud-Native Architecture", "Agentic AI", "Event-Driven Architecture"],
  expertise: [".NET Core", "C#", "Kafka", "Azure Service Bus", "Redis", "Kubernetes", "Microservices", "Python", "LangChain", "React", "Next.js"],
  email: "niteshmehta1741@gmail.com",
  linkedin: "https://www.linkedin.com/in/niteshkrmehta",
  github: "https://github.com/nitesh1741",
  githubSecondary: "https://github.com/nitesh-147",
  resume: "/nitesh-kumar-mehta-resume.pdf",

  // ── SEO fields ──────────────────────────────────────────────────────────
  alternateName: [
    "Nitesh",
    "Neetesh",
    "Nitesh Mehta",
    "Neetesh Mehta",
    "Nitesh K. Mehta",
    "Neetesh Kumar Mehta",
  ],

  homeLocation: {
    city: "Hyderabad",
    district: "Telangana",
    country: "India",
  },

  birthPlace: {
    city: "Bhokraha",
    district: "Sunsari",
    country: "Nepal",
  },

  // One natural sentence woven into the About section and footer.
  originSentence:
    "Originally from Bhokraha, Sunsari, Nepal — now based in Hyderabad, India.",

  // Used in layout.tsx <meta name="keywords"> and globally.
  seoKeywords: [
    // Name variants
    "Nitesh Kumar Mehta",
    "Nitesh Mehta",
    "Nitesh",
    "Neetesh",
    "Neetesh Mehta",
    "Neetesh Kumar Mehta",
    // Role
    ".NET Backend Engineer",
    "Agentic AI Engineer",
    "Software Engineer",
    "Backend Developer",
    "Full Stack Engineer",
    // Geo — current
    "Software Engineer Hyderabad",
    "Software Engineer Telangana",
    "Backend Engineer India",
    // Geo — origin
    "Software Engineer Nepal",
    "Software Engineer Sunsari",
    "Software Engineer Bhokraha",
    "Developer from Nepal",
    "Nepalese Software Engineer",
    // Employer
    "CHUBB India Engineer",
    "Chubb Technology",
    "Insurance Software Engineer",
    // Education — KIIT
    "KIIT Graduate",
    "KIIT Computer Science",
    "Kalinga Institute of Industrial Technology",
    "KIIT Bhubaneswar",
    // Education — Greenland
    "Greenland International Secondary School",
    "Greenland School Biratnagar",
    // Education — Dover
    "Prakashpur Dover English Academy",
    "Dover English Academy Sunsari",
    // Education — Shanti
    "Shanti Public School Bhokraha",
    "Shanti School Sunsari",
    // Tech
    "Azure Microservices Engineer",
    "Kafka Software Engineer",
    "Redis Caching",
    "Distributed Systems Engineer",
    "LangChain Developer",
    "RAG Developer",
    "TypeScript",
    ".NET Core",
    "C# Developer",
    "Kubernetes Engineer",
  ],

  faqItems: [
    {
      question: "Who is Nitesh Kumar Mehta?",
      answer:
        "Nitesh Kumar Mehta (also spelled Neetesh) is a Software Engineer specialising in .NET Backend and Agentic AI. He currently works at CHUBB India in Hyderabad and is originally from Bhokraha, Sunsari, Nepal.",
    },
    {
      question: "Where does Nitesh Mehta work?",
      answer:
        "Nitesh Mehta works as a Software Engineer at CHUBB India in Hyderabad, Telangana, India, building .NET Core microservices, Kafka event pipelines, and Azure-based distributed systems.",
    },
    {
      question: "Where is Nitesh Kumar Mehta from?",
      answer:
        "Nitesh Kumar Mehta is originally from Bhokraha, Sunsari, Nepal. He completed his schooling at Shanti Public School in Bhokraha and Prakashpur Dover English Academy in Sunsari before moving to India for higher education.",
    },
    {
      question: "Which school did Nitesh Mehta attend?",
      answer:
        "Nitesh Mehta attended Shanti Public School (Bhokraha, Sunsari) for Nursery–5th grade, Prakashpur Dover English Academy (Prakashpur, Sunsari) for 6th–10th grade, and Greenland International Secondary School (Biratnagar, Nepal) for 12th grade.",
    },
    {
      question: "Which university did Nitesh Kumar Mehta graduate from?",
      answer:
        "Nitesh Kumar Mehta graduated with a B.Tech in Computer Science and Engineering from KIIT — Kalinga Institute of Industrial Technology, Bhubaneswar, with a CGPA of 9.13/10.",
    },
    {
      question: "What technologies does Nitesh Mehta specialise in?",
      answer:
        "Nitesh Mehta specialises in .NET Core, C#, Kafka, Azure Service Bus, Redis, Kubernetes, Python, LangChain, RAG, and Agentic AI. He builds distributed backend systems and multi-agent AI applications.",
    },
  ],
};
```

- [ ] **Step 3: Run lint**

```bash
npm run lint
```

Expected: no errors. TypeScript will verify the `Profile` type shape.

- [ ] **Step 4: Commit**

```bash
git add types/portfolio.ts data/portfolio.ts
git commit -m "feat: populate SEO fields in profile — alternate names, locations, FAQ, keywords"
```

---

### Task 3: Expand global metadata and add geo meta tags (`app/layout.tsx`)

**Files:**
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `profile.seoKeywords` from `data/portfolio.ts`
- Produces: `<meta name="keywords">` with ~45 terms; `<meta name="geo.region">`, `<meta name="geo.placename">`, `<meta name="geo.position">` in `<head>`

- [ ] **Step 1: Replace the keywords array and add geo tags**

Replace the full contents of `app/layout.tsx` with:

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile, siteUrl } from "@/data/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nitesh Kumar Mehta | .NET Backend & Agentic AI Engineer",
    template: "%s | Nitesh Kumar Mehta",
  },
  description:
    "Portfolio of Nitesh Kumar Mehta (Neetesh), a software engineer from Bhokraha, Sunsari, Nepal — now at CHUBB India, Hyderabad — building .NET microservices, Azure/Kafka event pipelines, Redis caching systems, and Agentic AI apps.",
  keywords: profile.seoKeywords,
  authors: [{ name: "Nitesh Kumar Mehta" }],
  creator: "Nitesh Kumar Mehta",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nitesh Kumar Mehta | .NET Backend & Agentic AI Engineer",
    description:
      "Backend, cloud, and AI engineering portfolio — .NET microservices, Azure, Kafka, Redis, LangChain, RAG, and production systems. Engineer from Sunsari, Nepal at CHUBB India, Hyderabad.",
    url: "/",
    siteName: "Nitesh Kumar Mehta Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nitesh Kumar Mehta — .NET Backend and Agentic AI Engineer from Nepal, based in Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitesh Kumar Mehta | .NET Backend & Agentic AI Engineer",
    description:
      "Software engineer from Sunsari, Nepal — building .NET microservices, Azure/Kafka pipelines, Redis caching, and Agentic AI apps at CHUBB India, Hyderabad.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        {/* Geo targeting — current location */}
        <meta name="geo.region" content="IN-TG" />
        <meta name="geo.placename" content="Hyderabad, Telangana, India" />
        <meta name="geo.position" content="17.3850;78.4867" />
        <meta name="ICBM" content="17.3850, 78.4867" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: expand keywords to 45 terms and add geo meta tags in layout"
```

---

### Task 4: Enrich JSON-LD on the home page (`app/page.tsx`)

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `profile.alternateName`, `profile.homeLocation`, `profile.birthPlace`, `profile.faqItems`, `profile.seoKeywords`, `education` (all 4 entries), `blogPosts` from `data/blog.ts`
- Produces: Four JSON-LD blocks — enriched `ProfilePage` + `Person`, `WebSite`, `FAQPage`, `ItemList` (blog posts)

- [ ] **Step 1: Replace the JSON-LD section in `app/page.tsx`**

Replace the entire file with:

```typescript
import { SiteNav } from "@/components/site-nav";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { EducationSection } from "@/components/education-section";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { education, navItems, profile, projects, siteUrl } from "@/data/portfolio";
import { blogPosts } from "@/data/blog";

export default function Home() {
  // ── 1. ProfilePage + enriched Person ─────────────────────────────────
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${profile.name} portfolio`,
    url: siteUrl,
    mainEntity: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      alternateName: profile.alternateName,
      jobTitle: profile.role,
      url: siteUrl,
      email: profile.email,
      image: `${siteUrl}/profile.png`,
      sameAs: [profile.linkedin, profile.github, profile.githubSecondary],
      knowsAbout: [
        ".NET Core", "C#", "Kafka", "Azure Service Bus", "Redis caching",
        "Distributed systems", "Microservices", "Event-driven architecture",
        "Kubernetes", "Docker", "Agentic AI", "LangChain", "RAG",
        "Prompt engineering", "LLM orchestration", "Python", "TypeScript",
        "Next.js", "React", "Angular", "PostgreSQL", "MongoDB", "Azure SQL",
        "Azure Application Insights", "Azure Functions", "System design",
        "REST APIs", "XUnit", "Spring Boot",
      ],
      worksFor: {
        "@type": "Organization",
        name: "CHUBB India",
        url: "https://www.chubb.com/in-en/",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          addressCountry: "IN",
        },
      },
      alumniOf: education.map((edu) => ({
        "@type": edu.degree.includes("B.Tech") ? "CollegeOrUniversity" : "EducationalOrganization",
        name: edu.institution,
      })),
      address: {
        "@type": "PostalAddress",
        addressLocality: profile.homeLocation.city,
        addressRegion: profile.homeLocation.district,
        addressCountry: "IN",
      },
      homeLocation: {
        "@type": "Place",
        name: `${profile.homeLocation.city}, ${profile.homeLocation.district}, ${profile.homeLocation.country}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: profile.homeLocation.city,
          addressRegion: profile.homeLocation.district,
          addressCountry: "IN",
        },
      },
      birthPlace: {
        "@type": "Place",
        name: `${profile.birthPlace.city}, ${profile.birthPlace.district}, ${profile.birthPlace.country}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: profile.birthPlace.city,
          addressRegion: profile.birthPlace.district,
          addressCountry: "NP",
        },
      },
    },
    hasPart: projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.name,
      url: `${siteUrl}/projects/${project.slug}`,
      description: project.seoDescription,
      keywords: project.keywords.join(", "),
    })),
  };

  // ── 2. WebSite schema ─────────────────────────────────────────────────
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Nitesh Kumar Mehta Portfolio",
    url: siteUrl,
    description: profile.intro,
    author: { "@id": `${siteUrl}/#person` },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // ── 3. FAQPage schema ─────────────────────────────────────────────────
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: profile.faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  // ── 4. ItemList for blog posts ────────────────────────────────────────
  const blogItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Blog posts by Nitesh Kumar Mehta",
    url: `${siteUrl}/blog`,
    itemListElement: blogPosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogItemListJsonLd) }}
      />
      <SiteNav items={navItems} />
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: enrich Person schema and add WebSite, FAQPage, ItemList JSON-LD on home page"
```

---

### Task 5: Add BreadcrumbList to `/projects` page

**Files:**
- Modify: `app/projects/page.tsx`

**Interfaces:**
- Consumes: `siteUrl`, `projects` from `data/portfolio.ts`
- Produces: `BreadcrumbList` JSON-LD with two items: Home → Projects

- [ ] **Step 1: Add BreadcrumbList JSON-LD and expand metadata keywords**

Replace the full file with:

```typescript
import type { Metadata } from "next";
import Link from "next/link";
import { profile, projects, siteUrl } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Backend, Cloud, and Agentic AI Projects",
  description:
    "Engineering case studies by Nitesh Kumar Mehta (Neetesh) — CHUBB India — covering Agentic AI, LangChain, RAG, Next.js, Python, Redis, PostgreSQL, and scalable backend architecture.",
  keywords: [
    "Nitesh Kumar Mehta projects",
    "Neetesh Mehta portfolio",
    "Agentic AI projects",
    "LangChain RAG case study",
    ".NET backend projects",
    "Python backend engineer Nepal",
    "CHUBB India engineer projects",
  ],
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Nitesh Kumar Mehta — Backend, Cloud, and Agentic AI Projects",
    description:
      "Engineering case studies by Nitesh Kumar Mehta covering Agentic AI, distributed systems, and scalable backends.",
    url: "/projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Backend, Cloud, and Agentic AI Projects by Nitesh Kumar Mehta",
    url: `${siteUrl}/projects`,
    author: {
      "@type": "Person",
      name: profile.name,
      alternateName: profile.alternateName,
      url: siteUrl,
    },
    hasPart: projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.name,
      url: `${siteUrl}/projects/${project.slug}`,
      description: project.seoDescription,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${siteUrl}/projects`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
```

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/projects/page.tsx
git commit -m "feat: add BreadcrumbList schema and enrich metadata on /projects page"
```

---

### Task 6: Enrich project detail pages (`app/projects/[slug]/page.tsx`)

**Files:**
- Modify: `app/projects/[slug]/page.tsx`

**Interfaces:**
- Consumes: `profile.alternateName`, `profile.name`, `profile.seoKeywords`, `siteUrl`, `projects`
- Produces: Three JSON-LD blocks — `CreativeWork`, `BreadcrumbList`, enriched `author` Person

- [ ] **Step 1: Replace the full file**

```typescript
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
```

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/projects/[slug]/page.tsx
git commit -m "feat: add BreadcrumbList and enrich CreativeWork schema on project detail pages"
```

---

### Task 7: Enrich the blog listing page (`app/blog/page.tsx`)

**Files:**
- Modify: `app/blog/page.tsx`

**Interfaces:**
- Consumes: `profile.name`, `profile.alternateName`, `siteUrl`, `blogPosts`
- Produces: Enriched `Blog` JSON-LD with `author`; new `BreadcrumbList` JSON-LD; expanded metadata

- [ ] **Step 1: Replace the full file**

```typescript
import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { profile, siteUrl } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Backend Engineering and Agentic AI Blog",
  description:
    "Technical articles by Nitesh Kumar Mehta (Neetesh) — software engineer from Sunsari, Nepal at CHUBB India — on .NET microservices, Redis, Kafka, Azure, LangChain, RAG, and Agentic AI.",
  keywords: [
    "Nitesh Kumar Mehta blog",
    "Neetesh Mehta blog",
    ".NET microservices articles",
    "Redis caching tutorial",
    "Kafka consumer guide",
    "Agentic AI blog",
    "LangChain RAG blog",
    "Software engineer Nepal blog",
    "CHUBB India engineer blog",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Nitesh Kumar Mehta — Backend Engineering and Agentic AI Blog",
    description:
      "Technical articles on .NET, Redis, Kafka, Azure, and Agentic AI by Nitesh Kumar Mehta.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Backend Engineering and Agentic AI Blog by Nitesh Kumar Mehta",
    url: `${siteUrl}/blog`,
    author: {
      "@type": "Person",
      name: profile.name,
      alternateName: profile.alternateName,
      url: siteUrl,
      jobTitle: profile.role,
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${siteUrl}/blog/${post.slug}`,
      description: post.description,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: profile.name,
        url: siteUrl,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
    ],
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
```

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/blog/page.tsx
git commit -m "feat: add BreadcrumbList and enrich Blog schema with author on /blog page"
```

---

### Task 8: Enrich blog post detail pages (`app/blog/[slug]/page.tsx`)

**Files:**
- Modify: `app/blog/[slug]/page.tsx`

**Interfaces:**
- Consumes: `profile.name`, `profile.alternateName`, `profile.role`, `profile.currentCompany`, `siteUrl`, `blogPosts`
- Produces: Enriched `BlogPosting` JSON-LD with `image`, `publisher`, `mainEntityOfPage`, `wordCount`; `BreadcrumbList` JSON-LD

- [ ] **Step 1: Replace the full file**

```typescript
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
    keywords: [
      ...post.keywords,
      "Nitesh Kumar Mehta",
      "Neetesh Mehta",
      "CHUBB India engineer",
      "Software engineer Nepal",
    ],
    authors: [{ name: profile.name, url: siteUrl }],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [profile.name],
      tags: post.keywords,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  // Rough word count from all section bodies
  const wordCount = post.sections
    .reduce((acc, s) => acc + s.body.split(/\s+/).length, 0);

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    wordCount,
    url: `${siteUrl}/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
    image: {
      "@type": "ImageObject",
      url: `${siteUrl}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Person",
      name: profile.name,
      alternateName: profile.alternateName,
      url: siteUrl,
      jobTitle: profile.role,
      worksFor: { "@type": "Organization", name: profile.currentCompany },
    },
    publisher: {
      "@type": "Person",
      name: profile.name,
      url: siteUrl,
    },
    keywords: post.keywords.join(", "),
    inLanguage: "en-US",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
        <p className="mt-2 text-sm text-[var(--muted)]">
          by{" "}
          <a href={siteUrl} className="underline underline-offset-2 hover:text-[var(--accent)]">
            {profile.name}
          </a>{" "}
          · <time dateTime={post.date}>{post.date}</time>
        </p>
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
```

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/blog/[slug]/page.tsx
git commit -m "feat: enrich BlogPosting schema and add BreadcrumbList on blog post detail pages"
```

---

### Task 9: Fix sitemap freshness (`app/sitemap.ts`)

**Files:**
- Modify: `app/sitemap.ts`

**Interfaces:**
- Produces: All URLs with `lastModified: new Date()` (always fresh on build)

- [ ] **Step 1: Replace the hardcoded date with `new Date()`**

Replace the full file with:

```typescript
import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { projects, siteUrl } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
```

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts
git commit -m "fix: use dynamic lastModified date in sitemap and tune page priorities"
```

---

### Task 10: Weave keyword-rich origin sentence into About section

**Files:**
- Modify: `components/about-section.tsx`

**Interfaces:**
- Consumes: `profile.originSentence`, `profile.summary` from `data/portfolio.ts`
- Produces: Visible sentence in the About section co-locating "Nepal", "Bhokraha", "Sunsari", "Hyderabad" with Nitesh's name and role — critical for geo entity association

- [ ] **Step 1: Add the origin sentence below the summary paragraph**

Replace the full file with:

```typescript
import { Section } from "./section";
import { ChipGroup } from "./chip-group";
import { profile } from "@/data/portfolio";

export function AboutSection() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Backend engineer focused on reliable distributed systems."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="flex flex-col gap-4">
          <p className="text-lg leading-8 text-[var(--muted)]">
            {profile.summary}
          </p>
          <p className="text-sm leading-7 text-[var(--muted)] opacity-80">
            {profile.originSentence}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <ChipGroup title="Interests" items={profile.interests} />
          <ChipGroup title="Expertise" items={profile.expertise} />
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/about-section.tsx
git commit -m "feat: add origin sentence to About section for geo keyword co-occurrence"
```

---

### Task 11: Add full-name + location attribution line to footer

**Files:**
- Modify: `components/site-footer.tsx`

**Interfaces:**
- Consumes: `profile.name`, `profile.originSentence` from `data/portfolio.ts`
- Produces: Footer attribution line with full name, company, current city, and origin — appears on every page

- [ ] **Step 1: Add attribution text below the copyright line**

In `components/site-footer.tsx`, replace the inner `<div>` that holds the copyright lines with:

```typescript
        <div>
          <p className="text-sm font-semibold text-[var(--muted)]">
            &copy; {currentYear} {profile.name}. All rights reserved.
          </p>
          <p className="mt-1 text-xs text-[var(--muted)] opacity-75">
            {profile.role} · {profile.currentCompany} · Hyderabad, India
          </p>
          <p className="mt-0.5 text-xs text-[var(--muted)] opacity-50">
            {profile.originSentence}
          </p>
        </div>
```

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Run build to verify the full site compiles**

```bash
npm run build
```

Expected: ✓ compiled successfully, no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add components/site-footer.tsx
git commit -m "feat: add full-name, role, company, and origin line to site footer for SEO"
```

---

## Post-Implementation Verification

After all tasks are committed, validate the structured data:

1. **Google Rich Results Test:** `https://search.google.com/test/rich-results` — paste `https://nitesh-mehta.com.np` — confirm FAQPage and BreadcrumbList are detected.
2. **Schema.org Validator:** `https://validator.schema.org/` — paste the home page URL — check for zero critical errors on `Person`, `WebSite`, `FAQPage`, `ItemList`.
3. **Build check:** `npm run build` — zero TypeScript or lint errors.
4. **Sitemap check:** visit `https://nitesh-mehta.com.np/sitemap.xml` — verify all URLs listed with fresh dates.
5. **Robots check:** visit `https://nitesh-mehta.com.np/robots.txt` — verify sitemap URL is present.
