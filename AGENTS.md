# Maa Laxmi Property --- Agent Instructions

## Project

This repository is for a pre-contract demonstration of a real-estate
website and Admin CMS for Maa Laxmi Property Consultant.

The current goal is to build a polished, working demo that can be shown
to the client before full production development begins.

## Required Reading

Before making substantial changes, read:

-   `docs/project-requirements.md`
-   `docs/implementation-spec.md`

These documents are the project's working specification.

## Source-of-Truth Rules

Keep these concepts separate:

1.  Requirements extracted from the quotation
2.  Additional requirements explicitly supplied during this project
3.  Engineering decisions
4.  Design references
5.  Temporary demo assumptions

Do not treat a design reference as a client requirement.

Do not treat the original Laravel/PHP/MySQL proposal as mandatory.

Do not invent client-specific facts.

When information is unknown, use clearly identified demo content or flag
the missing information.

## Technology

The proposed implementation stack is:

-   Astro
-   TypeScript
-   Tailwind CSS
-   GSAP / ScrollTrigger
-   PostgreSQL
-   Drizzle ORM
-   Better Auth or another approved Astro-compatible authentication
    solution

Do not introduce Next.js, Laravel, FastAPI, React as the primary
framework, Redis, RabbitMQ, microservices, or other substantial
infrastructure without explicit approval.

Prefer Astro components and server-rendered content. Use client-side
JavaScript only when it is actually required.

## Architecture

Prefer:

-   Simple architecture
-   Strong typing
-   Reusable components
-   Clear separation of concerns
-   Minimal client-side JavaScript
-   Maintainability
-   Easy future handover

Avoid:

-   Premature abstraction
-   Duplicate components
-   Unnecessary dependencies
-   Over-engineering
-   Large client-side state systems
-   Scope expansion

## Demo Scope

This is a pre-contract demo.

Prioritize:

1.  Visual quality
2.  Responsive design
3.  Property discovery
4.  Property listing
5.  Property details
6.  Search/filtering
7.  Property gallery
8.  Map experience
9.  Inquiry/contact flow
10. Minimal functional CMS

The critical demonstration flow is:

Admin login → create/edit property → persist to database → property
appears on public website → property detail page displays it

Do not silently turn the demo into the complete production CMS.

## Client Data

Never fabricate:

-   Phone numbers
-   Email addresses
-   Company history
-   Years of experience
-   Revenue
-   Awards
-   Customer counts
-   Office locations
-   Social accounts
-   Real property listings

Use clearly labelled demonstration content until actual client
information is supplied.

## External Services and Secrets

Never commit secrets, API keys, passwords, or credentials.

Use environment variables.

Do not expose server-side credentials to client-side code.

If an external service requires credentials that are unavailable,
identify the dependency and use an appropriate development fallback.

## Development Process

Before a major feature:

1.  Understand the requirement.
2.  Inspect the existing implementation.
3.  Check relevant project skills.
4.  Plan the change.
5.  Implement the smallest appropriate solution.
6.  Test it.
7.  Run relevant validation/build checks.
8.  Review for regressions.

Do not rewrite working code unnecessarily.

Do not claim a feature works without verifying it.

## Skills

Use the installed skills when relevant, especially:

-   `frontend-design`
-   `brainstorming`
-   `systematic-debugging`
-   `lint-and-validate`
-   `database-design`

Use additional skills only when their specialization is relevant.

## Safety

Do not perform destructive operations such as dropping databases,
deleting large groups of files, or replacing the project architecture
without explicit confirmation.

## Quality

The demo should be credible enough to show to a real client.

Prioritize:

-   visual polish
-   responsive behavior
-   accessibility
-   performance
-   SEO foundations
-   correctness
-   maintainability
