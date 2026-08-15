import { SiteNav } from "@/components/site-nav";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { CPSection } from "@/components/cp-section";
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
      <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <CPSection />
        <EducationSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
