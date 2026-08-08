# Maa Laxmi Property --- Implementation Specification

## 1. Purpose

This document defines the proposed engineering and design implementation
for the pre-contract Maa Laxmi Property website demo.

`docs/project-requirements.md` defines what the project needs.

This document defines how the demo should be implemented.

Engineering decisions in this document are not claims about what the
client originally specified.

The implementation should be good enough to evolve into the production
website after the client approves the project, but the demo must remain
appropriately scoped.

------------------------------------------------------------------------

# 2. Technology Stack

## Frontend / Web Framework

-   Astro
-   TypeScript
-   Tailwind CSS

Use Astro as the primary application framework.

Prefer Astro components and server-rendered content.

Use client-side JavaScript only for interactions that require it.

Do not use Next.js.

Do not use React as the primary framework.

------------------------------------------------------------------------

## Styling

Use Tailwind CSS with a small, deliberate design system.

Avoid generic Bootstrap-like styling.

Create reusable design primitives for:

-   container
-   section
-   typography
-   buttons
-   badges
-   cards
-   form controls
-   property metadata
-   responsive grids

------------------------------------------------------------------------

## Animation

Use:

-   GSAP
-   GSAP ScrollTrigger

Use animation selectively for:

-   hero entrance
-   navbar transitions
-   section reveals
-   property-card reveals
-   image hover effects
-   subtle parallax
-   micro-interactions

Do not implement animation everywhere.

Do not use scroll hijacking.

Respect `prefers-reduced-motion`.

Animation must never be more important than usability or performance.

------------------------------------------------------------------------

## Icons

Use:

-   Lucide

Avoid introducing multiple icon libraries.

------------------------------------------------------------------------

## Database

Use:

-   PostgreSQL
-   Drizzle ORM

The database should contain real demo data rather than hardcoded
property objects once the database milestone is implemented.

------------------------------------------------------------------------

## Authentication

Use:

-   Better Auth, or
-   another lightweight Astro-compatible authentication solution
    approved during architecture planning.

Requirements:

-   secure login
-   logout
-   protected admin routes
-   session handling
-   basic authorization structure

The demo only needs the minimum administrative role required to
demonstrate the CMS.

Do not build complex user management for the demo.

------------------------------------------------------------------------

# 3. High-Level Architecture

Use a simple monolithic Astro application.

Conceptually:

Public Website \| v Astro SSR / server logic \| +---- PostgreSQL \| \|
\| +---- properties \| +---- property images \| +---- inquiries \| +----
categories/locations as appropriate \| +---- Authentication \| +---- Map
integration \| +---- Media/storage abstraction

Admin CMS \| v same application/backend \| v same database

Do not introduce microservices.

Do not introduce Redis or message queues.

Do not introduce a separate backend framework.

------------------------------------------------------------------------

# 4. Suggested Project Structure

Use a maintainable structure similar to:

src/ ├── components/ │ ├── layout/ │ ├── navigation/ │ ├── hero/ │ ├──
property/ │ ├── search/ │ ├── forms/ │ ├── map/ │ ├── sections/ │ └──
admin/ │ ├── layouts/ │ ├── pages/ │ ├── index.astro │ ├── properties/ │
│ ├── index.astro │ │ └── \[slug\].astro │ ├── about.astro │ ├──
services.astro │ ├── contact.astro │ └── admin/ │ ├── login.astro │ ├──
index.astro │ └── properties/ │ ├── index.astro │ ├── new.astro │ └──
\[id\]/ │ └── edit.astro │ ├── db/ │ ├── client.ts │ └── schema.ts │ ├──
lib/ ├── actions/ ├── middleware/ ├── types/ └── styles/

Do not force this exact structure if Astro conventions or the approved
architecture plan provide a clearly better equivalent.

------------------------------------------------------------------------

# 5. Design System

## Visual Direction

The final site should combine:

### From cinematic luxury real-estate references

-   large imagery
-   premium editorial typography
-   dark sections
-   architectural photography
-   restrained gold accents
-   polished motion

