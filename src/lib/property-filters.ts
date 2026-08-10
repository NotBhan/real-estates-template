import type { Property, PropertyType, ListingType } from '@/types/property';

export interface PropertyFilterParams {
  q?: string;
  type?: PropertyType;
  listing?: ListingType;
  minPrice?: number;
  maxPrice?: number;
}

/**
 * Parses raw URL search parameters into structured filter params.
 */
export function parseFilterParams(url: URL): PropertyFilterParams {
  const params = url.searchParams;
  
  const q = params.get('q')?.trim() || undefined;
  const type = params.get('type') as PropertyType | undefined;
  const listing = params.get('listing') as ListingType | undefined;
  
  const rawMinPrice = params.get('minPrice');
  const minPrice = rawMinPrice ? parseInt(rawMinPrice, 10) : undefined;
  
  const rawMaxPrice = params.get('maxPrice');
  const maxPrice = rawMaxPrice ? parseInt(rawMaxPrice, 10) : undefined;

  return {
    q,
    type,
    listing,
    minPrice: !isNaN(minPrice as number) && (minPrice as number) >= 0 ? minPrice : undefined,
    maxPrice: !isNaN(maxPrice as number) && (maxPrice as number) >= 0 ? maxPrice : undefined,
  };
}

/**
 * Filters a list of properties based on the provided filter parameters.
 * Phase 2: In-memory filtering.
 * Phase 3: Will be replaced by Drizzle query filters.
 */
export function filterProperties(properties: Property[], filters: PropertyFilterParams): Property[] {
  return properties.filter((property) => {
    // 1. Property Type
    if (filters.type && property.propertyType !== filters.type) {
      return false;
    }

    // 2. Listing Type
    if (filters.listing && property.listingType !== filters.listing) {
      return false;
    }

    // 3. Price Range
    if (filters.minPrice !== undefined && property.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && property.price > filters.maxPrice) {
      return false;
    }

    // 4. Keyword / Location Search
    if (filters.q) {
      const searchTerms = filters.q.toLowerCase().split(/\s+/);
      const propertyText = [
        property.title,
        property.description,
        property.location.address,
        property.location.locality,
        property.location.city,
      ]
        .join(' ')
        .toLowerCase();

      // Check if ALL search terms are found somewhere in the property text
      const matchesAllTerms = searchTerms.every((term) => propertyText.includes(term));
      if (!matchesAllTerms) {
        return false;
      }
    }

    return true;
  });
}
