/**
 * Mock Property Assistant Engine
 *
 * Client demonstration conversational engine.
 * Pure deterministic client-side matching using the demo property dataset.
 * No external API or real LLM is used.
 */

import type { Property } from '@/types/property';
import { hasRoomInfo, isCommercial, isLandLike } from '@/types/property';
import { formatPrice, formatArea } from '@/lib/format';

export interface AssistantAction {
  label: string;
  href: string;
  primary?: boolean;
}

export interface AssistantPropertyRecommendation {
  id: string;
  title: string;
  slug: string;
  priceFormatted: string;
  location: string;
  propertyType: string;
  listingType: string;
  status: string;
  imageUrl?: string;
  imageAlt?: string;
  specs: string[];
}

export interface AssistantResponse {
  text: string;
  properties?: AssistantPropertyRecommendation[];
  actions?: AssistantAction[];
  quickReplies?: string[];
}

export const INITIAL_QUICK_REPLIES = [
  'Find a villa',
  'Properties for rent',
  'Residential properties',
  'Explore land and plots',
  'Help me choose',
];

/**
 * Format a single property for compact card presentation in the assistant.
 */
export function formatPropertyForAssistant(property: Property): AssistantPropertyRecommendation {
  const specs: string[] = [];

  if (hasRoomInfo(property)) {
    specs.push(`${property.bedrooms} Beds`);
    specs.push(`${property.bathrooms} Baths`);
    specs.push(formatArea(property.area.value, property.area.unit));
  } else if (isCommercial(property)) {
    specs.push(property.commercialType);
    specs.push(formatArea(property.area.value, property.area.unit));
    if (property.parking) {
      specs.push(`${property.parking} Parking`);
    }
  } else if (isLandLike(property)) {
    specs.push(formatArea(property.area.value, property.area.unit));
    if (property.facing) {
      specs.push(`${property.facing} Facing`);
    }
    if (property.roadWidth) {
      specs.push(`${property.roadWidth} Road`);
    }
  }

  return {
    id: property.id,
    title: property.title,
    slug: property.slug,
    priceFormatted: formatPrice(property.price, property.priceInterval),
    location: `${property.location.locality}, ${property.location.city}`,
    propertyType: property.propertyType,
    listingType: property.listingType,
    status: property.status,
    imageUrl: property.images[0]?.url,
    imageAlt: property.images[0]?.alt || property.title,
    specs,
  };
}

/**
 * Known locations in demo dataset for location matching.
 */
interface LocationMatch {
  name: string;
  queryParam: string;
}

const KNOWN_LOCATIONS: LocationMatch[] = [
  { name: 'Kesarpur', queryParam: 'Kesarpur' },
  { name: 'Navrangpur', queryParam: 'Navrangpur' },
  { name: 'Dharamgarh', queryParam: 'Dharamgarh' },
  { name: 'Green Valley', queryParam: 'Green Valley' },
  { name: 'Sunrise Nagar', queryParam: 'Sunrise Nagar' },
  { name: 'Patel Chowk', queryParam: 'Patel Chowk' },
  { name: 'Heritage Colony', queryParam: 'Heritage Colony' },
  { name: 'Kisan Nagar', queryParam: 'Kisan Nagar' },
  { name: 'Greenfield', queryParam: 'Greenfield' },
  { name: 'Sarovar Road', queryParam: 'Sarovar Road' },
  { name: 'Palm Estate', queryParam: 'Palm Estate' },
  { name: 'Bazaar Square', queryParam: 'Bazaar Square' },
  { name: 'Civil Lines', queryParam: 'Civil Lines' },
];

/**
 * Parse budget amounts in INR from text query.
 * Handles formats like:
 * - 70 lakh, 70L, 70 lac, 70 lakhs
 * - 1.5 cr, 2 crore, 1 cr
 * - 25k, 25 thousand, 25000
 */
