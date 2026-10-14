/**
 * Formatting utilities
 *
 * Shared display logic for property data.
 * Isolated here so components stay declarative.
 */

/**
 * Format a numeric INR price into a readable Indian real-estate string.
 *
 * Examples:
 *   18_000_000  → "₹1.8 Cr"
 *   6_500_000   → "₹65 L"
 *   45_000      → "₹45K"
 *   45_000 + 'month' → "₹45K/mo"
 */
export function formatPrice(
  price: number,
  interval?: 'month' | 'year',
): string {
  let formatted: string;

  if (price >= 1_00_00_000) {
    // 1 Crore+
    const crores = price / 1_00_00_000;
    formatted = `₹${crores % 1 === 0 ? crores.toFixed(0) : crores.toFixed(1)} Cr`;
  } else if (price >= 1_00_000) {
    // 1 Lakh+
    const lakhs = price / 1_00_000;
    formatted = `₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)} L`;
  } else if (price >= 1_000) {
    const thousands = price / 1_000;
    formatted = `₹${thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1)}K`;
  } else {
    formatted = `₹${price.toLocaleString('en-IN')}`;
  }

  if (interval === 'month') formatted += '/mo';
  if (interval === 'year') formatted += '/yr';

  return formatted;
}

/**
 * Format area with its unit.
 * Example: { value: 2400, unit: 'sq ft' } → "2,400 sq ft"
 */
export function formatArea(value: number, unit: string): string {
  return `${value.toLocaleString('en-IN')} ${unit}`;
}

/**
 * Optimize image URLs (specifically Unsplash) with width and quality parameters
 */
export function optimizeImageUrl(url: string, width: number, quality = 80): string {
  if (!url) return '';
  if (url.includes('images.unsplash.com')) {
    try {
      const parsed = new URL(url);
      parsed.searchParams.set('w', String(width));
      parsed.searchParams.set('q', String(quality));
      parsed.searchParams.set('auto', 'format');
      parsed.searchParams.set('fit', 'crop');
      return parsed.toString();
    } catch {
      return url;
    }
  }
  return url;
}

/**
 * Generate responsive srcset for Unsplash images
 */
export function getResponsiveSrcset(url: string, widths = [400, 800, 1200]): string {
  if (!url || !url.includes('images.unsplash.com')) return '';
  return widths.map((w) => `${optimizeImageUrl(url, w)} ${w}w`).join(', ');
}

