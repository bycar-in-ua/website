/**
 * This is a temporary solution for POC stage.
 * It will be replaced with a real discount system in the future.
 */

import type { AvailableCar } from "./interface";

type Discount = Pick<AvailableCar, "discountPrice" | "discountDescription">;

const touaregDiscountMessage =
  "Знижка 100 000 грн. на авто в наявності. За деталями звертайтесь до спеціаліста";

export const discounts: Record<number, Discount> = Object.freeze({
  // Staging Mazda CX-30, remove before deploy to master
  4: {
    discountPrice: 1245000,
    discountDescription:
      "Знижка 100 000 грн. на авто в наявності. За деталями звертайтесь до спеціаліста!",
  },
  5: {
    discountPrice: 2847193,
    discountDescription: touaregDiscountMessage,
  },
  6: {
    discountPrice: 3439833,
    discountDescription: touaregDiscountMessage,
  },
  7: {
    discountPrice: 3593356,
    discountDescription: touaregDiscountMessage,
  },
  8: {
    discountPrice: 3492937,
    discountDescription: touaregDiscountMessage,
  },
  9: {
    discountPrice: 3602913,
    discountDescription: touaregDiscountMessage,
  },
});