### From professional commercial real-estate references

-   clear information hierarchy
-   property discovery
-   practical property cards
-   clear CTAs
-   business credibility
-   readable information density

Do not make the site so "luxury" that normal residential, land, plot and
commercial properties look out of place.

------------------------------------------------------------------------

## Color Palette

Primary background:

`#050505`

Dark background:

`#0B0E14`

Secondary dark:

`#151922`

Light background:

`#F7F7F5`

White:

`#FFFFFF`

Primary accent:

`#D4AF37`

Secondary accent:

`#E7C98B`

Primary dark text:

`#111111`

Secondary dark text:

`#5F6368`

Secondary light text:

`#A0A0A0`

Gold should be an accent, not the dominant color.

Avoid excessive gradients.

------------------------------------------------------------------------

# 6. Typography

Use a modern sans-serif family such as:

-   Inter
-   Geist
-   or an equivalent clean sans-serif

Headings:

-   strong
-   tight tracking
-   tight line height

Kickers:

-   uppercase
-   small
-   semibold
-   wide tracking
-   gold

Body:

-   readable
-   relaxed line height

Do not use decorative fonts unless justified by the final visual system.

------------------------------------------------------------------------

# 7. Global Layout

Use:

-   responsive max-width containers
-   consistent horizontal padding
-   generous vertical spacing
-   strong alignment
-   clear visual hierarchy

Design mobile-first.

Do not simply shrink desktop layouts.

------------------------------------------------------------------------

# 8. Navigation

Create a responsive navbar.

Desktop:

-   Maa Laxmi Property wordmark/logo
-   Home
-   Properties
-   Services
-   About
-   Contact
-   primary contact/WhatsApp CTA

Mobile:

-   logo
-   menu button
-   accessible navigation drawer/dropdown

Navbar behavior:

-   visually integrates with hero
-   transitions on scroll
-   subtle background/blur/border
-   remains readable

Do not use fictional brand marks from the design references.

Use a temporary text-based logo/wordmark if the actual logo has not yet
been supplied.

------------------------------------------------------------------------

# 9. Homepage

The homepage should be the strongest part of the demo.

Recommended sequence:

1.  Hero
2.  Property search
3.  Featured properties
4.  Property categories
5.  About/company section
6.  Services
7.  Why choose us
8.  Latest properties or secondary property showcase
9.  CTA
10. Contact/map
11. Footer

The exact order may be adjusted during implementation if the final UX is
stronger.

------------------------------------------------------------------------

# 10. Hero

Create a premium full-width hero.

Use:

-   high-quality property/architecture image or video
-   dark overlay where necessary
-   strong headline
-   supporting text
-   primary CTA
-   secondary CTA

Temporary headline may be something like:

"Find a Place Worth Calling Home"

or another broadly applicable demo phrase.

Do not invent a permanent company slogan.

Hero CTA:

-   Explore Properties
-   Contact Us

The hero should feel premium without becoming visually overloaded.

------------------------------------------------------------------------

# 11. Property Search

Create a prominent search interface.

Recommended fields:

-   Location
-   Property Type
-   Listing Type
-   Price range
-   Area

Property type:

-   Residential
-   Commercial
-   Land
-   Plot
-   Flat
-   Villa

Listing type:

-   For Sale
-   For Rent

The search/filtering must actually operate against the demo dataset.

Desktop:

horizontal or compact multi-field search panel.

Mobile:

stack fields vertically.

------------------------------------------------------------------------

# 12. Property Categories

Create a category section for:

-   Residential
-   Commercial
-   Land
-   Plots
-   Flats
-   Villas

Each category should lead to the appropriate property listing/filter.

Example:

`/properties?type=plot`

Do not create separate duplicated page implementations for every
category.

------------------------------------------------------------------------

# 13. Featured Properties

Create a premium property-card system.

Cards should display only relevant information.

Possible information:

-   image
-   title
-   location
-   type
-   sale/rent
-   price
-   area
-   bedrooms/bathrooms where relevant
-   status
-   featured badge

Do not show irrelevant attributes.

