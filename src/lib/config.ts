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
  /** Site URL for canonical links, sitemap, OG tags */
  get siteUrl() {
    return env('SITE_URL', 'http://localhost:4321');
  },

  /** Contact details — CMS settings override env variables */
  get contactPhone() {
    const cmsPhone = getSiteSettings().contact.phone;
    return cmsPhone || envOptional('CONTACT_PHONE');
  },

  get contactWhatsapp() {
    const cmsWhatsapp = getSiteSettings().contact.whatsapp;
    return cmsWhatsapp || envOptional('CONTACT_WHATSAPP');
  },

  get contactEmail() {
    const cmsEmail = getSiteSettings().contact.email;
    return cmsEmail || envOptional('CONTACT_EMAIL');
  },

  /** Google Maps — Leaflet/OSM fallback when absent */
  get googleMapsApiKey() {
    return envOptional('GOOGLE_MAPS_API_KEY');
  },

  /** Brand — Dynamic CMS brand settings */
  get brand() {
    const settings = getSiteSettings();
    return {
      name: settings.brand.name || 'Maa Laxmi Property',
      tagline: settings.brand.tagline || 'Find a Place Worth Calling Home',
      logoUrl: settings.brand.logoUrl,
      faviconUrl: settings.brand.faviconUrl || '/favicon.svg',
    };
  },
};

