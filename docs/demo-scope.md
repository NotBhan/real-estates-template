# Maa Laxmi Property --- Demo Scope

## Objective

Build a pre-contract demonstration that proves the proposed website
concept and core property-management workflow.

This is not the complete production implementation.

The demo should maximize client-facing impact while keeping development
small enough to complete and validate quickly.

------------------------------------------------------------------------

## Must Have

### Public Website

-   Premium responsive homepage
-   Navigation
-   Hero
-   Property search
-   Property categories
-   Featured properties
-   Property listing page
-   Property filtering
-   Property detail page
-   Property image gallery
-   Property location/map experience
-   Inquiry/contact form
-   WhatsApp/Call action structure
-   Footer

### Admin

-   Admin login
-   Protected admin area
-   Basic dashboard
-   Property list
-   Add property
-   Edit property
-   Delete property
-   Property status
-   Featured property flag
-   Basic image management

### Data

-   PostgreSQL
-   Drizzle ORM
-   Seeded demonstration properties
-   Real database flow between CMS and public website

------------------------------------------------------------------------

## Should Have

-   GSAP entrance animations
-   Scroll-triggered reveals
-   SEO metadata
-   sitemap
-   robots.txt
-   accessibility polish
-   performance optimization
-   basic inquiry persistence
-   reusable AdSlot abstraction
-   useful loading/error states

------------------------------------------------------------------------

## Deferred

Do not implement the following as full production features during the
demo:

-   complete content CMS
-   full banner/slider management
-   complete location-management UI
-   complete land/plot administration system
-   full lead-management CRM
-   advanced reporting
-   optional user-management system
-   production advertising integration
-   payment systems
-   analytics platform
-   marketing automation
-   blog/news CMS
-   AI features
-   complex notifications
-   microservices
-   Redis
-   message queues
-   multi-tenancy

------------------------------------------------------------------------

## Golden Demonstration Flow

### Public

Home → Explore Properties → Search/Filter → Property Listing → Property
Detail → Gallery → Map → Inquiry

### Admin

Login → Dashboard → Properties → Add Property → Save → Database → Public
Property Listing → Property Detail

This end-to-end flow is the most important functional proof in the demo.

------------------------------------------------------------------------

## Demo Data Rules

Use 8--12 fictional demonstration properties.

Include:

-   Residential
-   Commercial
-   Land
-   Plot
-   Flat
-   Villa

Use realistic-looking but clearly fictional information.

Do not use fake company statistics as if they were true.

Do not imply that demonstration properties are genuine client listings.

------------------------------------------------------------------------

## Client Data Rules

Actual client content is pending.

Do not block the demo waiting for:

-   final logo
-   final tagline
-   company description
-   actual property inventory
-   actual property images
-   contact details
-   social accounts

Use clearly identified temporary content until supplied.

Once the client provides real information, replace demo content without
changing the underlying architecture unnecessarily.

------------------------------------------------------------------------

## Definition of Done

The demo is ready for client review when:

-   public pages are responsive
-   property search works
-   filters work
-   property details work
-   gallery works
-   map experience works or has a clearly functioning development
    fallback
-   inquiry flow works
-   admin authentication works
-   property CRUD works
-   database persistence works
-   newly created properties appear publicly
-   no obvious TypeScript/build errors remain
-   critical responsive layouts have been checked
-   no invented client facts are presented as real