For example, a plot should not display bedroom information.

Cards should support:

-   hover image zoom
-   subtle overlay
-   clear CTA
-   accessible clickable area
-   responsive layout

------------------------------------------------------------------------

# 14. Property Listing Page

Route:

`/properties`

Include:

-   page heading
-   search/filter controls
-   result count
-   property grid
-   pagination or load-more strategy if needed

Filtering should work.

The property listing should be usable rather than merely decorative.

Recommended filters:

-   location
-   property type
-   listing type
-   status
-   price
-   area

Only implement filters that correspond to actual available data.

------------------------------------------------------------------------

# 15. Property Detail Page

Route:

`/properties/[slug]`

This is a primary demo page.

Structure:

Large gallery ↓ Title / location ↓ Price / status ↓ Property metadata ↓
Description ↓ Additional details ↓ Location/map ↓ Inquiry CTA

The page should adapt to property type.

For example:

Residential: - bedrooms - bathrooms - area

Land: - area - location - land/plot-specific information

Commercial: - area - usage/type - location

Do not render meaningless empty fields.

------------------------------------------------------------------------

# 16. Property Gallery

Create a reusable responsive gallery.

Desktop:

-   large primary image
-   thumbnails or secondary images

Mobile:

-   responsive gallery suitable for touch

Optional:

-   lightbox
-   fullscreen
-   keyboard navigation

All images require meaningful alt text.

Use demo images until the client provides actual property images.

------------------------------------------------------------------------

# 17. Property Data Model

Use an extensible model.

At minimum support:

-   id
-   title
-   slug
-   description
-   property type
-   listing type
-   status
-   price
-   area
-   address/location information
-   featured
-   createdAt
-   updatedAt

Standard real-estate attributes such as:

-   bedrooms
-   bathrooms
-   parking
-   amenities

may be added where useful for the demo.

These are engineering decisions, not claims about explicit client
requirements.

Avoid forcing every property type into identical fields.

------------------------------------------------------------------------

# 18. Property Images

Use a separate property-image relation rather than embedding an
uncontrolled array directly into the property record.

Support:

-   property ID
-   image URL/storage key
-   alt text
-   sort order

The demo can use URLs or the simplest appropriate media approach.

The architecture should make later migration to proper object storage
possible.

------------------------------------------------------------------------

# 19. Maps

Create a reusable map abstraction.

The property should expose location information to the map component
without coupling the property UI to the map provider.

Possible stored data:

-   address
-   locality
-   city
-   latitude
-   longitude
-   optional external map URL

Do not expose provider API secrets.

If Google Maps credentials are unavailable during the demo, use an
appropriate development fallback while keeping the component boundary
intact.

------------------------------------------------------------------------

# 20. Inquiry System

Create a reusable inquiry form.

Fields:

-   name
-   phone
-   email
-   property
-   message

Validate input.

For the demo, persistence can use PostgreSQL.

The admin can display a basic inquiry list.

Do not build a complete CRM.

------------------------------------------------------------------------

# 21. WhatsApp and Call

Provide clear contact actions.

Use configurable environment/content values.

Do not hardcode invented client phone numbers.

When actual details arrive, they should be replaceable without changing
the component architecture.

------------------------------------------------------------------------

# 22. About Section

Create a premium company section.

Use:

-   kicker
-   heading
-   company description
-   supporting image
-   optional statistics

Until the client supplies actual facts:

Do not invent years, revenue, customer numbers, property counts, awards
or locations.

Use neutral demo content.

------------------------------------------------------------------------

# 23. Services

Create a clean services section.

Possible demo categories:

-   Property Buying
-   Property Selling
-   Property Renting
-   Property Consultation

Treat these as representative/demo content until confirmed by the
client.

Use Lucide icons and subtle interaction states.

------------------------------------------------------------------------

# 24. Why Choose Us

Create a trust-oriented section without unsupported factual claims.

Possible neutral concepts:

-   Local Property Knowledge
-   Transparent Guidance
-   Property Discovery
-   Direct Assistance

