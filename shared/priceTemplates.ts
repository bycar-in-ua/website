export const MIN_PRICE = 15_000;
export const MAX_PRICE = 200_000;
export const PRICE_STEP = 5_000;

export const priceTemplates = Array.from(
  { length: (MAX_PRICE - (MIN_PRICE - PRICE_STEP)) / PRICE_STEP },
  (_, i) => {
    const value = i * PRICE_STEP + MIN_PRICE;
    return { value, label: `$${value.toLocaleString()}` };
  },
);
