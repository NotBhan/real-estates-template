# Maa Laxmi Property --- Project Requirements

## 1. Project Status

**Client:** Maa Laxmi Property Consultant

**Current phase:** Pre-contract demonstration

This document contains requirements extracted from the supplied
quotation and additional requirements explicitly discussed during
development planning.

It is not a transcript of the quotation and does not claim to contain
information that the client has not supplied.

The objective at this stage is to create a convincing working
demonstration, not the complete production system.

------------------------------------------------------------------------

## 2. Public Website Requirements

The quotation describes a modern, responsive, mobile-friendly
real-estate website.

The public website requirements include:

-   Home
-   About
-   Contact
-   Services
-   Property Listings
-   Property Search & Filters
-   Property Details
-   Property Image Gallery
-   Featured Properties
-   Latest Properties
-   Inquiry / Contact Forms
-   Google Maps Integration
-   WhatsApp button
-   Call Now button
-   SEO-friendly structure
-   Social media integration

These are the functional requirements that the demo should represent.

------------------------------------------------------------------------

## 3. Property Catalogue

The quotation identifies the following property categories:

-   Residential
-   Commercial
-   Land
-   Plots
-   Flats
-   Villas

The website should support property discovery across these categories.

The quotation also identifies:

-   Property status
-   Property locations
-   Property images and galleries
-   Land and plot management

The exact property fields beyond these requirements are an engineering
decision and should be designed to support a realistic property
catalogue.

------------------------------------------------------------------------

## 4. Property Listing Experience

The proposed public experience should allow visitors to:

-   Browse properties
-   Search properties
-   Filter properties
-   Open an individual property
-   View property images
-   View relevant property information
-   View property location
-   Contact the business about a property

The exact filter set is an implementation decision, but should be
appropriate for the property categories above.

------------------------------------------------------------------------

## 5. Property Status

The quotation explicitly mentions statuses such as:

-   For Sale
-   Rent
-   Sold

The implementation should represent listing/status information clearly.

Do not invent additional business statuses unless there is a clear
technical reason to do so.

------------------------------------------------------------------------

## 6. Property Maps

Google Maps integration is explicitly required by the quotation.

The demo should demonstrate the intended property-location experience.

Because actual client property data has not yet been supplied:

-   Use demonstration locations.
-   Do not represent fictional properties as genuine client listings.
-   Keep map integration replaceable/configurable.
-   Do not expose API credentials.

The final production implementation can be connected to the client's
actual property locations after those are supplied.

------------------------------------------------------------------------

## 7. Inquiry and Contact

The quotation requires inquiry/contact functionality.

The public website should provide a clear way for a visitor to enquire
about a property or contact the business.

The quotation also explicitly includes:

-   WhatsApp
-   Call Now

Actual phone/WhatsApp/email information is currently unknown and must
not be fabricated.

Use clearly marked demo values or disabled/configurable actions until
the client supplies the real details.

------------------------------------------------------------------------

## 8. Admin CMS --- Production Requirements

The quotation proposes an Admin CMS containing:

-   Secure Admin Login
-   Dashboard Overview
-   Add / Edit / Delete Properties
-   Property Category Management
-   Location Management
-   Property Images & Gallery Management
-   Land & Plot Management
-   Property Status Management
-   Inquiry Management
-   Customer Lead Management
-   Website Content Management
-   Banner & Slider Management
-   User Management (Optional)
-   Reports & Monitoring Dashboard

These describe the eventual production scope.

They do not mean every item must be implemented in the pre-contract
demo.

------------------------------------------------------------------------

## 9. Additional Advertisement Requirement

A website advertisement requirement was added after the original
quotation.

This is therefore treated as an additional project requirement rather
than as something stated in the original quotation.

For the demo:

-   The design must be advertisement-ready.
-   Ad placements must not destroy the visual hierarchy.
-   A reusable ad-slot abstraction may be implemented.
-   Do not populate the demo with fake advertisements.
-   Do not implement a production advertising provider unless explicitly
    needed.

Production ad-provider configuration, monetization, policy compliance,
and account setup are outside the current demo unless separately
requested.

------------------------------------------------------------------------

## 10. SEO and Social Requirements

The quotation requires an SEO-friendly website structure and social
media integration.

