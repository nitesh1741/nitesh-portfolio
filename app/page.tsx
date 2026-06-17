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

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${profile.name} portfolio`,
    url: siteUrl,
    mainEntity: {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.role,
      url: siteUrl,
      email: profile.email,
      image: `${siteUrl}/profile.png`,
      sameAs: [profile.linkedin, profile.github, profile.githubSecondary],
      knowsAbout: [
        ".NET Core",
        "C#",
        "Kafka",
        "Azure Service Bus",
        "Redis caching",
        "Distributed systems",
        "Agentic AI",
        "LangChain",
        "RAG",
        "Next.js",
      ],
      worksFor: {
        "@type": "Organization",
        name: profile.currentCompany,
      },
      alumniOf: education[0]
        ? {
            "@type": "CollegeOrUniversity",
            name: education[0].institution,
          }
        : undefined,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        addressCountry: "IN",
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
