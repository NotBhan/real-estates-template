/**
 * Property Domain Types
 *
 * Discriminated union model: every property shares a common base,
 * but only relevant property types carry residential, commercial,
 * or land-specific fields.
 *
 * Phase 3 will map Drizzle rows to these types.
 * The UI depends only on these types, not on the data source.
 */

// ---------------------------------------------------------------------------
// Enums / Literal Unions
// ---------------------------------------------------------------------------

export const PROPERTY_TYPES = [
  'Residential',
  'Commercial',
  'Land',
  'Plot',
  'Flat',
  'Villa',
] as const;

export type PropertyType = typeof PROPERTY_TYPES[number];

export type ListingType = 'Sale' | 'Rent';

export type PropertyStatus = 'Available' | 'Sold' | 'Rented';

// ---------------------------------------------------------------------------
// Supporting Types
// ---------------------------------------------------------------------------

export interface PropertyLocation {
  address: string;
  locality: string;
  city: string;
  /** Reserved for Phase 3+ map integration */
  latitude?: number;
  longitude?: number;
}

export interface PropertyArea {
  value: number;
  unit: string; // "sq ft", "sq yd", "acres", etc.
}

export interface PropertyImage {
  url: string;
  alt: string;
  order: number;
}

// ---------------------------------------------------------------------------
// Base (shared by every property type)
// ---------------------------------------------------------------------------

interface PropertyBase {
  id: string;
  title: string;
  slug: string;
  description: string;
  propertyType: PropertyType;
  listingType: ListingType;
  status: PropertyStatus;

  /** Numeric price in INR (paise-free, whole rupees) */
  price: number;
  /** ISO 4217 currency code */
  currency: 'INR';
  /** Present only for rental listings */
  priceInterval?: 'month' | 'year';

  location: PropertyLocation;
  area: PropertyArea;
  featured: boolean;
  images: PropertyImage[];

  /** ISO 8601 date strings */
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Room Info (shared by Residential, Flat, Villa)
// ---------------------------------------------------------------------------

interface WithRoomInfo {
  bedrooms: number;
  bathrooms: number;
  parking?: number;
  amenities?: string[];
}

// ---------------------------------------------------------------------------
// Concrete Property Types
// ---------------------------------------------------------------------------

export interface ResidentialProperty extends PropertyBase, WithRoomInfo {
  propertyType: 'Residential';
}

export interface FlatProperty extends PropertyBase, WithRoomInfo {
  propertyType: 'Flat';
  floor?: number;
  totalFloors?: number;
}

export interface VillaProperty extends PropertyBase, WithRoomInfo {
  propertyType: 'Villa';
}

export interface CommercialProperty extends PropertyBase {
  propertyType: 'Commercial';
  /** e.g. "Office Space", "Shop", "Warehouse", "Showroom" */
  commercialType: string;
  parking?: number;
}

export interface LandProperty extends PropertyBase {
  propertyType: 'Land';
  facing?: string;
  roadWidth?: string;
}

export interface PlotProperty extends PropertyBase {
  propertyType: 'Plot';
  facing?: string;
  roadWidth?: string;
}

// ---------------------------------------------------------------------------
// Union
// ---------------------------------------------------------------------------

export type Property =
  | ResidentialProperty
  | FlatProperty
  | VillaProperty
  | CommercialProperty
  | LandProperty
  | PlotProperty;

// ---------------------------------------------------------------------------
// Type Guards
// ---------------------------------------------------------------------------

/** Properties that carry bedrooms / bathrooms */
export function hasRoomInfo(
  p: Property,
): p is ResidentialProperty | FlatProperty | VillaProperty {
  return (
    p.propertyType === 'Residential' ||
    p.propertyType === 'Flat' ||
    p.propertyType === 'Villa'
  );
}

/** Commercial properties */
export function isCommercial(p: Property): p is CommercialProperty {
  return p.propertyType === 'Commercial';
}

/** Land-like properties (Land + Plot) */
export function isLandLike(p: Property): p is LandProperty | PlotProperty {
  return p.propertyType === 'Land' || p.propertyType === 'Plot';
}
