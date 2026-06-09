# Personal Portfolio Specification

## Product Scope

Build a single-page professional portfolio for Nitesh that establishes credibility with recruiters, hiring managers, engineering leads, collaborators, and founders.

## Version 1 Requirements

- Sections: Home, About, Experience, Projects, Skills, Education, Contact.
- Navigation: sticky desktop/mobile navigation, smooth anchor scrolling, active section indication.
- Theme: dark theme, light theme, persisted preference, system preference fallback.
- Hero: full name, role, short introduction, location, current company, resume link, contact CTA, projects CTA.
- About: concise profile, interests, expertise, metrics.
- Experience: vertical timeline with company, position, duration, description, achievements.
- Projects: 4-6 featured project cards with stack, highlights, GitHub, demo, and thumbnail treatment.
- Skills: categorized chips without progress bars.
- Education: simple card layout.
- Contact: email, LinkedIn, GitHub, location, collaboration statement, no backend form.
- SEO: title, description, keywords, canonical URL, Open Graph metadata, Schema.org Person JSON-LD, sitemap, robots.
- Quality targets: Lighthouse Performance 95+, Accessibility 95+, SEO 100, Best Practices 95+.

## Non-Goals

- Blog.
- Authentication.
- CMS.
- Dashboard.
- Backend contact form.
- Heavy animation, parallax, particles, or continuous motion effects.

## Design Direction

The interface should feel like a focused engineering profile: crisp typography, restrained color, dense but readable sections, clear evidence of work, and subtle motion. Avoid template-like portfolio flourishes and loud gradients.

## Technical Direction

- Use Next.js App Router conventions from the local Next 16 docs.
- Keep content in typed local data files.
- Use semantic HTML and accessible controls.
- Prefer CSS and small client components over large animation dependencies.
- Avoid adding runtime dependencies unless required by a concrete feature.

