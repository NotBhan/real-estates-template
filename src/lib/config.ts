/**
 * Centralized configuration reader.
 * All environment variable access goes through this module.
 * Never import process.env directly in components or pages.
 */

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
  siteUrl: env('SITE_URL', 'http://localhost:4321'),

  /** Contact details — all optional, buttons disabled when absent */
  contactPhone: envOptional('CONTACT_PHONE'),
  contactWhatsapp: envOptional('CONTACT_WHATSAPP'),
  contactEmail: envOptional('CONTACT_EMAIL'),

  /** Google Maps — Leaflet/OSM fallback when absent */
  googleMapsApiKey: envOptional('GOOGLE_MAPS_API_KEY'),

  /** Brand — temporary demo values until client supplies real content */
  brand: {
    name: 'Maa Laxmi Property',
    tagline: 'Find a Place Worth Calling Home', // demo tagline, not a client slogan
  },
} as const;
