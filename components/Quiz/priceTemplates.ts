const maxPrice = 200_000;
const minPrice = 15_000;
const priceStep = 5_000;

export const priceTemplates = Array.from(
  { length: (maxPrice - (minPrice - priceStep)) / priceStep },
  (_, i) => {
    const value = i * priceStep + minPrice;
    return { value, label: `${value.toLocaleString()} $` };
  },
);
