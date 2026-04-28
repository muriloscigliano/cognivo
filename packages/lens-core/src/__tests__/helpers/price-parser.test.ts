import { describe, it, expect } from 'vitest';
import { parsePrice } from '../../helpers/price-parser';

describe('parsePrice', () => {
  it('parses simple US prices', () => {
    expect(parsePrice('$9')).toBe(9);
    expect(parsePrice('$29.99')).toBe(29.99);
    expect(parsePrice('$0.99')).toBe(0.99);
  });

  it('parses prices without currency symbols', () => {
    expect(parsePrice('29')).toBe(29);
    expect(parsePrice('29.99')).toBe(29.99);
  });

  it('parses other common currency symbols', () => {
    expect(parsePrice('€29')).toBe(29);
    expect(parsePrice('£29.50')).toBe(29.5);
    expect(parsePrice('¥1000')).toBe(1000);
    expect(parsePrice('₹500')).toBe(500);
  });

  it('handles US-style thousands separators', () => {
    expect(parsePrice('$1,299.99')).toBe(1299.99);
    expect(parsePrice('1,000,000')).toBe(1000000);
  });

  it('extracts the first number from contextual text', () => {
    expect(parsePrice('from $9/mo')).toBe(9);
    expect(parsePrice('Starting at $29 per user')).toBe(29);
    expect(parsePrice('$9 USD')).toBe(9);
  });

  it('returns null for non-numeric text', () => {
    expect(parsePrice('Free')).toBeNull();
    expect(parsePrice('Contact us')).toBeNull();
    expect(parsePrice('Custom pricing')).toBeNull();
  });

  it('returns null for empty / undefined', () => {
    expect(parsePrice('')).toBeNull();
    expect(parsePrice(undefined)).toBeNull();
  });

  it('handles whitespace gracefully', () => {
    expect(parsePrice('  $9  ')).toBe(9);
    expect(parsePrice('$ 9')).toBe(9);
  });
});
