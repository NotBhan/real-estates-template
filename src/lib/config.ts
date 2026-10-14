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