For the demo, implement the technical SEO foundation:

-   semantic HTML
-   correct heading hierarchy
-   page titles
-   meta descriptions
-   canonical strategy where appropriate
-   Open Graph metadata
-   sitemap
-   robots.txt
-   descriptive image alt text

Actual social media accounts and URLs are currently unknown.

Do not invent them.

------------------------------------------------------------------------

## 11. Original Quotation Technology

The supplied quotation proposes:

### Frontend

-   HTML5
-   CSS3
-   Bootstrap 5 / Tailwind CSS
-   JavaScript
-   jQuery
-   Responsive UI design

### Backend

-   Laravel Framework
-   PHP 8+
-   MySQL
-   RESTful architecture
-   Secure authentication and authorization

The quotation also gives a production estimate of 20--25 working days.

These are the original proposal, not immutable technical requirements
for the current demo.

The revised implementation stack is defined in
`docs/implementation-spec.md`.

------------------------------------------------------------------------

## 12. Commercial Information

The quotation states a one-time development cost of ₹8,000 and includes
a one-year package covering hosting, SSL, one official email account
under the stated condition, maintenance, server handling and technical
support.

It states:

-   Server renewal after one year: ₹1,800/year
-   Maintenance after one year: 15% of the total service cost annually
-   50% advance before project start
-   50% final payment after project completion and before deployment

These commercial terms are contextual information only.

They are not technical constraints on the demo.

------------------------------------------------------------------------

## 13. Client Information Not Yet Available

The following information has not been reliably supplied yet:

-   Final logo/assets
-   Final tagline
-   Company description
-   Final service descriptions
-   Phone number
-   WhatsApp number
-   Email
-   Office address
-   Social media URLs
-   Actual property inventory
-   Actual property photographs
-   Actual property locations
-   Verified company statistics
-   Final branding/content copy

Do not invent these.

The demo should use clearly identifiable temporary content where
necessary.

------------------------------------------------------------------------

## 14. Demo Property Data

Because the actual property inventory is not yet available, use a small
fictional demonstration dataset.

The dataset should represent multiple categories:

-   Residential
-   Commercial
-   Land
-   Plot
-   Flat
-   Villa

The demo should contain enough properties to make search/filtering and
property discovery feel real.

All demonstration properties must be treated as fictional sample data.

------------------------------------------------------------------------

## 15. Design References

Two external references have been evaluated.

### Luxonn / Luxury Real Estate

Use as visual inspiration for:

-   cinematic hero treatment
-   large architectural/property imagery
-   premium editorial layouts
-   dark sections
-   restrained gold accents
-   sophisticated motion
-   premium property presentation

### Northline Commercial

Use as visual inspiration for:

-   professional real-estate information architecture
-   structured property cards
-   services
-   business-oriented sections
-   clear calls to action
-   property discovery

Neither reference is the client's brand.

Do not copy:

-   Luxonn or Northline branding
-   fictional statistics
-   fictional company names
-   fictional locations
-   template-specific claims
-   template-specific content

The resulting demo must be a custom Maa Laxmi Property design.

------------------------------------------------------------------------

## 16. Confirmed vs Unknown

### Confirmed from the quotation

-   Real-estate website
-   Responsive/mobile-friendly design
-   Property listings
-   Search/filtering
-   Property details
-   Image galleries
-   Featured/latest properties
-   Property categories
-   Property locations
-   Property statuses
-   Land/plot management
-   Inquiry/contact
-   Google Maps
-   WhatsApp
-   Call Now
-   SEO-friendly structure
-   Social integration
-   Admin CMS concept
-   Property CRUD
-   CMS property/category/location/image/status functionality

### Explicitly added during planning

-   Website advertisement requirement
-   Current preference for Astro-based implementation
-   Current preference for PostgreSQL
-   Pre-contract demo as the immediate objective

### Engineering decisions

-   Exact database schema
-   Exact property fields
-   Exact route structure
-   Exact authentication implementation
-   Component architecture
-   Animation implementation
-   Map abstraction
-   AdSlot implementation
-   Demo dataset structure

### Unknown / pending client input

-   Actual branding
-   Actual content
-   Actual contact information
-   Actual property inventory
-   Actual property images
-   Actual property locations
-   Actual social accounts
-   Verified company statistics