Replace with verified client messaging later.

------------------------------------------------------------------------

# 25. Contact Section

Include:

-   contact details
-   address
-   map
-   inquiry form
-   WhatsApp
-   Call Now

Actual client details are pending.

Do not invent them.

------------------------------------------------------------------------

# 26. Footer

Include:

-   brand
-   properties
-   services
-   company
-   contact
-   legal links

Do not create fake social accounts.

------------------------------------------------------------------------

# 27. Admin Demo

The admin exists to prove that the website is backed by a real content
system.

Routes:

-   `/admin/login`
-   `/admin`
-   `/admin/properties`
-   `/admin/properties/new`
-   `/admin/properties/[id]/edit`

Minimum demo functionality:

### Login

-   authentication
-   session
-   protected routes

### Dashboard

Show basic counts such as:

-   total properties
-   featured properties
-   active listings
-   inquiries

Counts should come from real demo data where implemented.

### Property Management

Support:

-   list
-   create
-   edit
-   delete
-   status
-   featured flag
-   image management at the level required for the demo

The critical flow is:

Admin creates property → database → public listing → public detail page

------------------------------------------------------------------------

# 28. Authorization

Use a basic role model.

At minimum:

`ADMIN`

Structure the authorization layer so additional roles can be introduced
later.

Do not implement a complete multi-role management UI for the demo.

------------------------------------------------------------------------

# 29. Database Design

Use PostgreSQL and Drizzle.

Suggested entities:

-   properties
-   property_images
-   inquiries

Additional category/location tables should only be introduced if the
approved architecture plan demonstrates that they provide meaningful
value.

Avoid over-normalizing a small demo.

Use appropriate indexes for:

-   slug
-   property type
-   listing type
-   status
-   city/locality where applicable
-   featured

Use database constraints where appropriate.

------------------------------------------------------------------------

# 30. Demo Seed Data

Create approximately 8--12 demonstration properties.

Ensure variation across:

-   Residential
-   Commercial
-   Land
-   Plot
-   Flat
-   Villa

Use plausible but fictional data.

The demo data must be easy to delete/replace later.

Do not imply that the listings are genuine client inventory.

------------------------------------------------------------------------

# 31. Advertisement Readiness

Create a reusable conceptual `AdSlot` component/abstraction.

Possible placements:

-   between content sections
-   within property listings where appropriate
-   sidebar on desktop
-   responsive banner area

The demo should not contain fake advertisements.

Ads must never dominate the primary property experience.

Do not integrate a production ad provider unless explicitly requested.

------------------------------------------------------------------------

# 32. SEO

Implement:

-   semantic HTML
-   correct heading hierarchy
-   unique page titles
-   meta descriptions
-   canonical URL strategy
-   Open Graph metadata
-   sitemap
-   robots.txt
-   descriptive alt text

Prepare the property-detail architecture for structured data without
fabricating unsupported business facts.

------------------------------------------------------------------------

# 33. Accessibility

Use:

-   semantic elements
-   accessible buttons
-   labels
-   keyboard navigation
-   visible focus states
-   sufficient contrast
-   meaningful alt text
-   appropriate ARIA attributes
-   reduced-motion support

Do not rely on animation to communicate important information.

------------------------------------------------------------------------

# 34. Responsive Design

Test at least:

-   320px
-   375px
-   390px
-   768px
-   1024px
-   1280px
-   1440px

Key adaptations:

Property grid: - desktop: 3 columns where appropriate - tablet: 2
columns - mobile: 1 column

Search: - desktop: compact horizontal layout - mobile: stacked controls

Navigation: - desktop links - mobile menu

Gallery: - desktop multi-image - mobile touch-friendly layout

Forms: - desktop split/structured - mobile single column

------------------------------------------------------------------------

# 35. Performance

The website should remain fast despite premium visuals.

Prioritize:

-   Astro SSR
-   minimal hydration
-   optimized images
-   lazy loading below the fold
-   modern image formats
-   limited client JavaScript
-   restrained GSAP usage

