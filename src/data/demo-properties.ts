/**
 * Demo Property Dataset
 *
 * All properties in this file are FICTIONAL demonstration data.
 * They do not represent genuine Maa Laxmi Property listings.
 *
 * This file is the sole data source for Phase 2A.
 * Phase 3 will replace it with PostgreSQL/Drizzle queries
 * without requiring UI changes — the components depend only
 * on the Property type, not on this module.
 */

import type {
  Property,
  VillaProperty,
  FlatProperty,
  CommercialProperty,
  ResidentialProperty,
  LandProperty,
  PlotProperty,
} from '@/types/property';

// ---------------------------------------------------------------------------
// Dataset
// ---------------------------------------------------------------------------

const now = '2026-01-15T10:00:00Z';

export const demoProperties: Property[] = [
  // 1. Villa — Sale — Featured
  {
    id: 'prop-001',
    title: 'Sunrise Garden Villa',
    slug: 'sunrise-garden-villa',
    description:
      'A spacious modern villa with landscaped gardens, contemporary interiors, and generous living spaces. Ideal for families looking for a premium lifestyle in a quiet, tree-lined neighbourhood.',
    propertyType: 'Villa',
    listingType: 'Sale',
    status: 'Available',
    price: 1_80_00_000,
    currency: 'INR',
    location: {
      address: '12, Green Valley Colony',
      locality: 'Green Valley',
      city: 'Kesarpur',
      latitude: 28.4595,
      longitude: 77.0266,
    },
    area: { value: 3500, unit: 'sq ft' },
    featured: true,
    images: [
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80', alt: 'Sunrise Garden Villa — modern two-storey villa with landscaped gardens at dusk', order: 1 },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80', alt: 'Villa exterior — secondary angle showing the entrance', order: 2 },
      { url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80', alt: 'Interior view — spacious living room with natural light', order: 3 },
      { url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80', alt: 'Extensive garden area and open space', order: 4 },
    ],
    bedrooms: 4,
    bathrooms: 4,
    parking: 2,
    amenities: ['Garden', 'Modular Kitchen', 'Study Room'],
    createdAt: now,
    updatedAt: now,
  } satisfies VillaProperty,

  // 2. Flat — Sale — Featured
  {
    id: 'prop-002',
    title: 'Skyview Heights 3BHK',
    slug: 'skyview-heights-3bhk',
    description:
      'A bright 3BHK apartment in a well-maintained residential tower. Features a modern kitchen, ample cross-ventilation, and a covered car park. Close to schools and daily amenities.',
    propertyType: 'Flat',
    listingType: 'Sale',
    status: 'Available',
    price: 65_00_000,
    currency: 'INR',
    location: {
      address: 'Tower B, Skyview Heights',
      locality: 'Sunrise Nagar',
      city: 'Kesarpur',
      latitude: 28.4731,
      longitude: 77.0418,
    },
    area: { value: 1450, unit: 'sq ft' },
    featured: true,
    images: [
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80', alt: 'Skyview Heights apartment tower exterior with landscaped entrance', order: 1 },
      { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80', alt: 'Living room interior showing wooden flooring and balcony access', order: 2 },
      { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80', alt: 'Building entrance and amenities area', order: 3 },
      { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80', alt: 'Modern kitchen with island counter', order: 4 },
    ],
    bedrooms: 3,
    bathrooms: 2,
    floor: 6,
    totalFloors: 10,
    parking: 1,
    createdAt: now,
    updatedAt: now,
  } satisfies FlatProperty,

  // 3. Commercial — Rent — Featured
  {
    id: 'prop-003',
    title: 'Central Business Hub Office',
    slug: 'central-business-hub-office',
    description:
      'A modern open-plan office space in a prime commercial zone. Large glass windows provide abundant natural light. Ideal for IT companies, consultancies, or co-working setups.',
    propertyType: 'Commercial',
    listingType: 'Rent',
    status: 'Available',
    price: 45_000,
    currency: 'INR',
    priceInterval: 'month',
    location: {
      address: '3rd Floor, Commerce Tower',
      locality: 'Patel Chowk',
      city: 'Navrangpur',
      latitude: 28.5355,
      longitude: 77.3910,
    },
    area: { value: 1800, unit: 'sq ft' },
    featured: true,
    images: [
      { url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80', alt: 'Modern open-plan office interior with glass partitions and natural light', order: 1 },
      { url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80', alt: 'Reception area and main entrance', order: 2 },
      { url: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1600&q=80', alt: 'Executive cabin / meeting room interior', order: 3 },
      { url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80', alt: 'Breakout lounge with seating', order: 4 },
    ],
    commercialType: 'Office Space',
    parking: 4,
    createdAt: now,
    updatedAt: now,
  } satisfies CommercialProperty,

  // 4. Residential — Sale — Featured
  {
    id: 'prop-004',
    title: 'Heritage Bloom Residence',
    slug: 'heritage-bloom-residence',
    description:
      'A charming two-storey independent house with a garden courtyard, ornamental ironwork, and warm interiors. Set in a well-established residential colony with good connectivity.',
    propertyType: 'Residential',
    listingType: 'Sale',
    status: 'Available',
    price: 95_00_000,
    currency: 'INR',
    location: {
      address: '27, Ashok Marg',
      locality: 'Heritage Colony',
      city: 'Kesarpur',
      latitude: 28.5120,
      longitude: 77.0205,
    },
    area: { value: 2200, unit: 'sq ft' },
    featured: true,
    images: [
      { url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80', alt: 'Heritage Bloom Residence — two-storey house with terracotta accents and garden', order: 1 },
      { url: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1600&q=80', alt: 'Front porch and entrance with garden courtyard', order: 2 },
      { url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80', alt: 'Warm living room interior with wooden accents', order: 3 },
      { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80', alt: 'Garden courtyard with ornamental plants', order: 4 },
    ],
    bedrooms: 3,
    bathrooms: 3,
    parking: 1,
    amenities: ['Garden', 'Covered Porch'],
    createdAt: now,
    updatedAt: now,
  } satisfies ResidentialProperty,

  // 5. Land — Sale
  {
    id: 'prop-005',
    title: 'Riverside Agricultural Land',
    slug: 'riverside-agricultural-land',
    description:
      'Fertile agricultural land with road access and water availability. Suitable for farming, orchard development, or long-term investment. Clear title and boundary demarcation.',
    propertyType: 'Land',
    listingType: 'Sale',
    status: 'Available',
    price: 32_00_000,
    currency: 'INR',
    location: {
      address: 'Survey No. 145, Riverside Road',
      locality: 'Kisan Nagar',
      city: 'Dharamgarh',
      latitude: 28.6180,
      longitude: 77.2050,
    },
    area: { value: 2, unit: 'acres' },
    featured: false,
    images: [
      { url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80', alt: 'Open agricultural land parcel with green vegetation and dirt path', order: 1 },
      { url: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1600&q=80', alt: 'Field boundary with mature trees', order: 2 },
      { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80', alt: 'Surrounding greenery and open sky', order: 3 },
    ],
    facing: 'East',
    roadWidth: '30 ft',
    createdAt: now,
    updatedAt: now,
  } satisfies LandProperty,

  // 6. Plot — Sale
  {
    id: 'prop-006',
    title: 'Greenfield Residential Plot',
    slug: 'greenfield-residential-plot',
    description:
      'Ready-to-build residential plot in a gated colony with paved roads, street lights, and drainage. Corner plot with two-side open. Ideal for constructing your dream home.',
    propertyType: 'Plot',
    listingType: 'Sale',
    status: 'Available',
    price: 18_00_000,
    currency: 'INR',
    location: {
      address: 'Plot 42, Greenfield Colony',
      locality: 'Greenfield',
      city: 'Navrangpur',
      latitude: 28.5600,
      longitude: 77.4100,
    },
    area: { value: 2400, unit: 'sq ft' },
    featured: false,
    images: [
      { url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80', alt: 'Demarcated residential plot in a housing colony with paved road', order: 1 },
      { url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80', alt: 'Paved internal road with street lights', order: 2 },
      { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80', alt: 'Corner plot view with open sides', order: 3 },
    ],
    facing: 'North-East',
    roadWidth: '40 ft',
    createdAt: now,
    updatedAt: now,
  } satisfies PlotProperty,

  // 7. Flat — Rent
  {
    id: 'prop-007',
    title: 'Lakeview Furnished 2BHK',
    slug: 'lakeview-furnished-2bhk',
    description:
      'A beautifully furnished 2BHK flat with wooden flooring, modern kitchen, and a balcony with a panoramic city view. Semi-furnished and ready to move in.',
    propertyType: 'Flat',
    listingType: 'Rent',
    status: 'Available',
    price: 22_000,
    currency: 'INR',
    priceInterval: 'month',
    location: {
      address: 'Flat 803, Lakeview Apartments',
      locality: 'Sarovar Road',
      city: 'Kesarpur',
      latitude: 28.4900,
      longitude: 77.0550,
    },
    area: { value: 1100, unit: 'sq ft' },
    featured: false,
    images: [
      { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80', alt: 'Furnished apartment living room with wooden floors and balcony view', order: 1 },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80', alt: 'Bedroom with city view window', order: 2 },
      { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80', alt: 'Balcony with panoramic city view', order: 3 },
    ],
    bedrooms: 2,
    bathrooms: 2,
    floor: 8,
    totalFloors: 12,
    createdAt: now,
    updatedAt: now,
  } satisfies FlatProperty,

  // 8. Villa — Sale — Sold
  {
    id: 'prop-008',
    title: 'Palm Estate Premium Villa',
    slug: 'palm-estate-premium-villa',
    description:
      'An architect-designed premium villa with a private pool, home theatre, and three levels of living space. Set in an exclusive gated community with 24-hour security.',
    propertyType: 'Villa',
    listingType: 'Sale',
    status: 'Sold',
    price: 2_40_00_000,
    currency: 'INR',
    location: {
      address: '5, Palm Estate Enclave',
      locality: 'Palm Estate',
      city: 'Navrangpur',
      latitude: 28.5450,
      longitude: 77.3800,
    },
    area: { value: 5200, unit: 'sq ft' },
    featured: false,
    images: [
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80', alt: 'Premium contemporary villa with pool and glass facade at twilight', order: 1 },
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80', alt: 'Pool area with terrace lounge', order: 2 },
      { url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80', alt: 'Home theatre room interior', order: 3 },
      { url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80', alt: 'Terrace garden with evening lighting', order: 4 },
    ],
    bedrooms: 5,
    bathrooms: 5,
    parking: 3,
    amenities: ['Swimming Pool', 'Home Theatre', 'Gym', 'Terrace Garden'],
    createdAt: now,
    updatedAt: now,
  } satisfies VillaProperty,

  // 9. Commercial — Sale
  {
    id: 'prop-009',
    title: 'Prime Corner Showroom',
    slug: 'prime-corner-showroom',
    description:
      'A double-height corner showroom on a busy commercial street. Glass frontage provides excellent visibility. Suitable for retail, furniture, electronics, or lifestyle brands.',
    propertyType: 'Commercial',
    listingType: 'Sale',
    status: 'Available',
    price: 1_20_00_000,
    currency: 'INR',
    location: {
      address: 'Plot 1, Main Market Road',
      locality: 'Bazaar Square',
      city: 'Dharamgarh',
      latitude: 28.6000,
      longitude: 77.2300,
    },
    area: { value: 2800, unit: 'sq ft' },
    featured: false,
    images: [
      { url: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1600&q=80', alt: 'Modern glass-fronted corner showroom on a commercial street', order: 1 },
      { url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80', alt: 'Interior display area with high ceiling', order: 2 },
      { url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80', alt: 'Storefront at street level', order: 3 },
    ],
    commercialType: 'Showroom',
    parking: 6,
    createdAt: now,
    updatedAt: now,
  } satisfies CommercialProperty,

  // 10. Residential — Rent
  {
    id: 'prop-010',
    title: 'Maple Lane Family Home',
    slug: 'maple-lane-family-home',
    description:
      'A comfortable independent house in a quiet residential lane. Two storeys with a private terrace, enclosed garden, and covered parking. Suitable for families or working professionals.',
    propertyType: 'Residential',
    listingType: 'Rent',
    status: 'Available',
    price: 15_000,
    currency: 'INR',
    priceInterval: 'month',
    location: {
      address: '8, Maple Lane',
      locality: 'Civil Lines',
      city: 'Kesarpur',
      latitude: 28.5050,
      longitude: 77.0300,
    },
    area: { value: 1600, unit: 'sq ft' },
    featured: false,
    images: [
      { url: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1600&q=80', alt: 'Cream-coloured independent house with balcony plants and gated entrance', order: 1 },
      { url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80', alt: 'Private terrace with seating', order: 2 },
      { url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80', alt: 'Enclosed garden view', order: 3 },
      { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80', alt: 'Covered parking at entrance', order: 4 },
    ],
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    createdAt: now,
    updatedAt: now,
  } satisfies ResidentialProperty,
];

import { getAllStoreProperties, getStorePropertyBySlug } from '@/lib/admin-store';

// ---------------------------------------------------------------------------
// Query Helpers
// Connected to admin-store for dynamic CMS mutations across public pages
// ---------------------------------------------------------------------------

/** Return all properties marked as featured */
export function getFeaturedProperties(): Property[] {
  return getAllStoreProperties().filter((p) => p.featured);
}

/** Find a single property by slug, or undefined if not found */
export function getPropertyBySlug(slug: string): Property | undefined {
  return getStorePropertyBySlug(slug);
}

/** Return all properties (unfiltered) */
export function getAllProperties(): Property[] {
  return getAllStoreProperties();
}