function extractBudgetInRupees(text: string): { amount: number; formatted: string } | null {
  const clean = text.toLowerCase();

  // Match Crores: e.g. "1.5 cr", "1 crore", "2 crores"
  const crMatch = clean.match(/(?:under|below|less than|within|budget of|upto|up to)?\s*(?:₹|rs\.?|inr)?\s*(\d+(?:\.\d+)?)\s*(?:cr|crore|crores)\b/i);
  if (crMatch && crMatch[1]) {
    const val = parseFloat(crMatch[1]);
    const amount = Math.round(val * 1_00_00_000);
    return { amount, formatted: `₹${val} Cr` };
  }

  // Match Lakhs: e.g. "70 lakh", "70l", "65 lacs", "80 lakhs"
  const lakhMatch = clean.match(/(?:under|below|less than|within|budget of|upto|up to)?\s*(?:₹|rs\.?|inr)?\s*(\d+(?:\.\d+)?)\s*(?:l|lac|lacs|lakh|lakhs)\b/i);
  if (lakhMatch && lakhMatch[1]) {
    const val = parseFloat(lakhMatch[1]);
    const amount = Math.round(val * 1_00_000);
    return { amount, formatted: `₹${val} Lakh` };
  }

  // Match Thousands: e.g. "25k", "30 thousand", "45k"
  const kMatch = clean.match(/(?:under|below|less than|within|budget of|upto|up to)?\s*(?:₹|rs\.?|inr)?\s*(\d+(?:\.\d+)?)\s*(?:k|thousand|thousands)\b/i);
  if (kMatch && kMatch[1]) {
    const val = parseFloat(kMatch[1]);
    const amount = Math.round(val * 1_000);
    return { amount, formatted: `₹${val}K` };
  }

  // Raw numeric amounts: e.g. "7000000", "50000"
  const numMatch = clean.match(/(?:under|below|less than|within|budget of|upto|up to)\s*(?:₹|rs\.?|inr)?\s*([0-9]{4,10})/i);
  if (numMatch && numMatch[1]) {
    const amount = parseInt(numMatch[1], 10);
    return { amount, formatted: formatPrice(amount) };
  }

  return null;
}

/**
 * Main response generation function.
 * Matches user message against structured rules and demo property dataset.
 */
