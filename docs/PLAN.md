# 10-Phase Implementation Plan

## Phase 1: Foundation

- Read local Next 16 docs before implementation.
- Confirm existing app structure and styling setup.
- Create product specification and implementation plan from the PRD.

## Phase 2: Content Model

- Define portfolio data types.
- Create static profile, navigation, metrics, experience, project, skill, education, and contact data.

## Phase 3: Theme System

- Define light/dark CSS variables.
- Implement persisted theme selection.
- Prevent unreadable flash states as much as possible without introducing extra dependencies.

## Phase 4: Layout And Navigation

- Build sticky navigation.
- Add mobile menu.
- Add active section highlighting.
- Add smooth anchor navigation.

## Phase 5: Hero And About

- Implement hero content, CTAs, resume link, and availability signal.
- Implement professional summary, expertise, interests, and metrics cards.

## Phase 6: Experience And Education

- Implement vertical timeline for experience.
- Implement simple education card layout.

## Phase 7: Projects And Skills

- Implement featured project cards.
- Implement categorized skill chip groups.

## Phase 8: Contact

- Implement professional contact section.
- Use email, LinkedIn, and GitHub links only for V1.

## Phase 9: SEO And Metadata

- Add metadata, canonical URL, Open Graph fields, and JSON-LD.
- Add sitemap and robots metadata routes.

## Phase 10: Verification And Polish

- Run lint and production build.
- Inspect responsive behavior through a local browser if possible.
- Tune spacing, contrast, focus states, and content hierarchy.

