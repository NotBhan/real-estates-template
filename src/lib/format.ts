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