export function generateAssistantResponse(
  userMessage: string,
  allProperties: Property[],
): AssistantResponse {
  const raw = userMessage.trim();
  const lower = raw.toLowerCase();

  if (!raw) {
    return {
      text: "I didn't catch that. How can I help you find a property today?",
      quickReplies: INITIAL_QUICK_REPLIES,
    };
  }

  // 1. HELP & CAPABILITIES
  if (
    lower === 'help' ||
    lower === 'help me choose' ||
    lower.includes('what can you do') ||
    lower.includes('how does this work') ||
    lower.includes('how to use') ||
    lower.includes('can you help')
  ) {
    return {
      text: "I'm a demo assistant using sample property data. I can help you explore our listings by property type (villas, flats, commercial, land), listing type (buy or rent), budget (e.g. 'What can I get under ₹70 lakh?'), or location. What type of property are you interested in?",
      quickReplies: [
        'Find a villa',
        'Properties for rent',
        'Residential properties',
        'Explore land and plots',
        'Under ₹70 Lakh',
      ],
      actions: [
        { label: 'Browse full catalogue', href: '/properties', primary: true },
        { label: 'Contact us', href: '/contact' },
      ],
    };
  }

  // 2. SPECIFIC COMBINED INTENT: FLATS FOR RENT / RENT A FLAT
  if (
    (lower.includes('rent') || lower.includes('rental') || lower.includes('lease')) &&
    (lower.includes('flat') || lower.includes('apartment') || lower.includes('bhk'))
  ) {
    const matching = allProperties.filter(
      (p) => p.listingType === 'Rent' && p.propertyType === 'Flat' && p.status === 'Available',
    );

    if (matching.length > 0) {
      return {
        text: "Here are the flats available for rent in our sample listings:",
        properties: matching.slice(0, 3).map(formatPropertyForAssistant),
        actions: [
          { label: 'Browse rental flats', href: '/properties?listing=Rent&type=Flat', primary: true },
          { label: 'View all rentals', href: '/properties?listing=Rent' },
        ],
        quickReplies: ['Under ₹30K rent', 'Furnished 2BHK', 'Find a villa'],
      };
    }
  }

  // 3. VILLAS
  if (
    lower.includes('villa') ||
    lower.includes('villas') ||
    lower.includes('bungalow') ||
    lower.includes('luxury home')
  ) {
    const matching = allProperties.filter((p) => p.propertyType === 'Villa');
    // Prefer available ones first
    const sorted = [...matching].sort((a, b) => (a.status === 'Available' && b.status !== 'Available' ? -1 : 1));

    return {
      text: "Here are the villa listings available in this demo:",
      properties: sorted.slice(0, 3).map(formatPropertyForAssistant),
      actions: [
        { label: 'View all villas', href: '/properties?type=Villa', primary: true },
        { label: 'Browse full catalogue', href: '/properties' },
      ],
      quickReplies: ['Flats for sale', 'Properties for rent', 'Under ₹2 Crore'],
    };
  }

  // 4. FLATS / APARTMENTS (SALE OR GENERAL)
  if (
    lower.includes('flat') ||
    lower.includes('flats') ||
    lower.includes('apartment') ||
    lower.includes('apartments') ||
    lower.includes('2bhk') ||
    lower.includes('3bhk') ||
    lower.includes('bhk')
  ) {
    const matching = allProperties.filter((p) => p.propertyType === 'Flat');

    return {
      text: "Here are the apartment and flat listings in our demo catalogue:",
      properties: matching.slice(0, 3).map(formatPropertyForAssistant),
      actions: [
        { label: 'View all flats', href: '/properties?type=Flat', primary: true },
        { label: 'Flats for rent', href: '/properties?listing=Rent&type=Flat' },
      ],
      quickReplies: ['Find a villa', 'Properties for rent', 'Under ₹70 Lakh'],
    };
  }

  // 5. COMMERCIAL PROPERTIES
  if (
    lower.includes('commercial') ||
    lower.includes('office') ||
    lower.includes('shop') ||
    lower.includes('showroom') ||
    lower.includes('warehouse') ||
    lower.includes('retail')
  ) {
    const matching = allProperties.filter((p) => p.propertyType === 'Commercial');

    return {
      text: "Here are our commercial property listings, including office and showroom spaces:",
      properties: matching.slice(0, 3).map(formatPropertyForAssistant),
      actions: [
        { label: 'Browse commercial', href: '/properties?type=Commercial', primary: true },
        { label: 'Full catalogue', href: '/properties' },
      ],
      quickReplies: ['Properties for rent', 'Properties for sale', 'Help me choose'],
    };
  }

  // 6. LAND AND PLOTS
  if (
    lower.includes('land') ||
    lower.includes('plot') ||
    lower.includes('plots') ||
    lower.includes('farmland') ||
    lower.includes('agricultural')
  ) {
    const matching = allProperties.filter(
      (p) => p.propertyType === 'Land' || p.propertyType === 'Plot',
    );

    return {
      text: "Here are land parcels and residential plots available in our demo dataset:",
      properties: matching.slice(0, 3).map(formatPropertyForAssistant),
      actions: [
        { label: 'Explore land', href: '/properties?type=Land', primary: true },
        { label: 'Explore plots', href: '/properties?type=Plot' },
      ],
      quickReplies: ['Residential properties', 'Find a villa', 'Under ₹35 Lakh'],
    };
  }

  // 7. RENTAL PROPERTIES (GENERAL)
  if (
    lower === 'properties for rent' ||
    lower.includes('for rent') ||
    lower.includes('to rent') ||
    lower.includes('renting') ||
    lower.includes('rentals') ||
    lower.includes('rental')
  ) {
    const matching = allProperties.filter(
      (p) => p.listingType === 'Rent' && p.status === 'Available',
    );

    return {
      text: "Here are the properties currently available for rent in our sample listings:",
      properties: matching.slice(0, 3).map(formatPropertyForAssistant),
      actions: [
        { label: 'Browse rental properties', href: '/properties?listing=Rent', primary: true },
        { label: 'View all properties', href: '/properties' },
      ],
      quickReplies: ['Flats for rent', 'Rent under ₹25K', 'Find a villa'],
    };
  }

  // 8. PROPERTIES FOR SALE / BUY
  if (
    lower === 'properties for sale' ||
    lower.includes('for sale') ||
    lower.includes('to buy') ||
    lower.includes('buy a home') ||
    lower.includes('buy property') ||
    lower.includes('purchase')
  ) {
    const matching = allProperties.filter(
      (p) => p.listingType === 'Sale' && p.status === 'Available',
    );

    return {
      text: "Here are properties available for purchase in our sample listings:",
      properties: matching.slice(0, 3).map(formatPropertyForAssistant),
      actions: [
        { label: 'Browse properties for sale', href: '/properties?listing=Sale', primary: true },
        { label: 'Full catalogue', href: '/properties' },
      ],
      quickReplies: ['Find a villa', 'Flats for sale', 'Residential properties'],
    };
  }

  // 9. RESIDENTIAL PROPERTIES (GENERAL)
  if (
    lower.includes('residential') ||
    lower.includes('family home') ||
    lower.includes('independent house')
  ) {
    const matching = allProperties.filter(
      (p) =>
        p.propertyType === 'Residential' ||
        p.propertyType === 'Villa' ||
        p.propertyType === 'Flat',
    );

    return {
      text: "Here are our sample residential properties, including independent houses, villas, and apartments:",
      properties: matching.slice(0, 3).map(formatPropertyForAssistant),
      actions: [
        { label: 'Browse residential', href: '/properties?type=Residential', primary: true },
        { label: 'View all villas', href: '/properties?type=Villa' },
      ],
      quickReplies: ['Find a villa', 'Flats for sale', 'Properties for rent'],
    };
  }

  // 10. BUDGET / PRICE QUESTIONS (e.g. "under 70 lakh", "under ₹70 lakh", "below 1 cr", "budget 80L")
  const budget = extractBudgetInRupees(lower);
  if (budget) {
    // If budget is under 1,00,000 (typical monthly rental range), check rental properties.
    // If budget is >= 1,00,000 (sale property range) and user didn't explicitly ask for monthly rent,
    // match sale properties to avoid showing ₹15K/mo rentals under a ₹70 Lakh purchase budget.
    const isRentalBudget =
      budget.amount < 1_00_000 ||
      lower.includes('rent') ||
      lower.includes('month') ||
      lower.includes('/mo');

    const matching = allProperties.filter((p) => {
      if (isRentalBudget) {
        return p.listingType === 'Rent' && p.price <= budget.amount;
      }
      return p.listingType === 'Sale' && p.price <= budget.amount;
    });

    if (matching.length > 0) {
      const filterHref = isRentalBudget
        ? `/properties?listing=Rent&maxPrice=${budget.amount}`
        : `/properties?listing=Sale&maxPrice=${budget.amount}`;

      return {
        text: `Here are sample ${isRentalBudget ? 'rental ' : ''}properties available within your budget (under ${budget.formatted}):`,
        properties: matching.slice(0, 3).map(formatPropertyForAssistant),
        actions: [
          { label: `Browse under ${budget.formatted}`, href: filterHref, primary: true },
          { label: 'View all properties', href: '/properties' },
        ],
        quickReplies: ['Properties for rent', 'Find a villa', 'Help me choose'],
      };
    } else {
      return {
        text: "I couldn't find a matching property in the current sample listings. Try changing the property type, location, or budget.",
        actions: [
          { label: 'Browse full catalogue', href: '/properties', primary: true },
        ],
        quickReplies: ['Properties for rent', 'Find a villa', 'Help me choose'],
      };
    }
  }

  // 11. LOCATION QUESTIONS
  // Specific location mention
  const matchedLoc = KNOWN_LOCATIONS.find((loc) =>
    lower.includes(loc.name.toLowerCase()),
  );

  if (matchedLoc) {
    const matching = allProperties.filter(
      (p) =>
        p.location.city.toLowerCase().includes(matchedLoc.name.toLowerCase()) ||
        p.location.locality.toLowerCase().includes(matchedLoc.name.toLowerCase()),
    );

    if (matching.length > 0) {
      return {
        text: `Here are our sample listings located in ${matchedLoc.name}:`,
        properties: matching.slice(0, 3).map(formatPropertyForAssistant),
        actions: [
          { label: `Search in ${matchedLoc.name}`, href: `/properties?q=${encodeURIComponent(matchedLoc.queryParam)}`, primary: true },
          { label: 'Browse all properties', href: '/properties' },
        ],
        quickReplies: ['Find a villa', 'Properties for rent', 'Help me choose'],
      };
    }
  }

  // General location inquiry
  if (
    lower.includes('where') ||
    lower.includes('location') ||
    lower.includes('locations') ||
    lower.includes('which city') ||
    lower.includes('which cities') ||
    lower.includes('located') ||
    lower.includes('areas')
  ) {
    return {
      text: "In this demo, our sample listings are located across Kesarpur (including Green Valley, Sunrise Nagar, Heritage Colony, Sarovar Road, and Civil Lines), Navrangpur (Patel Chowk, Greenfield, and Palm Estate), and Dharamgarh (Kisan Nagar and Bazaar Square).",
      actions: [
        { label: 'Explore catalogue by location', href: '/properties', primary: true },
        { label: 'Contact office', href: '/contact' },
      ],
      quickReplies: ['Properties in Kesarpur', 'Properties in Navrangpur', 'Help me choose'],
    };
  }

  // 12. FALLBACK / UNSUPPORTED
  return {
    text: "I'm a demo assistant focused on property discovery with our sample dataset. I can help you find villas, flats, commercial spaces, land plots, rental homes, or search by budget (e.g., 'What can I get under ₹70 lakh?').",
    actions: [
      { label: 'Browse property catalogue', href: '/properties', primary: true },
      { label: 'Contact us directly', href: '/contact' },
    ],
    quickReplies: [
      'Find a villa',
      'Properties for rent',
      'Residential properties',
      'Explore land and plots',
      'Help me choose',
    ],
  };
}