Do not introduce heavy animation libraries beyond the approved stack.

Do not use animation at the cost of performance.

------------------------------------------------------------------------

# 36. Security

Requirements:

-   never commit secrets
-   environment variables for credentials
-   server-side validation
-   authentication on admin routes
-   authorization checks on admin operations
-   parameterized/database-safe queries through Drizzle
-   safe handling of uploaded media
-   no sensitive data exposed to public pages

Do not assume frontend route protection alone is sufficient.

------------------------------------------------------------------------

# 37. Error and Loading States

Implement appropriate states for:

-   property not found
-   empty search results
-   form errors
-   database failures
-   authentication failure
-   unauthorized admin access
-   image loading/failure where practical

The demo should not appear broken when data is missing.

------------------------------------------------------------------------

# 38. Development Milestones

## Milestone 0 --- Planning

Before implementation:

-   inspect repository
-   inspect installed skills
-   confirm architecture
-   propose routes
-   propose database schema
-   identify dependencies
-   identify external credentials
-   identify unresolved questions

Do not code until the plan is reviewed.

------------------------------------------------------------------------

## Milestone 1 --- Visual Foundation

Implement:

-   Astro foundation
-   Tailwind
-   typography
-   design tokens
-   global layout
-   navbar
-   hero
-   footer
-   responsive system

Do not implement CMS yet.

------------------------------------------------------------------------

## Milestone 2 --- Property Experience

Implement:

-   property model
-   demo data
-   property cards
-   featured properties
-   property categories
-   property listing
-   search/filter
-   property detail
-   gallery

At the end of this milestone the public property experience should be
convincing.

------------------------------------------------------------------------

## Milestone 3 --- Data and Contact

Implement:

-   PostgreSQL
-   Drizzle
-   database queries
-   demo seed
-   inquiry persistence
-   inquiry UI
-   map abstraction/integration
-   WhatsApp/Call configuration

------------------------------------------------------------------------

## Milestone 4 --- CMS Proof of Concept

Implement:

-   authentication
-   admin dashboard
-   property CRUD
-   property status
-   featured flag
-   image handling
-   public/database integration

The goal is to demonstrate real content flow, not the complete
production CMS.

------------------------------------------------------------------------

## Milestone 5 --- Polish

Implement/refine:

-   GSAP animations
-   accessibility
-   SEO
-   responsive behavior
-   performance
-   loading/error states
-   AdSlot abstraction
-   visual consistency
-   final client-demo polish

------------------------------------------------------------------------

# 39. Demo Success Criteria

The demo is successful if a client can:

1.  Open a polished homepage.
2.  Understand the business and property offering.
3.  Browse featured properties.
4.  Search/filter properties.
5.  Open a property detail page.
6.  Browse its images.
7.  View its location.
8.  Submit an inquiry.
9.  See contact actions.
10. Open the admin login.
11. Create/edit a property.
12. Save it to PostgreSQL.
13. See the property appear on the public website.

The public-to-admin data flow is more important than implementing every
production CMS screen.

------------------------------------------------------------------------

# 40. Scope Boundaries

Do not implement during the pre-contract demo unless explicitly
approved:

-   complete production CMS
-   full user-management UI
-   advanced reports
-   full CRM
-   marketing automation
-   payments
-   AI recommendations
-   complex analytics
-   Redis
-   message queues
-   microservices
-   multi-tenancy
-   production ad monetization
-   full blog/news CMS
-   advanced notification infrastructure

The demo should remain small enough to develop and validate quickly.

------------------------------------------------------------------------

# 41. Final Quality Standard

The final result should feel like:

-   a credible professional real-estate website
-   a custom client presentation
-   a premium but usable property catalogue
-   a real application rather than a static mockup

It should not feel like:

-   a generic Bootstrap site
-   an unmodified template
-   an AI-generated collection of sections
-   an over-engineered enterprise system
-   a luxury-only property site that cannot accommodate normal land,
    plots, flats, residential or commercial listings

The design references are inspiration only.

The client's requirements and the demo success criteria are the
functional source of truth.
