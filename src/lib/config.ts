/**
 * Centralized Template & Brand Configuration
 *
 * Single source of truth for template identity, brand settings,
 * client configuration, and demonstration disclosures.
 */
import { getSiteSettings } from './site-settings-store';

function env(key: string, fallback?: string): string {
  const value = import.meta.env[key] ?? process.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function envOptional(key: string): string | undefined {
  return import.meta.env[key] ?? process.env[key] ?? undefined;
}

export const config = {
  /** Template Mode flag: when enabled, site operates as a demonstration template */
  templateMode: true,

  /** Core Brand & Identity */
  get siteName(): string {
    const cmsName = getSiteSettings().brand.name;
    return cmsName || 'Estate Atelier';
  },

  get tagline(): string {
    const cmsTagline = getSiteSettings().brand.tagline;
    return cmsTagline || 'A premium digital experience for real estate.';
  },

  siteDescription:
    'A premium real-estate website template demonstrating residential, commercial, land, and rental property discovery with architectural refinement.',

  logoText: 'Estate Atelier',

  brandInitials: 'EA',

  /** Demonstration Disclosure Notice */
  demoDisclosure:
    'Website concept by Estate Atelier. Property listings and business details are demonstration content.',

  /** Site URL for canonical links, sitemap, OG tags */
  get siteUrl(): string {
    return env('SITE_URL', 'http://localhost:4321');
  },

  /** Locale & Currency */
  currency: 'INR' as const,
  currencySymbol: '₹',
  locale: 'en-IN',

  /** Demonstration Service Area */
  serviceArea: 'Metropolitan Corridors & Regional Markets',

  /** Demonstration Address */
  get address(): string {
    const cmsAddress = getSiteSettings().contact.address;
    return cmsAddress || 'Atelier Studio Suite, Architecture Boulevard';
  },

  /** Contact Information — explicit demo placeholders when unconfigured */
  get phone(): string | undefined {
    const cmsPhone = getSiteSettings().contact.phone;
    return cmsPhone || envOptional('CONTACT_PHONE');
  },

  get whatsapp(): string | undefined {
    const cmsWhatsapp = getSiteSettings().contact.whatsapp;
    return cmsWhatsapp || envOptional('CONTACT_WHATSAPP');
  },

  get email(): string | undefined {
    const cmsEmail = getSiteSettings().contact.email;
    return cmsEmail || envOptional('CONTACT_EMAIL');
  },

  /** Backward-compatible contact getters */
  get contactPhone(): string | undefined {
    return this.phone;
  },

  get contactWhatsapp(): string | undefined {
    return this.whatsapp;
  },

  get contactEmail(): string | undefined {
    return this.email;
  },

  /** Google Maps — Leaflet/OSM fallback when absent */
  get googleMapsApiKey(): string | undefined {
    return envOptional('GOOGLE_MAPS_API_KEY');
  },

  /**
   * Indian Legal & Business Compliance Configuration
   *
   * Central typed configuration for regulatory disclosures, data protection,
   * RERA agent registration, and grievance redressal under Indian law.
   * If client legal details are missing, marked as Pending to prevent fabrication.
   */
  legal: {
    /** Public trading name */
    get publicTradingName(): string {
      return getSiteSettings().brand.name || 'Estate Atelier';
    },

    /** Formal registered business entity name (undefined until confirmed by client) */
    get legalBusinessName(): string | undefined {
      return envOptional('LEGAL_BUSINESS_NAME');
    },

    /** Business entity structure */
    get entityType(): string {
      return (
        envOptional('BUSINESS_ENTITY_TYPE') ||
        'Real-Estate Demonstration Template (Legal Entity Pending Client Onboarding)'
      );
    },

    /** Registered or principal place of business */
    get registeredAddress(): string {
      return (
        envOptional('REGISTERED_ADDRESS') ||
        'Atelier Studio Suite, Architecture Boulevard, Central Design District'
      );
    },

    /** Operational state and jurisdiction */
    get operatingState(): string {
      return envOptional('OPERATING_STATE') || 'National Capital Region & Uttar Pradesh';
    },

    country: 'India' as const,

    /** Privacy inquiry contact */
    get privacyEmail(): string {
      return envOptional('PRIVACY_EMAIL') || 'privacy@estateatelier.demo';
    },

    /** Grievance Redressal Officer under IT Rules 2021 & DPDP Act 2023 */
    get grievance() {
      return {
        officerName: envOptional('GRIEVANCE_OFFICER_NAME') || 'Compliance & Grievance Desk',
        designation: envOptional('GRIEVANCE_OFFICER_DESIGNATION') || 'Grievance Redressal Officer',
        email: envOptional('GRIEVANCE_EMAIL') || 'grievance@estateatelier.demo',
        phone: envOptional('GRIEVANCE_PHONE') || envOptional('CONTACT_PHONE'),
        address:
          envOptional('GRIEVANCE_ADDRESS') ||
          'Atelier Studio Suite, Architecture Boulevard, Central Design District',
        responseTimeDays: 15, // Standard statutory requirement under Indian IT Intermediary Rules
      };
    },

    /** Real Estate (Regulation and Development) Act, 2016 (RERA) Disclosures */
    get rera() {
      const regNo = envOptional('RERA_AGENT_REG_NO');
      return {
        agentRegistrationNo: regNo,
        stateAuthority: envOptional('RERA_STATE_AUTHORITY') || 'UP RERA / Respective State Authorities',
        portalUrl: envOptional('RERA_PORTAL_URL') || 'https://www.up-rera.in',
        registrationStatus: regNo
          ? ('Registered' as const)
          : ('Demonstration Template (RERA Agent Registration to be provided by operating agency)' as const),
      };
    },

    /** Applicable operational role in real estate transactions */
    get businessRole(): string {
      return (
        envOptional('BUSINESS_ROLE') ||
        'Real Estate Advisory & Listing Showcase (Digital Demonstration Template)'
      );
    },

    /** Legal Policies Effective & Revision Dates (ISO format) */
    effectiveDates: {
      privacyPolicy: '2026-03-01',
      privacyPolicyLastUpdated: '2026-10-14',
      termsAndConditions: '2026-03-01',
      termsLastUpdated: '2026-10-14',
      cookiePolicy: '2026-03-01',
      cookiePolicyLastUpdated: '2026-10-14',
      disclaimerLastUpdated: '2026-10-14',
    },

    /** Production domain */
    get productionDomain(): string {
      return env('PRODUCTION_DOMAIN', 'real-estates-ashen-chi.vercel.app');
    },
  },

  /** Brand object for components using config.brand */
  get brand() {
    const settings = getSiteSettings();
    return {
      name: this.siteName,
      tagline: this.tagline,
      initials: this.brandInitials,
      logoUrl: settings.brand.logoUrl,
      faviconUrl: settings.brand.faviconUrl || '/favicon.svg',
    };
  },
};
