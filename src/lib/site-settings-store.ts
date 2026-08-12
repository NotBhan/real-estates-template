export interface SiteSettings {
  brand: {
    name: string;
    tagline: string;
    logoUrl?: string;
    faviconUrl?: string;
  };
  contact: {
    phone?: string;
    whatsapp?: string;
    email?: string;
    address: string;
    locality: string;
    city: string;
  };
  map: {
    latitude: number;
    longitude: number;
    title: string;
    address: string;
  };
  hero: {
    title: string;
    subtitle: string;
    bannerImage: string;
    ctaText: string;
  };
  about: {
    headline: string;
    subtitle: string;
    philosophyQuote: string;
  };
}

const defaultSettings: SiteSettings = {
  brand: {
    name: 'Maa Laxmi Property',
    tagline: 'Find a Place Worth Calling Home',
    logoUrl: '',
    faviconUrl: '/favicon.svg',
  },
  contact: {
    phone: '',
    whatsapp: '',
    email: '',
    address: 'Commercial Hub, Sector 62',
    locality: 'Noida',
    city: 'Delhi NCR',
  },
  map: {
    latitude: 28.628,
    longitude: 77.3649,
    title: 'Maa Laxmi Property Office',
    address: 'Commercial Hub, Sector 62, Noida, Delhi NCR',
  },
  hero: {
    title: 'Find a Place Worth Calling Home',
    subtitle: 'Explore handpicked residential homes, commercial complexes, and investment land holdings across Delhi NCR.',
    bannerImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85',
    ctaText: 'Explore Properties',
  },
  about: {
    headline: 'Dedicated Property Advisors Across Delhi NCR',
    subtitle: 'Bridging property buyers, sellers, and investors with verified listings, strategic land intelligence, and transparent advisory services.',
    philosophyQuote: 'Property is not simply space. It is where life takes shape.',
  },
};

// Global in-memory persistence store across Astro SSR requests
declare global {
  var __SITE_SETTINGS_STORE__: SiteSettings | undefined;
}

export function getSiteSettings(): SiteSettings {
  if (!globalThis.__SITE_SETTINGS_STORE__) {
    globalThis.__SITE_SETTINGS_STORE__ = { ...defaultSettings };
  }
  return globalThis.__SITE_SETTINGS_STORE__;
}

export function updateSiteSettings(partialSettings: Partial<SiteSettings>): SiteSettings {
  const current = getSiteSettings();
  
  const updated: SiteSettings = {
    brand: { ...current.brand, ...partialSettings.brand },
    contact: { ...current.contact, ...partialSettings.contact },
    map: { ...current.map, ...partialSettings.map },
    hero: { ...current.hero, ...partialSettings.hero },
    about: { ...current.about, ...partialSettings.about },
  };

  globalThis.__SITE_SETTINGS_STORE__ = updated;
  return updated;
}
